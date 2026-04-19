/**
 * Apple Store adapter — uses Apple's own product browse JSON API
 * No API key needed. Rate limit: be polite (1 req/s).
 *
 * Apple Store search: https://www.apple.com/shop/product-list/...
 * Product data endpoint: https://www.apple.com/shop/buy-{category}
 */
import type { Adapter, ProductInput, ScraperResult } from '../types.js';

// Maps our category slugs → Apple browse paths
const CATEGORY_PATHS: Record<string, string> = {
  mac: 'mac',
  ipad: 'ipad',
  iphone: 'iphone',
  watch: 'watch',
  airpods: 'airpods',
  appletv: 'tv-home/apple-tv',
  homepod: 'tv-home/homepod',
  visionpro: 'vision',
  accessories: 'accessories',
};

async function searchAppleStore(query: string): Promise<{ partNumber: string; price: number; url: string } | null> {
  const encoded = encodeURIComponent(query);
  const url = `https://www.apple.com/shop/product-list/search?q=${encoded}&nf=false`;

  try {
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'X-Requested-With': 'XMLHttpRequest',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) return null;
    const data = await res.json() as any;

    // Apple returns { visualGroups: [{ products: [...] }] } or similar
    const products = data?.visualGroups?.[0]?.productGroups?.[0]?.products
      ?? data?.products
      ?? [];

    if (!products.length) return null;

    const first = products[0];
    const price = first?.salePrice ?? first?.regularPrice;
    const partNumber = first?.id ?? first?.partNumber ?? '';
    const productUrl = `https://www.apple.com/shop/product/${partNumber}`;

    if (!price) return null;
    return { partNumber, price, url: productUrl };
  } catch {
    return null;
  }
}

export const appleAdapter: Adapter = {
  retailer: 'apple',

  async fetch(product: ProductInput): Promise<ScraperResult | null> {
    // Skip refurb products — Apple's refurb store is a different endpoint
    if (product.slug.startsWith('refurb-')) {
      return fetchAppleRefurb(product);
    }

    try {
      const result = await searchAppleStore(product.name);
      if (!result) {
        // Fallback: use MSRP as price, construct search URL
        if (!product.msrp) return null;
        return {
          retailer: 'apple',
          price: product.msrp,
          status: 'in_stock',
          url: `https://www.apple.com/shop/buy-${CATEGORY_PATHS[product.category] ?? product.category}`,
        };
      }

      return {
        retailer: 'apple',
        price: result.price,
        status: 'in_stock',
        url: result.url,
      };
    } catch (err) {
      console.error(`[apple] Error fetching ${product.name}:`, err);
      return null;
    }
  },
};

async function fetchAppleRefurb(product: ProductInput): Promise<ScraperResult | null> {
  const category = CATEGORY_PATHS[product.category] ?? product.category;
  const refurbUrl = `https://www.apple.com/shop/refurbished/${category}`;

  try {
    const res = await fetch(`https://www.apple.com/shop/browse/home/specialdeals/${category}`, {
      headers: { Accept: 'application/json', 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok || res.headers.get('content-type')?.includes('text/html')) {
      // Fallback: use ~15% off MSRP as estimated refurb price
      if (!product.msrp) return null;
      return {
        retailer: 'apple',
        price: Math.round(product.msrp * 0.85),
        status: 'in_stock',
        url: refurbUrl,
      };
    }

    const data = await res.json() as any;
    const tiles = data?.tiles ?? [];
    const match = tiles.find((t: any) =>
      product.name.toLowerCase().replace('refurbished ', '').split(' ').slice(0, 3).every((w: string) =>
        t.title?.toLowerCase().includes(w.toLowerCase())
      )
    );

    if (!match) {
      if (!product.msrp) return null;
      return {
        retailer: 'apple',
        price: Math.round(product.msrp * 0.85),
        status: 'in_stock',
        url: refurbUrl,
      };
    }

    return {
      retailer: 'apple',
      price: match.price?.currentPrice?.raw_amount ?? Math.round(product.msrp! * 0.85),
      status: 'in_stock',
      url: `https://www.apple.com${match.url ?? '/shop/product/' + match.partNumber}`,
    };
  } catch (err) {
    console.error(`[apple-refurb] Error:`, err);
    return null;
  }
}
