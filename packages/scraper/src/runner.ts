/**
 * Scraper runner — fetches all products for a site, runs adapters in parallel,
 * batches results and POSTs to the unified API's /api/scraper/update endpoint.
 */
import type { Adapter, ProductInput, ScraperResult } from './types.js';
import { bestbuyAdapter } from './adapters/bestbuy.js';
import { ebayAdapter } from './adapters/ebay.js';
import { amazonAdapter } from './adapters/amazon.js';
import { appleAdapter } from './adapters/apple.js';
import { neweggAdapter } from './adapters/newegg.js';
import { walmartAdapter } from './adapters/walmart.js';
import { bhAdapter, adoramaAdapter, sweetwaterAdapter, targetAdapter } from './adapters/direct.js';

const ALL_ADAPTERS: Adapter[] = [
  appleAdapter,
  bestbuyAdapter,
  amazonAdapter,
  ebayAdapter,
  neweggAdapter,
  walmartAdapter,
  bhAdapter,
  adoramaAdapter,
  sweetwaterAdapter,
  targetAdapter,
];

// Retailers relevant per site — limits unnecessary API calls
const SITE_RETAILERS: Record<string, string[]> = {
  theresmac: ['apple', 'bestbuy', 'amazon', 'ebay', 'walmart', 'target', 'bh', 'adorama', 'sweetwater'],
  // Newegg removed: returns wildly incorrect prices from accessory listings
  gpudrip: ['bestbuy', 'amazon', 'ebay', 'bh', 'adorama'],
  default: ['bestbuy', 'amazon', 'ebay'],
};

async function fetchProducts(site: string): Promise<ProductInput[]> {
  const apiBase = process.env.API_BASE ?? 'https://agg-api-hub.fly.dev';
  const res = await fetch(`${apiBase}/api/${site}/products`);
  if (!res.ok) throw new Error(`Failed to fetch products for ${site}: ${res.status}`);
  const products = await res.json() as any[];
  return products.map(p => ({
    slug: p.slug,
    name: p.name,
    // Strip "(Refurbished)" suffix for clean search queries on Amazon/BestBuy/etc.
    searchName: p.name.replace(/\s*\(refurbished\)/i, '').trim(),
    category: p.category,
    msrp: p.msrp,
    isRefurb: !!p.isRefurb,
  }));
}

async function postUpdates(site: string, updates: Array<ScraperResult & { productSlug: string }>): Promise<void> {
  const apiBase = process.env.API_BASE ?? 'https://agg-api-hub.fly.dev';
  const key = process.env.SCRAPER_API_KEY;
  if (!key) throw new Error('SCRAPER_API_KEY not set');

  const res = await fetch(`${apiBase}/api/scraper/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-scraper-key': key },
    body: JSON.stringify({ site, updates }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Scraper update failed: ${res.status} — ${body}`);
  }

  const result = await res.json() as { updated: number; skipped: number; errors: number };
  console.log(`  → updated: ${result.updated}, skipped: ${result.skipped}, errors: ${result.errors}`);
}

/** Rate limit: pause between adapter calls to avoid hammering retailers */
function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export async function runScraper(site: string, options: { dryRun?: boolean; limit?: number } = {}) {
  const { dryRun = false, limit } = options;
  const relevantRetailers = new Set(SITE_RETAILERS[site] ?? SITE_RETAILERS.default);
  const adapters = ALL_ADAPTERS.filter(a => relevantRetailers.has(a.retailer));

  console.log(`\n🔍 Scraping ${site.toUpperCase()} — ${adapters.map(a => a.retailer).join(', ')}`);
  if (dryRun) console.log('  (DRY RUN — no data will be written)');

  const products = await fetchProducts(site);
  const targets = limit ? products.slice(0, limit) : products;
  console.log(`  ${targets.length} products to process\n`);

  const batchSize = 20;
  let batchUpdates: Array<ScraperResult & { productSlug: string }> = [];
  let totalResults = 0;

  for (let i = 0; i < targets.length; i++) {
    const product = targets[i];
    if (!product) continue;
    console.log(`[${i + 1}/${targets.length}] ${product.name}`);

    // Run all adapters for this product in parallel
    const results = await Promise.allSettled(
      adapters.map(adapter => adapter.fetch(product).catch(() => null))
    );

    results.forEach((result, j) => {
      const adapter = adapters[j];
      if (!adapter) return;
      if (result.status === 'fulfilled' && result.value && result.value.status !== 'not_carried') {
        const r = result.value;
        console.log(`  ✓ ${r.retailer}: $${r.price} (${r.status})`);
        batchUpdates.push({ ...r, productSlug: product.slug });
        totalResults++;
      } else if (result.status === 'rejected') {
        console.log(`  ✗ ${adapter.retailer}: error`);
      }
    });

    // Flush batch every N products
    if (!dryRun && batchUpdates.length >= batchSize) {
      await postUpdates(site, batchUpdates);
      batchUpdates = [];
    }

    // Polite rate limit between products
    if (i < targets.length - 1) await sleep(1000);
  }

  // Flush remaining
  if (!dryRun && batchUpdates.length > 0) {
    await postUpdates(site, batchUpdates);
  }

  console.log(`\n✅ Done — ${totalResults} price points scraped${dryRun ? ' (dry run, not saved)' : ''}`);
}
