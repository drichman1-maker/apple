/**
 * Add new GPUs: Intel Arc B580, AMD RX 7600 XT
 * Add refurbished section: RTX 4090, RX 7900 XTX, RTX 3090 refurb listings
 * Run: npx tsx packages/db/src/add-gpus.ts
 */
import { db } from './index.js';

const newGPUs = [
  // ── Intel Arc B580 (Battlemage, Dec 2024) ──────────────────────────────────
  {
    slug: 'arc-b580',
    name: 'Intel Arc B580',
    site: 'gpudrip' as const,
    category: 'intel',
    msrp: 249,
    specs: { vram: '12GB', architecture: 'Battlemage', tdp: '190W' },
  },
  // ── AMD RX 7600 XT ─────────────────────────────────────────────────────────
  {
    slug: 'rx-7600-xt',
    name: 'AMD RX 7600 XT',
    site: 'gpudrip' as const,
    category: 'amd',
    msrp: 329,
    specs: { vram: '16GB', architecture: 'RDNA 3', tdp: '165W' },
  },
];

// Refurbished GPUs — eBay is the primary retailer for these
const refurbGPUs = [
  {
    slug: 'refurb-rtx-4090',
    name: 'NVIDIA RTX 4090 (Refurbished)',
    site: 'gpudrip' as const,
    category: 'nvidia',
    msrp: 1599,  // new MSRP as reference
    specs: { vram: '24GB', architecture: 'Ada Lovelace', tdp: '450W' },
  },
  {
    slug: 'refurb-rtx-4080-super',
    name: 'NVIDIA RTX 4080 Super (Refurbished)',
    site: 'gpudrip' as const,
    category: 'nvidia',
    msrp: 999,
    specs: { vram: '16GB', architecture: 'Ada Lovelace', tdp: '320W' },
  },
  {
    slug: 'refurb-rtx-3090',
    name: 'NVIDIA RTX 3090 (Refurbished)',
    site: 'gpudrip' as const,
    category: 'nvidia',
    msrp: 1499,
    specs: { vram: '24GB', architecture: 'Ampere', tdp: '350W' },
  },
  {
    slug: 'refurb-rx-7900-xtx',
    name: 'AMD RX 7900 XTX (Refurbished)',
    site: 'gpudrip' as const,
    category: 'amd',
    msrp: 999,
    specs: { vram: '24GB', architecture: 'RDNA 3', tdp: '355W' },
  },
  {
    slug: 'refurb-rtx-4070-ti-super',
    name: 'NVIDIA RTX 4070 Ti Super (Refurbished)',
    site: 'gpudrip' as const,
    category: 'nvidia',
    msrp: 799,
    specs: { vram: '16GB', architecture: 'Ada Lovelace', tdp: '285W' },
  },
];

async function main() {
  let added = 0;
  let skipped = 0;

  for (const gpu of [...newGPUs, ...refurbGPUs]) {
    const existing = await db.product.findUnique({
      where: { site_slug: { site: gpu.site, slug: gpu.slug } },
    });

    if (existing) {
      console.log(`  ↷ skip ${gpu.slug} (already exists)`);
      skipped++;
      continue;
    }

    await db.product.create({
      data: {
        slug: gpu.slug,
        name: gpu.name,
        site: gpu.site,
        category: gpu.category,
        msrp: gpu.msrp,
        specs: gpu.specs,
      },
    });

    console.log(`  ✓ added ${gpu.slug}`);
    added++;
  }

  console.log(`\nDone: ${added} added, ${skipped} skipped`);
  await db.$disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
