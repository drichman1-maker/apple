/**
 * eBay Browse API adapter — good for used/refurb pricing signals
 * Docs: https://developer.ebay.com/api-docs/buy/browse/overview.html
 * Env: EBAY_CLIENT_ID, EBAY_CLIENT_SECRET
 * Token endpoint: https://api.ebay.com/identity/v1/oauth2/token (client_credentials)
 */
import type { Adapter, ProductInput, ScraperResult } from '../types.js';

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getToken(): Promise<string | null> {
  const id = process.env.EBAY_CLIENT_ID;
  const secret = process.env.EBAY_CLIENT_SECRET;
  if (!id || !secret) return null;

  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) return cachedToken.token;

  const creds = Buffer.from(`${id}:${secret}`).toString('base64');
  const res = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
    method: 'POST',
    headers: { Authorization: `Basic ${creds}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope',
  });
  if (!res.ok) return null;
  const data = await res.json() as { access_token: string; expires_in: number };
  cachedToken = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return cachedToken.token;
}

export const ebayAdapter: Adapter = {
  retailer: 'ebay',

  async fetch(product: ProductInput): Promise<ScraperResult | null> {
    const token = await getToken();
    if (!token) { console.warn('[ebay] credentials not set — skipping'); return null; }

    const query = encodeURIComponent(product.searchName);
    // Refurb: search used/certified; new products: Buy It Now new only
    const condition = product.isRefurb
      ? 'conditions%3A%7BUSED_EXCELLENT%7CCERTIFIED_REFURBISHED%7D'
      : 'conditions%3A%7BNEW%7D';
    const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${query}${product.isRefurb ? '+refurbished' : ''}&filter=${condition},buyingOptions%3A%7BFIXED_PRICE%7D&sort=price&limit=5`;

    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}`, 'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US', 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) return null;

      const data = await res.json() as { itemSummaries?: any[] };
      if (!data.itemSummaries?.length) return null;

      const msrp = product.msrp ?? 0;
      const best = data.itemSummaries
        .filter(item => item.price)
        .sort((a, b) => Math.abs(parseFloat(a.price.value) - msrp) - Math.abs(parseFloat(b.price.value) - msrp))[0];

      if (!best) return null;

      const price = parseFloat(best.price.value);
      return {
        retailer: 'ebay',
        price,
        status: 'in_stock',
        url: best.itemWebUrl ?? `https://www.ebay.com/sch/i.html?_nkw=${query}`,
      };
    } catch (err) {
      console.error(`[ebay] Error fetching ${product.name}:`, err);
      return null;
    }
  },
};
