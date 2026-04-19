/**
 * Amazon adapter via Firecrawl
 * Env: FIRECRAWL_API_KEY
 *
 * Strategy: search Amazon, scrape the first relevant product page.
 * Firecrawl handles JS rendering and bot protection.
 */
import type { Adapter, ProductInput, ScraperResult } from '../types.js';

const FIRECRAWL_BASE = 'https://api.firecrawl.dev/v1';

async function firecrawlScrape(url: string): Promise<string | null> {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) return null;

  const res = await fetch(`${FIRECRAWL_BASE}/scrape`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, formats: ['markdown'], onlyMainContent: true }),
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) return null;
  const data = await res.json() as { data?: { markdown?: string } };
  return data.data?.markdown ?? null;
}

/** Extract price from Firecrawl markdown.
 *  If msrp is provided, pick the price closest to it (within 2x range).
 *  Falls back to the first plausible price otherwise.
 */
function extractPrice(markdown: string, msrp?: number | null): number | null {
  const matches = markdown.match(/\$\s*([\d,]+(?:\.\d{2})?)/g);
  if (!matches) return null;
  const prices = matches
    .map(m => parseFloat(m.replace(/[$,\s]/g, '')))
    .filter(p => p > 10 && p < 100_000);
  if (!prices.length) return null;

  if (msrp && msrp > 0) {
    // Filter to prices within 0.4x–2x of MSRP to exclude accessories/unrelated items
    const plausible = prices.filter(p => p >= msrp * 0.4 && p <= msrp * 2);
    if (plausible.length > 0) {
      // Return the one closest to MSRP
      return plausible.sort((a, b) => Math.abs(a - msrp) - Math.abs(b - msrp))[0] ?? null;
    }
  }

  const first = prices[0];
  return first ?? null;
}

function isOutOfStock(markdown: string): boolean {
  return /currently unavailable|out of stock|sold out/i.test(markdown);
}

export const amazonAdapter: Adapter = {
  retailer: 'amazon',

  async fetch(product: ProductInput): Promise<ScraperResult | null> {
    if (!process.env.FIRECRAWL_API_KEY) { console.warn('[amazon] FIRECRAWL_API_KEY not set — skipping'); return null; }

    const searchQuery = encodeURIComponent(product.searchName);
    const refurbSuffix = product.isRefurb ? '+refurbished' : '';
    const searchUrl = `https://www.amazon.com/s?k=${searchQuery}${refurbSuffix}&i=electronics`;

    try {
      // Step 1: scrape search results to find product URL
      const searchMd = await firecrawlScrape(searchUrl);
      if (!searchMd) return null;

      // Extract first Amazon product URL from search results
      const productUrlMatch = searchMd.match(/https:\/\/www\.amazon\.com\/[^\s)"\]]+\/dp\/[A-Z0-9]{10}/);
      if (!productUrlMatch?.[0]) return null;
      const productUrl = productUrlMatch[0].split('?')[0] ?? productUrlMatch[0]; // strip query params

      // Step 2: scrape product page for price
      const productMd = await firecrawlScrape(productUrl);
      if (!productMd) return null;

      const price = extractPrice(productMd, product.msrp);
      if (!price) return null;

      const status = isOutOfStock(productMd) ? 'out_of_stock' : 'in_stock';

      return { retailer: 'amazon', price, status, url: productUrl ?? searchUrl };
    } catch (err) {
      console.error(`[amazon] Error fetching ${product.name}:`, err);
      return null;
    }
  },
};
