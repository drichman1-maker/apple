/**
 * Remove bad Newegg prices from GPU Drip.
 * Newegg adapter returns wildly incorrect prices (accessories, etc.)
 * Run: npx tsx packages/db/src/clean-newegg-gpudrip.ts
 */
import { db } from './index.js';

async function main() {
  const deleted = await db.retailerPrice.deleteMany({
    where: { retailer: 'newegg', product: { site: 'gpudrip' } },
  });
  console.log(`Deleted ${deleted.count} Newegg prices from GPU Drip.`);

  const histDeleted = await db.priceHistory.deleteMany({
    where: { retailer: 'newegg', product: { site: 'gpudrip' } },
  });
  console.log(`Deleted ${histDeleted.count} Newegg history entries from GPU Drip.`);

  await db.$disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
