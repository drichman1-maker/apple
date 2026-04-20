import { Router, Request } from 'express';
import { db, Site } from '@repo/db';

type SiteParams = { site: Site };

export const productsRouter = Router({ mergeParams: true });

const AMAZON_TAG = process.env.AMAZON_AFFILIATE_TAG;
const EBAY_CAMPAIGN_ID = process.env.EBAY_AFFILIATE_CAMPAIGN_ID;

function buildAffiliateUrl(retailer: string, url: string): string | null {
  if (!url) return null;
  try {
    if (retailer === 'amazon' && AMAZON_TAG && url.includes('amazon.com')) {
      const u = new URL(url);
      u.searchParams.set('tag', AMAZON_TAG);
      return u.toString();
    }
    if (retailer === 'ebay' && EBAY_CAMPAIGN_ID && url.includes('ebay.com')) {
      const u = new URL(url);
      u.searchParams.set('mkcid', '1');
      u.searchParams.set('mkrid', '711-53200-19255-0');
      u.searchParams.set('siteid', '0');
      u.searchParams.set('campid', EBAY_CAMPAIGN_ID);
      u.searchParams.set('toolid', '10001');
      u.searchParams.set('mkevt', '1');
      return u.toString();
    }
  } catch {
    // malformed URL — return null
  }
  return null;
}

// GET /api/:site/products
productsRouter.get('/', async (req: Request<SiteParams>, res) => {
  const { site } = req.params;

  try {
    const products = await db.product.findMany({
      where: { site },
      include: { prices: true },
      orderBy: { name: 'asc' },
    });

    const shaped = products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category,
      msrp: p.msrp,
      specs: p.specs,
      imageUrl: p.imageUrl,
      isRefurb: p.slug.startsWith('refurb-'),
      prices: Object.fromEntries(
        p.prices.map((r) => [
          r.retailer,
          {
            price: r.price,
            status: r.status,
            url: r.url,
            affiliateUrl: buildAffiliateUrl(r.retailer, r.url) ?? r.affiliateUrl,
            verified: r.verified,
            updatedAt: r.updatedAt.toISOString(),
          },
        ])
      ),
    }));

    res.json(shaped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/:site/products/:slug
productsRouter.get('/:slug', async (req: Request<SiteParams & { slug: string }>, res) => {
  const { site, slug } = req.params;

  try {
    const product = await db.product.findUnique({
      where: { site_slug: { site, slug } },
      include: { prices: true },
    });

    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json({
      ...product,
      prices: Object.fromEntries(
        product.prices.map((r) => [r.retailer, r])
      ),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// GET /api/:site/products/:slug/price-history?days=90
productsRouter.get('/:slug/price-history', async (req: Request<SiteParams & { slug: string }>, res) => {
  const { site, slug } = req.params;
  const days = Math.min(parseInt(req.query.days as string) || 90, 365);

  try {
    const product = await db.product.findUnique({
      where: { site_slug: { site, slug } },
      select: { id: true },
    });

    if (!product) return res.status(404).json({ error: 'Product not found' });

    const since = new Date();
    since.setDate(since.getDate() - days);

    const history = await db.priceHistory.findMany({
      where: { productId: product.id, changedAt: { gte: since } },
      orderBy: { changedAt: 'asc' },
    });

    res.json({
      slug,
      days,
      history: history.map((h) => ({
        date: h.changedAt.toISOString(),
        retailer: h.retailer,
        price: h.newPrice,
        status: h.newStatus,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch price history' });
  }
});

// POST /api/:site/products/:id/click — track affiliate click
productsRouter.post('/:id/click', async (req: Request<SiteParams & { id: string }>, res) => {
  const { site, id } = req.params;
  const { retailer } = req.body;

  try {
    await db.affiliateClick.create({
      data: { productId: id, retailer, site },
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to log click' });
  }
});
