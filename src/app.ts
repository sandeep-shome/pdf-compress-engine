import express, { type Express } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

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

export default app;
