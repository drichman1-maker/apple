import { Router } from 'express';
import { db, Site, StockStatus } from '@repo/db';
import { requireScraperKey } from '../middleware/auth';
import { z } from 'zod';

export const scraperRouter = Router();

scraperRouter.use(requireScraperKey);

const scraperUpdateSchema = z.object({
  site: z.enum(['theresmac', 'gpudrip', 'healthindex', 'babygear', 'rumbledeals', 'robotatlas']),
  updates: z.array(z.object({
    productSlug: z.string(),
    retailer: z.string(),
    price: z.number().min(0),
    status: z.enum(['in_stock', 'out_of_stock', 'backordered', 'not_carried']),
    url: z.string().url(),
  })),
});

// POST /api/scraper/update — batch update from scraper
scraperRouter.post('/update', async (req, res) => {
  const parsed = scraperUpdateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { site, updates } = parsed.data;
  const results = { updated: 0, skipped: 0, errors: 0 };

  for (const u of updates) {
    try {
      const product = await db.product.findUnique({
        where: { site_slug: { site, slug: u.productSlug } },
      });

      if (!product) { results.skipped++; continue; }

      const existing = await db.retailerPrice.findUnique({
        where: { productId_retailer: { productId: product.id, retailer: u.retailer } },
      });

      // Skip if manually verified — admin override takes precedence
      if (existing?.verified) { results.skipped++; continue; }

      await db.retailerPrice.upsert({
        where: { productId_retailer: { productId: product.id, retailer: u.retailer } },
        create: { productId: product.id, retailer: u.retailer, price: u.price, status: u.status, url: u.url },
        update: { price: u.price, status: u.status, url: u.url },
      });

      if (!existing || existing.price !== u.price || existing.status !== u.status) {
        await db.priceHistory.create({
          data: {
            productId: product.id,
            retailer: u.retailer,
            oldPrice: existing?.price,
            newPrice: u.price,
            oldStatus: existing?.status,
            newStatus: u.status,
            changedBy: 'scraper',
          },
        });
      }

      results.updated++;
    } catch (err) {
      console.error(`Scraper update error for ${u.productSlug}/${u.retailer}:`, err);
      results.errors++;
    }
  }

  res.json({ success: true, ...results });
});
