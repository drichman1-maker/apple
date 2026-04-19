// Deletes refurb products NOT in the canonical 28-item list so the DB matches seed exactly
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const keepSlugs = new Set([
  'refurb-iphone-16-pro-max-256', 'refurb-iphone-16-pro-128', 'refurb-iphone-16-128',
  'refurb-iphone-15-pro-max-256', 'refurb-iphone-15-pro-128', 'refurb-iphone-15-128',
  'refurb-iphone-14-128',
  'refurb-macbook-pro-14-m5', 'refurb-macbook-pro-14-m5-pro', 'refurb-macbook-pro-14-m4-pro',
  'refurb-macbook-pro-16-m4-pro', 'refurb-macbook-pro-16-m4-max',
  'refurb-macbook-air-13-m5', 'refurb-macbook-air-13-m4', 'refurb-macbook-air-15-m4',
  'refurb-mac-mini-m4', 'refurb-imac-m4', 'refurb-mac-studio-m2-ultra', 'refurb-mac-mini-m4-pro',
  'refurb-ipad-pro-13-m4', 'refurb-ipad-pro-11-m4', 'refurb-ipad-air-13-m2',
  'refurb-ipad-air-11-m3', 'refurb-ipad-mini-7', 'refurb-ipad-pro-11-m2',
  'refurb-apple-watch-series-10-46mm', 'refurb-airpods-pro-3', 'refurb-apple-vision-pro',
]);

async function main() {
  const all = await db.product.findMany({
    where: { site: 'theresmac', slug: { startsWith: 'refurb-' } },
    select: { id: true, slug: true },
  });

  const toDelete = all.filter(p => !keepSlugs.has(p.slug));
  console.log(`Found ${all.length} refurb products. Deleting ${toDelete.length} extras...`);

  for (const p of toDelete) {
    await db.retailerPrice.deleteMany({ where: { productId: p.id } });
    await db.product.delete({ where: { id: p.id } });
    console.log(`  Deleted: ${p.slug}`);
  }

  console.log('Done.');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
