import express from 'express';
import { productsRouter } from './routes/products';
import { scraperRouter } from './routes/scraper';
import { healthRouter } from './routes/health';

const app = express();
app.use(express.json({ limit: '1mb' }));

app.use('/api/health', healthRouter);
app.use('/api/scraper', scraperRouter);
app.use('/api/:site/products', productsRouter);

const port = Number(process.env.PORT ?? 3001);
app.listen(port, () => {
  console.log(`api listening on :${port}`);
});
