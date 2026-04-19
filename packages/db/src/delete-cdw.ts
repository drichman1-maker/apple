/**
 * One-time script: delete all CDW retailer prices from the database.
 * Run with: npx tsx packages/db/src/delete-cdw.ts
 */
import { db } from './index.js';

async function main() {
  const deleted = await db.retailerPrice.deleteMany({ where: { retailer: 'cdw' } });
  console.log(`Deleted ${deleted.count} CDW price entries.`);

  // Also wipe CDW from price history
  const historyDeleted = await db.priceHistory.deleteMany({ where: { retailer: 'cdw' } });
  console.log(`Deleted ${historyDeleted.count} CDW history entries.`);

  await db.$disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
