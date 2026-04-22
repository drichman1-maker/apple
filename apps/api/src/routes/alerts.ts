import { Router, Request } from 'express';
import { db, Site } from '@repo/db';
import { z } from 'zod';

type SiteParams = { site: Site };

export const alertsRouter = Router({ mergeParams: true });

const createAlertSchema = z.object({
  productId: z.string(),
  email: z.string().email(),
  targetPrice: z.number().positive().optional(),
});

// POST /api/:site/alerts
alertsRouter.post('/', async (req: Request<SiteParams>, res) => {
  const parsed = createAlertSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const alert = await db.alert.create({ data: parsed.data });
  res.json({ success: true, alert });
});

// DELETE /api/:site/alerts/:id
alertsRouter.delete('/:id', async (req: Request<SiteParams & { id: string }>, res) => {
  await db.alert.update({
    where: { id: req.params.id },
    data: { isActive: false },
  });
  res.json({ success: true });
});
