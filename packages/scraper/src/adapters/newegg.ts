/**
 * Newegg adapter via Firecrawl
 * Env: FIRECRAWL_API_KEY
 */
import type { Adapter, ProductInput, ScraperResult } from '../types.js';

function extractPrice(markdown: string): number | null {
  const matches = markdown.match(/\$\s*([\d,]+(?:\.\d{2})?)/g);
  if (!matches) return null;
  const prices = matches
    .map(m => parseFloat(m.replace(/[$,\s]/g, '')))
    .filter(p => p > 1 && p < 100_000);
  return prices[0] ?? null;
}

async function firecrawlScrape(url: string): Promise<string | null> {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) return null;
  const res = await fetch('https://api.firecrawl.dev/v1/scrape', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, formats: ['markdown'], onlyMainContent: true }),
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) return null;
  const data = await res.json() as { data?: { markdown?: string } };
  return data.data?.markdown ?? null;
}

export const neweggAdapter: Adapter = {
  retailer: 'newegg',

  async fetch(product: ProductInput): Promise<ScraperResult | null> {
    if (!process.env.FIRECRAWL_API_KEY) { console.warn('[newegg] FIRECRAWL_API_KEY not set — skipping'); return null; }

    const query = encodeURIComponent(product.searchName);
    const searchUrl = `https://www.newegg.com/p/pl?d=${query}`;

    try {
      const md = await firecrawlScrape(searchUrl);
      if (!md) return null;

      // Find first newegg product link
      const linkMatch = md.match(/https:\/\/www\.newegg\.com\/[^\s)"]+\/p\/[A-Z0-9-]+/);
      if (!linkMatch) {
        const price = extractPrice(md);
        if (!price) return null;
        return { retailer: 'newegg', price, status: 'in_stock', url: searchUrl };
      }

      const productUrl = linkMatch[0];
      const productMd = await firecrawlScrape(productUrl);
      if (!productMd) return null;

      const price = extractPrice(productMd);
      if (!price) return null;

      const outOfStock = /out of stock|sold out|unavailable/i.test(productMd);
      return { retailer: 'newegg', price, status: outOfStock ? 'out_of_stock' : 'in_stock', url: productUrl };
    } catch (err) {
      console.error(`[newegg] Error fetching ${product.name}:`, err);
      return null;
    }
  },
};
