/**
 * Scraper runner — fetches all products for a site, runs adapters in parallel,
 * batches results and POSTs to the unified API's /api/scraper/update endpoint.
 */
import { z } from 'zod';
import type { Adapter, ProductInput, ScraperResult } from './types.js';
import { bestbuyAdapter } from './adapters/bestbuy.js';
import { ebayAdapter } from './adapters/ebay.js';
import { amazonAdapter } from './adapters/amazon.js';
import { appleAdapter } from './adapters/apple.js';
import { walmartAdapter } from './adapters/walmart.js';
import { bhAdapter, adoramaAdapter, sweetwaterAdapter, targetAdapter, abtAdapter, microcenterAdapter } from './adapters/direct.js';

const ALL_ADAPTERS: Adapter[] = [
  appleAdapter,
  bestbuyAdapter,
  amazonAdapter,
  ebayAdapter,
  walmartAdapter,
  bhAdapter,
  adoramaAdapter,
  sweetwaterAdapter,
  targetAdapter,
  abtAdapter,
  microcenterAdapter,
];

// Retailers relevant per site — limits unnecessary API calls
const SITE_RETAILERS: Record<string, string[]> = {
  theresmac: ['apple', 'bestbuy', 'amazon', 'ebay', 'walmart', 'target', 'bh', 'adorama', 'sweetwater', 'abt', 'microcenter'],
  gpudrip: ['bestbuy', 'amazon', 'ebay', 'bh', 'adorama', 'microcenter', 'abt'],
  default: ['bestbuy', 'amazon', 'ebay'],
};

const scraperResultSchema = z.object({
  retailer: z.string().min(1),
  price: z.number().positive().finite(),
  status: z.enum(['in_stock', 'out_of_stock', 'backordered', 'not_carried']),
  url: z.string().url(),
});

const apiProductSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  msrp: z.number().nullable(),
  isRefurb: z.boolean().optional(),
}).passthrough();

async function fetchProducts(site: string): Promise<ProductInput[]> {
  const apiBase = process.env.API_BASE ?? 'https://agg-api-hub.fly.dev';
  const res = await fetch(`${apiBase}/api/${site}/products`);
  if (!res.ok) throw new Error(`Failed to fetch products for ${site}: ${res.status}`);
  const raw = await res.json();
  const parsed = z.array(apiProductSchema).safeParse(raw);
  if (!parsed.success) {
    throw new Error(`Product list from ${site} failed validation: ${parsed.error.issues.slice(0, 3).map(i => `${i.path.join('.')}: ${i.message}`).join('; ')}`);
  }
  return parsed.data.map(p => ({
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

type AdapterStats = { ok: number; notFound: number; notCarried: number; error: number };

export interface ScraperReport {
  site: string;
  totalProducts: number;
  totalResults: number;
  adapters: Record<string, AdapterStats>;
  brokenAdapters: string[];
}

export async function runScraper(
  site: string,
  options: { dryRun?: boolean; limit?: number } = {},
): Promise<ScraperReport> {
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
  const stats: Record<string, AdapterStats> = Object.fromEntries(
    adapters.map(a => [a.retailer, { ok: 0, notFound: 0, notCarried: 0, error: 0 }]),
  );

  for (let i = 0; i < targets.length; i++) {
    const product = targets[i];
    if (!product) continue;
    console.log(`[${i + 1}/${targets.length}] ${product.name}`);

    // Category allowlist: skip adapters that don't sell this category at all.
    // Counts as notCarried so it doesn't trip the "broken adapter" detector.
    const activeAdapters = adapters.filter(a => {
      if (a.supportsCategory && !a.supportsCategory(product.category)) {
        stats[a.retailer]!.notCarried++;
        return false;
      }
      return true;
    });

    // Run all adapters for this product in parallel; preserve rejection vs null distinction
    const results = await Promise.allSettled(
      activeAdapters.map(adapter => adapter.fetch(product)),
    );

    results.forEach((result, j) => {
      const adapter = activeAdapters[j];
      if (!adapter) return;
      const s = stats[adapter.retailer]!;
      if (result.status === 'rejected') {
        s.error++;
        console.log(`  ✗ ${adapter.retailer}: threw — ${(result.reason as Error)?.message ?? result.reason}`);
        return;
      }
      const r = result.value;
      if (!r) { s.notFound++; return; }
      if (r.status === 'not_carried') { s.notCarried++; return; }
      const validated = scraperResultSchema.safeParse(r);
      if (!validated.success) {
        s.error++;
        console.log(`  ✗ ${adapter.retailer}: invalid result — ${validated.error.issues[0]?.message}`);
        return;
      }
      s.ok++;
      console.log(`  ✓ ${r.retailer}: $${r.price} (${r.status})`);
      batchUpdates.push({ ...validated.data, productSlug: product.slug });
      totalResults++;
    });

    if (!dryRun && batchUpdates.length >= batchSize) {
      await postUpdates(site, batchUpdates);
      batchUpdates = [];
    }

    if (i < targets.length - 1) await sleep(1000);
  }

  if (!dryRun && batchUpdates.length > 0) {
    await postUpdates(site, batchUpdates);
  }

  // An adapter is "broken" if it produced zero successes across all products.
  // Exclude adapters that were category-filtered out (notCarried == total).
  const brokenAdapters = Object.entries(stats)
    .filter(([, s]) => s.ok === 0 && s.notCarried < targets.length)
    .map(([retailer]) => retailer);

  console.log(`\n✅ Done — ${totalResults} price points scraped${dryRun ? ' (dry run, not saved)' : ''}`);
  console.log('\nPer-adapter results:');
  for (const [retailer, s] of Object.entries(stats)) {
    const total = s.ok + s.notFound + s.notCarried + s.error;
    console.log(`  ${retailer.padEnd(12)} ok=${s.ok} notFound=${s.notFound} notCarried=${s.notCarried} error=${s.error} (${total} total)`);
  }
  if (brokenAdapters.length > 0) {
    console.log(`\n⚠️  Broken adapters (zero successes): ${brokenAdapters.join(', ')}`);
  }

  const report: ScraperReport = { site, totalProducts: targets.length, totalResults, adapters: stats, brokenAdapters };
  console.log(`\nSCRAPER_REPORT ${JSON.stringify(report)}`);
  return report;
}
