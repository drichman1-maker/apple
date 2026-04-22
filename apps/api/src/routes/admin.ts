import { Router, Request } from 'express';
import { db, Site } from '@repo/db';
import { requireApiKey } from '../middleware/auth';
import { z } from 'zod';

type SiteParams = { site: Site };

export const adminRouter = Router({ mergeParams: true });

adminRouter.use(requireApiKey);

const updatePriceSchema = z.object({
  productId: z.string(),
  retailer: z.string(),
  price: z.number().min(0),
  status: z.enum(['in_stock', 'out_of_stock', 'backordered', 'not_carried']),
  url: z.string().url(),
  affiliateUrl: z.string().url().optional(),
});

const updateMsrpSchema = z.object({
  productId: z.string(),
  msrp: z.number().min(0),
});

const upsertProductSchema = z.object({
  name: z.string(),
  slug: z.string(),
  category: z.string().optional(),
  msrp: z.number().optional(),
  specs: z.record(z.unknown()).optional(),
  imageUrl: z.string().url().optional(),
});

// GET /api/:site/admin/products — list all with prices
adminRouter.get('/products', async (req: Request<SiteParams>, res) => {
  const site = req.params.site as Site;
  const products = await db.product.findMany({
    where: { site },
    include: { prices: true },
    orderBy: { name: 'asc' },
  });
  res.json(products);
});

// POST /api/:site/admin/products — create/upsert product
adminRouter.post('/products', async (req: Request<SiteParams>, res) => {
  const site = req.params.site as Site;
  const parsed = upsertProductSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { specs, ...rest } = parsed.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const specsJson = specs as any;
  const product = await db.product.upsert({
    where: { site_slug: { site, slug: parsed.data.slug } },
    create: { site, ...rest, specs: specsJson },
    update: { ...rest, specs: specsJson },
  });
  res.json({ success: true, product });
});

// POST /api/:site/admin/update-price
adminRouter.post('/update-price', async (req: Request<SiteParams>, res) => {
  const site = req.params.site as Site;
  const parsed = updatePriceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { productId, retailer, price, status, url, affiliateUrl } = parsed.data;

  try {
    const existing = await db.retailerPrice.findUnique({
      where: { productId_retailer: { productId, retailer } },
    });

    const updated = await db.retailerPrice.upsert({
      where: { productId_retailer: { productId, retailer } },
      create: { productId, retailer, price, status, url, affiliateUrl, verified: true },
      update: { price, status, url, affiliateUrl, verified: true },
    });

    if (!existing || existing.price !== price || existing.status !== status) {
      await db.priceHistory.create({
        data: {
          productId,
          retailer,
          oldPrice: existing?.price,
          newPrice: price,
          oldStatus: existing?.status,
          newStatus: status,
          changedBy: 'manual',
        },
      });

      await checkAndTriggerAlerts(productId, price, site);
    }

    res.json({ success: true, price: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update price' });
  }
});

// POST /api/:site/admin/update-msrp
adminRouter.post('/update-msrp', async (req: Request<SiteParams>, res) => {
  const parsed = updateMsrpSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const product = await db.product.update({
    where: { id: parsed.data.productId },
    data: { msrp: parsed.data.msrp },
  });
  res.json({ success: true, product });
});

// GET /api/:site/admin/price-history
adminRouter.get('/price-history', async (req: Request<SiteParams>, res) => {
  const site = req.params.site as Site;
  const limit = parseInt(req.query.limit as string) || 200;

  const history = await db.priceHistory.findMany({
    where: { product: { site } },
    include: { product: { select: { name: true, slug: true } } },
    orderBy: { changedAt: 'desc' },
    take: limit,
  });

  res.json(history);
});

// GET /api/:site/admin/alerts
adminRouter.get('/alerts', async (req: Request<SiteParams>, res) => {
  const site = req.params.site as Site;
  const alerts = await db.alert.findMany({
    where: { product: { site }, isActive: true },
    include: { product: { select: { name: true, slug: true } } },
    orderBy: { createdAt: 'desc' },
  });
  res.json(alerts);
});

// DELETE /api/:site/admin/alerts/:id
adminRouter.delete('/alerts/:id', async (req: Request<SiteParams & { id: string }>, res) => {
  await db.alert.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

// GET /api/:site/admin/export/csv — export products + prices as CSV
adminRouter.get('/export/csv', async (req: Request<SiteParams>, res) => {
  const site = req.params.site as Site;

  const products = await db.product.findMany({
    where: { site },
    include: { prices: true },
    orderBy: { name: 'asc' },
  });

  const rows: string[] = [
    'product_id,product_name,category,msrp,retailer,price,status,url,verified,updated_at',
  ];

  for (const p of products) {
    if (p.prices.length === 0) {
      rows.push(`${p.id},${csvEscape(p.name)},${p.category ?? ''},${p.msrp ?? ''},,,,,,`);
    } else {
      for (const r of p.prices) {
        rows.push(
          [p.id, csvEscape(p.name), p.category ?? '', p.msrp ?? '',
           r.retailer, r.price, r.status, csvEscape(r.url), r.verified, r.updatedAt.toISOString()
          ].join(',')
        );
      }
    }
  }

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="${site}-prices-${new Date().toISOString().split('T')[0]}.csv"`);
  res.send(rows.join('\n'));
});

function csvEscape(val: string): string {
  if (val.includes(',') || val.includes('"') || val.includes('\n')) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

async function checkAndTriggerAlerts(productId: string, newPrice: number, _site: Site) {
  const alerts = await db.alert.findMany({
    where: { productId, isActive: true, triggeredAt: null },
    include: { product: { select: { name: true } } },
  });

  for (const alert of alerts) {
    if (alert.targetPrice && newPrice <= alert.targetPrice) {
      await db.alert.update({
        where: { id: alert.id },
        data: { triggeredAt: new Date() },
      });
      // TODO: send email via @repo/email
      console.log(`[Alert] Triggered for ${alert.email} on ${alert.product.name} @ $${newPrice}`);
    }
  }
}
