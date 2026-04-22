import express from 'express';
import cors from 'cors';
import { productsRouter } from './routes/products';
import { scraperRouter } from './routes/scraper';
import { healthRouter } from './routes/health';
import { adminRouter } from './routes/admin';
import { alertsRouter } from './routes/alerts';

const app = express();
app.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') || '*' }));
app.use(express.json({ limit: '1mb' }));

app.use('/api/health', healthRouter);
app.use('/api/scraper', scraperRouter);
app.use('/api/:site/products', productsRouter);
app.use('/api/:site/alerts', alertsRouter);
app.use('/api/:site/admin', adminRouter);

const port = Number(process.env.PORT ?? 3001);
app.listen(port, () => {
  console.log(`api listening on :${port}`);
});
