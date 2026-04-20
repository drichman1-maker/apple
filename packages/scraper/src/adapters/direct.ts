/**
 * Direct HTTP adapters for B&H, Adorama (via Firecrawl), Sweetwater, Target
 * B&H and Adorama use Firecrawl (they block direct scraping with 403).
 * Sweetwater and Target use direct fetch (no bot protection).
 */
import type { Adapter, ProductInput, ScraperResult } from '../types.js';

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function fetchHtml(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT, Accept: 'text/html,application/xhtml+xml' },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return null;
    return res.text();
  } catch {
    return null;
  }
}

async function firecrawlMarkdown(url: string): Promise<string | null> {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, formats: ['markdown'], onlyMainContent: true }),
      signal: AbortSignal.timeout(30000),
    });
    if (!res.ok) return null;
    const data = await res.json() as { success: boolean; data?: { markdown?: string } };
    return data.success ? (data.data?.markdown ?? null) : null;
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
        // If MSRP provided, sanity-check: must be within 0.3x–2.5x
        if (msrp && msrp > 0 && (p < msrp * 0.3 || p > msrp * 2.5)) continue;
        return p;
      }
    }
  }
  // Fallback: scan for any dollar amount near MSRP
  if (msrp && msrp > 0) {
    const amounts = [...text.matchAll(/\$\s*([\d,]+(?:\.\d{2})?)/g)]
      .map(m => parseFloat(m[1]!.replace(/,/g, '')))
      .filter(p => p >= msrp * 0.3 && p <= msrp * 2.5);
    if (amounts.length > 0) {
      return amounts.sort((a, b) => Math.abs(a - msrp) - Math.abs(b - msrp))[0] ?? null;
    }
  }
  return null;
}

// ── B&H Photo (Firecrawl) ─────────────────────────────────────────────────────
export const bhAdapter: Adapter = {
  retailer: 'bh',

  async fetch(product: ProductInput): Promise<ScraperResult | null> {
    const query = encodeURIComponent(product.searchName);
    const searchUrl = `https://www.bhphotovideo.com/c/search?Ntt=${query}&N=4294967295&InitialSearch=yes&sts=ma&Top=Search`;

    try {
      const md = await firecrawlMarkdown(searchUrl);
      if (!md) return null;

      const price = extractPrice(md, [
        /\*\*\$([\d,]+(?:\.\d{2})?)\*\*/,
        /Price[:\s]+\$([\d,]+(?:\.\d{2})?)/i,
        /\$([\d,]+(?:\.\d{2})?)\s*(?:Add to Cart|Buy)/i,
      ], product.msrp);

      const urlMatch = md.match(/\(https:\/\/www\.bhphotovideo\.com\/c\/product\/([^)]+)\)/);
      const productUrl = urlMatch
        ? `https://www.bhphotovideo.com/c/product/${urlMatch[1]}`
        : `https://www.bhphotovideo.com/c/search?Ntt=${query}`;

      if (!price) return null;

      const outOfStock = /out.of.stock|back.?order|sold.out/i.test(md);
      const backordered = /back.?order/i.test(md);

      return {
        retailer: 'bh',
        price,
        status: backordered ? 'backordered' : outOfStock ? 'out_of_stock' : 'in_stock',
        url: productUrl,
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

  async fetch(product: ProductInput): Promise<ScraperResult | null> {
    const query = encodeURIComponent(product.searchName);
    const searchUrl = `https://www.adorama.com/l/?searchinfo=${query}`;

    try {
      const md = await firecrawlMarkdown(searchUrl);
      if (!md) return null;

      const price = extractPrice(md, [
        /\*\*\$([\d,]+(?:\.\d{2})?)\*\*/,
        /\$([\d,]+(?:\.\d{2})?)\s*(?:Add to Cart|Buy Now)/i,
        /Price[:\s]+\$([\d,]+(?:\.\d{2})?)/i,
      ], product.msrp);

      // Adorama product URLs: /APXXXXX.html pattern
      const urlMatch = md.match(/\(https:\/\/www\.adorama\.com\/([A-Z]{2}[A-Z0-9]+\.html)\)/i);
      const productUrl = urlMatch
        ? `https://www.adorama.com/${urlMatch[1]}`
        : `https://www.adorama.com/l/?searchinfo=${query}`;

      if (!price) return null;

      const outOfStock = /out.of.stock|sold.out|not.available/i.test(md);
      return { retailer: 'adorama', price, status: outOfStock ? 'out_of_stock' : 'in_stock', url: productUrl };
    } catch (err) {
      console.error(`[adorama] Error:`, err);
      return null;
    }
  },
};

// ── Sweetwater ────────────────────────────────────────────────────────────────
export const sweetwaterAdapter: Adapter = {
  retailer: 'sweetwater',

  async fetch(product: ProductInput): Promise<ScraperResult | null> {
    // Sweetwater carries Apple hardware: Mac, iPad, iPhone, AirPods, Watch, Apple TV, HomePod
    const carried = ['mac', 'ipad', 'iphone', 'airpods', 'watch', 'appletv', 'homepod'].includes(product.category);
    if (!carried) return { retailer: 'sweetwater', price: 0, status: 'not_carried', url: 'https://www.sweetwater.com' };

    const query = encodeURIComponent(product.searchName);
    const searchUrl = `https://www.sweetwater.com/store/search.php?s=${query}`;

    try {
      const html = await fetchHtml(searchUrl);
      if (!html) return null;

      const price = extractPrice(html, [
        /"price"\s*:\s*"([\d.]+)"/,
        /"salePrice"\s*:\s*([\d.]+)/,
        /class="[^"]*price[^"]*"\s*>[\$\s]*([\d,]+\.?\d*)/i,
      ], product.msrp);

      if (!price) return null;

      const urlMatch = html.match(/href="(https:\/\/www\.sweetwater\.com\/store\/detail\/[^"]+)"/);
      const productUrl = urlMatch?.[1] ?? `https://www.sweetwater.com/store/search.php?s=${query}`;
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

      const msrp = product.msrp ?? 0;
      const best = products
        .filter(p => p.price?.current_retail)
        .sort((a, b) => Math.abs(a.price.current_retail - msrp) - Math.abs(b.price.current_retail - msrp))[0];

      if (!best) return null;

      const tcin = best.item?.tcin ?? '';
      const productUrl = `https://www.target.com/p/-/A-${tcin}`;
      const available = best.availability_status === 'IN_STOCK';

      return {
        retailer: 'target',
        price: best.price.current_retail,
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

      const price = extractPrice(md, [
        /\*\*\$([\d,]+(?:\.\d{2})?)\*\*/,
        /\$([\d,]+(?:\.\d{2})?)\s*(?:Add to Cart|Buy Now|Shop Now)/i,
        /Price[:\s]+\$([\d,]+(?:\.\d{2})?)/i,
      ], product.msrp);

      if (!price) return null;

      // ABT product URLs: /product/NNNNN/brand-model.html
      const urlMatch = md.match(/\(https:\/\/www\.abt\.com\/product\/([^)]+)\)/);
      const productUrl = urlMatch
        ? `https://www.abt.com/product/${urlMatch[1]}`
        : `https://www.abt.com/search?query=${query}`;

      const outOfStock = /out.of.stock|sold.out|not.available/i.test(md);
      return { retailer: 'abt', price, status: outOfStock ? 'out_of_stock' : 'in_stock', url: productUrl };
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

      const price = extractPrice(md, [
        /\*\*\$([\d,]+(?:\.\d{2})?)\*\*/,
        /\$([\d,]+(?:\.\d{2})?)\s*(?:Add to Cart|In-store|Online)/i,
        /Sale Price[:\s]+\$([\d,]+(?:\.\d{2})?)/i,
        /\$([\d,]+(?:\.\d{2})?)/,
      ], product.msrp);

      if (!price) return null;

      // Micro Center product URLs: /product/NNNNNN/...
      const urlMatch = md.match(/\(https:\/\/www\.microcenter\.com\/product\/([^)]+)\)/);
      const productUrl = urlMatch
        ? `https://www.microcenter.com/product/${urlMatch[1]}`
        : `https://www.microcenter.com/search/search_results.aspx?Ntt=${query}`;

      const outOfStock = /out.of.stock|sold.out|in-store.only/i.test(md);
      return { retailer: 'microcenter', price, status: outOfStock ? 'out_of_stock' : 'in_stock', url: productUrl };
    } catch (err) {
      console.error(`[microcenter] Error:`, err);
      return null;
    }
  },
};
