/**
 * Best Buy Products API adapter
 * Docs: https://developer.bestbuy.com/documentation/products-api
 * Env: BESTBUY_API_KEY
 */
import type { Adapter, ProductInput, ScraperResult } from '../types.js';

const BASE = 'https://api.bestbuy.com/v1/products';

function buildQuery(product: ProductInput): string {
  // Normalise name for BB search: strip punctuation, take first ~5 words
  const terms = product.searchName
    .replace(/["""'']/g, '')
    .replace(/[^\w\s]/g, ' ')
    .trim()
    .split(/\s+/)
    .slice(0, 6)
    .join(' ');
  return `search=${encodeURIComponent(terms)}`;
}

export const bestbuyAdapter: Adapter = {
  retailer: 'bestbuy',

  async fetch(product: ProductInput): Promise<ScraperResult | null> {
    const key = process.env.BESTBUY_API_KEY;
    if (!key) { console.warn('[bestbuy] BESTBUY_API_KEY not set — skipping'); return null; }

    const url = `${BASE}(${buildQuery(product)})?format=json&show=sku,name,salePrice,regularPrice,onSale,inStoreAvailability,onlineAvailability,url,addToCartUrl&pageSize=5&apiKey=${key}`;

    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(10000) });
      if (!res.ok) { console.warn(`[bestbuy] HTTP ${res.status} for ${product.name}`); return null; }

      const data = await res.json() as { products?: any[] };
      if (!data.products?.length) return null;

      // Pick the product whose price is closest to MSRP (avoids used/3rd-party listings)
      const msrp = product.msrp ?? 0;
      const best = data.products
        .filter(p => p.onlineAvailability !== undefined)
        .sort((a, b) => Math.abs(a.salePrice - msrp) - Math.abs(b.salePrice - msrp))[0];

      if (!best) return null;

      const price = best.salePrice ?? best.regularPrice;
      const status = best.onlineAvailability ? 'in_stock' : 'out_of_stock';
      const productUrl = best.addToCartUrl ?? best.url ?? `https://www.bestbuy.com/site/searchpage.jsp?st=${encodeURIComponent(product.name)}`;

      return { retailer: 'bestbuy', price, status, url: productUrl };
    } catch (err) {
      console.error(`[bestbuy] Error fetching ${product.name}:`, err);
      return null;
    }
  },
};
