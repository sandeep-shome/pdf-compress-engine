import express, { type Express } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compressionRoute from './routes/compression.route.js';

const app: Express = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
  });
});

app.use('/api', compressionRoute);

export default app;
