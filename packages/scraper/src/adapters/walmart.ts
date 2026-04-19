/**
 * Walmart adapter — uses Walmart's open search API (no key needed for basic search)
 * Docs: https://developer.walmart.com/
 * For production, use the Walmart Affiliate API with WALMART_PUBLISHER_ID + WALMART_API_KEY
 */
import type { Adapter, ProductInput, ScraperResult } from '../types.js';

export const walmartAdapter: Adapter = {
  retailer: 'walmart',

  async fetch(product: ProductInput): Promise<ScraperResult | null> {
    const query = encodeURIComponent(product.searchName);
    // Walmart open API v1 — returns JSON without auth for basic queries
    const url = `https://api.walmart.com/v1/search?query=${query}&numItems=3&format=json`;

    try {
      const res = await fetch(url, {
        headers: { 'WM_SEC.ACCESS_TOKEN': process.env.WALMART_API_KEY ?? '', Accept: 'application/json' },
        signal: AbortSignal.timeout(10000),
      }).catch(() => null);

      if (!res || !res.ok) {
        return null;
      }

      const data = await res.json() as { items?: any[] };
      if (!data.items?.length) return null;

      const msrp = product.msrp ?? 0;
      const best = data.items
        .filter(i => i.salePrice)
        .sort((a, b) => Math.abs(a.salePrice - msrp) - Math.abs(b.salePrice - msrp))[0];

      if (!best) return null;

      return {
        retailer: 'walmart',
        price: best.salePrice,
        status: best.stock === 'Available' ? 'in_stock' : 'out_of_stock',
        url: best.productUrl ?? `https://www.walmart.com/search?q=${query}`,
      };
    } catch (err) {
      console.error(`[walmart] Error fetching ${product.name}:`, err);
      return null;
    }
  },
};
