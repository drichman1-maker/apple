import { db } from './index.js';

async function main() {
  const prices = await db.retailerPrice.findMany({
    where: { product: { site: 'gpudrip' } },
    include: { product: { select: { name: true, slug: true } } },
    orderBy: { updatedAt: 'desc' },
    take: 100,
  });
  const byRetailer: Record<string,number> = {};
  for (const p of prices) {
    byRetailer[p.retailer] = (byRetailer[p.retailer] || 0) + 1;
  }
  console.log('By retailer:', JSON.stringify(byRetailer, null, 2));
  console.log(`Total: ${prices.length} prices`);

  const newSlugs = ['arc-b580','rx-7600-xt','refurb-rtx-4090','refurb-rtx-4080-super','refurb-rtx-3090','refurb-rx-7900-xtx','refurb-rtx-4070-ti-super'];
  const newCards = prices.filter(p => newSlugs.includes(p.product.slug));
  if (newCards.length) {
    console.log('\nNew cards prices:');
    for (const p of newCards) console.log(`  ${p.product.slug} @ ${p.retailer}: $${p.price} (${p.status})`);
  } else {
    console.log('\nNo prices found for new cards yet');
  }
  await db.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
