import express, { type Express } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { compress } from './controllers/compression.controller.js';

const app: Express = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
  });
});

app.use('/api/compress', upload.single('file'), compress);

export default app;
