import type { Request, Response, NextFunction } from 'express';

export function requireScraperKey(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.SCRAPER_API_KEY;
  if (!expected) return res.status(500).json({ error: 'Server misconfigured: SCRAPER_API_KEY not set' });
  const provided = req.header('x-scraper-key');
  if (provided !== expected) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const expected = process.env.ADMIN_API_KEY;
  if (!expected) return res.status(500).json({ error: 'Server misconfigured: ADMIN_API_KEY not set' });
  const provided = req.header('x-api-key');
  if (provided !== expected) return res.status(401).json({ error: 'Unauthorized' });
  next();
}
