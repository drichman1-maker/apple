/**
 * Direct HTTP adapters for B&H, Adorama (via Firecrawl), Sweetwater, Target
 * B&H and Adorama use Firecrawl (they block direct scraping with 403).
 * Sweetwater and Target use direct fetch (no bot protection).
 */
import type { Adapter, ProductInput, ScraperResult } from '../types.js';

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

/**
 * Retry once with a short backoff on transient failures. `isTransient` decides
 * whether a thrown error or a falsy return should trigger the retry.
 * Kept intentionally narrow: 1 retry, ~800ms delay — enough to shake off
 * a rate-limit or cold-start without turning a 30s scrape into 2 minutes.
 */
async function withRetry<T>(fn: () => Promise<T>, isTransient: (err: unknown) => boolean): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (!isTransient(err)) throw err;
    await new Promise(r => setTimeout(r, 800));
    return fn();
  }
}

async function fetchHtml(url: string): Promise<string | null> {
  const once = async (): Promise<string | null> => {
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT, Accept: 'text/html,application/xhtml+xml' },
      signal: AbortSignal.timeout(12000),
    });
    // 429/503 → surface as throw so withRetry picks it up; other non-2xx → null
    if (res.status === 429 || res.status === 503) throw new Error(`HTTP ${res.status}`);
    if (!res.ok) return null;
    return res.text();
  };
  try {
    return await withRetry(once, () => true);
  } catch {
    return null;
  }
}

async function firecrawlMarkdown(url: string): Promise<string | null> {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) return null;
  const once = async (): Promise<string | null> => {
    const res = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, formats: ['markdown'], onlyMainContent: true }),
      signal: AbortSignal.timeout(30000),
    });
    if (res.status === 429 || res.status >= 500) throw new Error(`Firecrawl HTTP ${res.status}`);
    if (!res.ok) return null;
    const data = await res.json() as { success: boolean; data?: { markdown?: string } };
    return data.success ? (data.data?.markdown ?? null) : null;
  };
  try {
    return await withRetry(once, () => true);
  } catch {
    return null;
  }
}

function extractPrice(text: string, patterns: RegExp[], msrp?: number | null): number | null {
  for (const re of patterns) {
    const m = text.match(re);
    if (m?.[1]) {
      const p = parseFloat(m[1].replace(/,/g, ''));
      if (p > 0) {
        // Must be within 0.6x–1.5x MSRP. Tighter than the API-level 0.5x–1.8x
        // gate because adapters can fall back to the next regex if the first
        // matches a shipping fee, accessory, or marketplace listing.
        if (msrp && msrp > 0 && (p < msrp * 0.6 || p > msrp * 1.5)) continue;
        return p;
      }
    }
  }
  // No "scan all dollar amounts for the one closest to MSRP" fallback —
  // that heuristic was the root cause of the $179 AirPods Max (used listing)
  // and $549 Target AirPods Max (marketplace listing) misfires.
  return null;
}

const TITLE_STOPWORDS = new Set(['the', 'and', 'for', 'with', 'a', 'an', 'of', 'in', 'apple', 'new']);

/**
 * True if `title` plausibly describes the same product as `expected`.
 * Requires every distinctive token from `expected` (length ≥ 2, not a stopword)
 * to appear in `title`. Prevents e.g. a search for "AirPods Max USB-C" from
 * matching a "USB-C Hub" listing, or "MacBook Pro 14 M5" from matching the M4.
 */
function titleMatches(expected: string, title: string): boolean {
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]+/g, ' ');
  const expTokens = normalize(expected)
    .split(/\s+/)
    .filter(t => t.length >= 2 && !TITLE_STOPWORDS.has(t));
  const normTitle = normalize(title);
  return expTokens.every(t => normTitle.includes(t));
}

/**
 * Finds the first product link in Firecrawl markdown whose URL matches
 * `urlPattern`. Returns the anchor text (usually the product title) and URL,
 * or null if no link matches. Skips image links (![alt](url)).
 */
function findProductLink(md: string, urlPattern: RegExp): { text: string; url: string } | null {
  const linkRe = /(?<!!)\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g;
  for (const m of md.matchAll(linkRe)) {
    const [, text, url] = m;
    if (text && url && urlPattern.test(url)) return { text: text.trim(), url };
  }
  return null;
}

// ── B&H Photo (Firecrawl) ─────────────────────────────────────────────────────
export const bhAdapter: Adapter = {
  retailer: 'bh',

  // B&H technically lists iPhones but per-product coverage is spotty and the
  // search page routinely surfaces unrelated accessories. User explicitly
  // asked to stop scraping iPhones for this retailer.
  supportsCategory(category) {
    return category !== 'iphone';
  },

  async fetch(product: ProductInput): Promise<ScraperResult | null> {
    const query = encodeURIComponent(product.searchName);
    const searchUrl = `https://www.bhphotovideo.com/c/search?Ntt=${query}&N=4294967295&InitialSearch=yes&sts=ma&Top=Search`;

    try {
      const md = await firecrawlMarkdown(searchUrl);
      if (!md) return null;

      // Require a product link whose anchor text matches the search name.
      // If the search page shows only unrelated results, bail out.
      const link = findProductLink(md, /bhphotovideo\.com\/c\/product\//);
      if (!link || !titleMatches(product.searchName, link.text)) return null;

      const price = extractPrice(md, [
        /\*\*\$([\d,]+(?:\.\d{2})?)\*\*/,
        /Price[:\s]+\$([\d,]+(?:\.\d{2})?)/i,
        /\$([\d,]+(?:\.\d{2})?)\s*(?:Add to Cart|Buy)/i,
      ], product.msrp);

      if (!price) return null;

      const outOfStock = /out.of.stock|back.?order|sold.out/i.test(md);
      const backordered = /back.?order/i.test(md);

      return {
        retailer: 'bh',
        price,
        status: backordered ? 'backordered' : outOfStock ? 'out_of_stock' : 'in_stock',
        url: link.url,
      };
    } catch (err) {
      console.error(`[bh] Error:`, err);
      return null;
    }
  },
};

// ── Adorama (Firecrawl) ───────────────────────────────────────────────────────
export const adoramaAdapter: Adapter = {
  retailer: 'adorama',

  // Same reasoning as B&H — iPhone coverage was unreliable.
  supportsCategory(category) {
    return category !== 'iphone';
  },

  async fetch(product: ProductInput): Promise<ScraperResult | null> {
    const query = encodeURIComponent(product.searchName);
    const searchUrl = `https://www.adorama.com/l/?searchinfo=${query}`;

    try {
      const md = await firecrawlMarkdown(searchUrl);
      if (!md) return null;

      // Adorama product URLs: /APXXXXX.html pattern
      const link = findProductLink(md, /adorama\.com\/[A-Z]{2}[A-Z0-9]+\.html/i);
      if (!link || !titleMatches(product.searchName, link.text)) return null;

      const price = extractPrice(md, [
        /\*\*\$([\d,]+(?:\.\d{2})?)\*\*/,
        /\$([\d,]+(?:\.\d{2})?)\s*(?:Add to Cart|Buy Now)/i,
        /Price[:\s]+\$([\d,]+(?:\.\d{2})?)/i,
      ], product.msrp);

      if (!price) return null;

      const outOfStock = /out.of.stock|sold.out|not.available/i.test(md);
      return { retailer: 'adorama', price, status: outOfStock ? 'out_of_stock' : 'in_stock', url: link.url };
    } catch (err) {
      console.error(`[adorama] Error:`, err);
      return null;
    }
  },
};

// ── Sweetwater ────────────────────────────────────────────────────────────────
export const sweetwaterAdapter: Adapter = {
  retailer: 'sweetwater',

  // Sweetwater carries Apple hardware only — skip GPU/accessory categories.
  supportsCategory(category) {
    return ['mac', 'ipad', 'iphone', 'airpods', 'watch', 'appletv', 'homepod'].includes(category);
  },

  async fetch(product: ProductInput): Promise<ScraperResult | null> {
    const query = encodeURIComponent(product.searchName);
    const searchUrl = `https://www.sweetwater.com/store/search.php?s=${query}`;

    try {
      const html = await fetchHtml(searchUrl);
      if (!html) return null;

      // Sweetwater product card: <a href=".../store/detail/..." title="Product Name">
      // Use the title attribute as the canonical product name for matching.
      const linkMatch = html.match(/href="(https:\/\/www\.sweetwater\.com\/store\/detail\/[^"]+)"[^>]*title="([^"]+)"/);
      if (!linkMatch) return null;
      const [, productUrl, linkTitle] = linkMatch;
      if (!productUrl || !linkTitle || !titleMatches(product.searchName, linkTitle)) return null;

      const price = extractPrice(html, [
        /"price"\s*:\s*"([\d.]+)"/,
        /"salePrice"\s*:\s*([\d.]+)/,
        /class="[^"]*price[^"]*"\s*>[\$\s]*([\d,]+\.?\d*)/i,
      ], product.msrp);

      if (!price) return null;

      const outOfStock = /out.of.stock|sold.out/i.test(html);

      return { retailer: 'sweetwater', price, status: outOfStock ? 'out_of_stock' : 'in_stock', url: productUrl };
    } catch (err) {
      console.error(`[sweetwater] Error:`, err);
      return null;
    }
  },
};

// ── Target ────────────────────────────────────────────────────────────────────
export const targetAdapter: Adapter = {
  retailer: 'target',

  // Target doesn't sell Mac hardware (MacBook/Mac mini/Studio/iMac/Mac Pro).
  // User explicitly asked to stop scraping these so marketplace listings don't
  // re-inject wrong prices.
  supportsCategory(category) {
    return category !== 'mac';
  },

  async fetch(product: ProductInput): Promise<ScraperResult | null> {
    const query = encodeURIComponent(product.searchName);
    // Target's Redsky API (unofficial but stable)
    const url = `https://redsky.target.com/redsky_aggregations/v1/web/plp_search_v2?keyword=${query}&count=3&channel=WEB&page=%2Fsearch&platform=desktop&pricing_store_id=1122`;

    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
        signal: AbortSignal.timeout(10000),
      });

      if (!res.ok) return null;
      const data = await res.json() as { data?: { search?: { products?: any[] } } };
      const products = data?.data?.search?.products;
      if (!products?.length) return null;

      // Take the first result whose title matches. Target orders by relevance,
      // so the first real match is the canonical SKU (not a marketplace listing
      // that happened to price close to MSRP).
      const best = products.find(p => {
        if (!p.price?.current_retail) return false;
        const title = p.item?.product_description?.title ?? p.title ?? '';
        return titleMatches(product.searchName, title);
      });

      if (!best) return null;

      // Sanity-check the price against MSRP at the adapter layer too, so we
      // don't hand off an obviously bogus value to the API.
      const price = best.price.current_retail;
      if (product.msrp && (price < product.msrp * 0.6 || price > product.msrp * 1.5)) return null;

      const tcin = best.item?.tcin ?? '';
      const productUrl = `https://www.target.com/p/-/A-${tcin}`;
      const available = best.availability_status === 'IN_STOCK';

      return {
        retailer: 'target',
        price,
        status: available ? 'in_stock' : 'out_of_stock',
        url: productUrl,
      };
    } catch (err) {
      console.error(`[target] Error:`, err);
      return null;
    }
  },
};

// ── ABT Electronics (Firecrawl) ───────────────────────────────────────────────
export const abtAdapter: Adapter = {
  retailer: 'abt',

  async fetch(product: ProductInput): Promise<ScraperResult | null> {
    const query = encodeURIComponent(product.searchName);
    const searchUrl = `https://www.abt.com/search?query=${query}`;

    try {
      const md = await firecrawlMarkdown(searchUrl);
      if (!md) return null;

      // ABT product URLs: /product/NNNNN/brand-model.html
      const link = findProductLink(md, /abt\.com\/product\//);
      if (!link || !titleMatches(product.searchName, link.text)) return null;

      const price = extractPrice(md, [
        /\*\*\$([\d,]+(?:\.\d{2})?)\*\*/,
        /\$([\d,]+(?:\.\d{2})?)\s*(?:Add to Cart|Buy Now|Shop Now)/i,
        /Price[:\s]+\$([\d,]+(?:\.\d{2})?)/i,
      ], product.msrp);

      if (!price) return null;

      const outOfStock = /out.of.stock|sold.out|not.available/i.test(md);
      return { retailer: 'abt', price, status: outOfStock ? 'out_of_stock' : 'in_stock', url: link.url };
    } catch (err) {
      console.error(`[abt] Error:`, err);
      return null;
    }
  },
};

// ── Micro Center (Firecrawl) ──────────────────────────────────────────────────
export const microcenterAdapter: Adapter = {
  retailer: 'microcenter',

  async fetch(product: ProductInput): Promise<ScraperResult | null> {
    const query = encodeURIComponent(product.searchName);
    // N=4294967288 filters to in-stock items; category=4294966998 is Graphics Cards
    const searchUrl = `https://www.microcenter.com/search/search_results.aspx?N=4294967288&Ntt=${query}`;

    try {
      const md = await firecrawlMarkdown(searchUrl);
      if (!md) return null;

      // Micro Center product URLs: /product/NNNNNN/brand-model
      const link = findProductLink(md, /microcenter\.com\/product\//);
      if (!link || !titleMatches(product.searchName, link.text)) return null;

      const price = extractPrice(md, [
        /\*\*\$([\d,]+(?:\.\d{2})?)\*\*/,
        /\$([\d,]+(?:\.\d{2})?)\s*(?:Add to Cart|In-store|Online)/i,
        /Sale Price[:\s]+\$([\d,]+(?:\.\d{2})?)/i,
      ], product.msrp);
      // Dropped the bare /\$([\d,]+)/ fallback — too permissive, it was matching
      // accessory prices and used-listing prices on the same search page.

      if (!price) return null;

      const outOfStock = /out.of.stock|sold.out|in-store.only/i.test(md);
      return { retailer: 'microcenter', price, status: outOfStock ? 'out_of_stock' : 'in_stock', url: link.url };
    } catch (err) {
      console.error(`[microcenter] Error:`, err);
      return null;
    }
  },
};
