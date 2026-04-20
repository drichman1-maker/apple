import { Router } from 'express';
import { db } from '@repo/db';

export const healthRouter = Router();

// GET /api/health — lightweight liveness check (no DB)
healthRouter.get('/', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// GET /api/health/ready — readiness check: verifies DB connectivity
healthRouter.get('/ready', async (_req, res) => {
  try {
    await db.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', db: 'up', time: new Date().toISOString() });
  } catch (err) {
    res.status(503).json({
      status: 'degraded',
      db: 'down',
      error: err instanceof Error ? err.message : String(err),
      time: new Date().toISOString(),
    });
  }
});
