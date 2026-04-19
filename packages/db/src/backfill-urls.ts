/**
 * Backfill retailer URLs: replace placeholder theresmac.com/adorama-static
 * URLs with real retailer search URLs based on product name.
 *
 * Run: npx tsx packages/db/src/backfill-urls.ts
 */
import { db } from './index.js';

const PLACEHOLDER = /theresmac\.com|adorama\.com\/sup\/static/;

function searchUrl(retailer: string, name: string): string {
  const q = encodeURIComponent(name);
  switch (retailer) {
    case 'bestbuy':   return `https://www.bestbuy.com/site/searchpage.jsp?st=${q}`;
    case 'ebay':      return `https://www.ebay.com/sch/i.html?_nkw=${q}`;
    case 'walmart':   return `https://www.walmart.com/search?q=${q}`;
    case 'target':    return `https://www.target.com/s?searchTerm=${q}`;
    case 'bh':        return `https://www.bhphotovideo.com/c/search?q=${q}`;
    case 'adorama':   return `https://www.adorama.com/l/?searchinfo=${q}`;
    case 'newegg':    return `https://www.newegg.com/p/pl?d=${q}`;
    case 'amazon':    return `https://www.amazon.com/s?k=${q}`;
    default:          return `https://www.google.com/search?q=${encodeURIComponent(retailer + ' ' + name)}`;
  }
}

async function main() {
  const prices = await db.retailerPrice.findMany({
    include: { product: { select: { name: true } } },
  });

  let updated = 0;
  for (const p of prices) {
    if (PLACEHOLDER.test(p.url)) {
      const url = searchUrl(p.retailer, p.product.name);
      await db.retailerPrice.update({
        where: { id: p.id },
        data: { url },
      });
      updated++;
    }
  }

  console.log(`Updated ${updated} placeholder URLs (${prices.length - updated} already had real URLs).`);
  await db.$disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
