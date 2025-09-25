import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

import animalRoutes from './routes/animalRoutes.js';
import adoptionRoutes from './routes/adoptionRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5001;

// CORS – frontend na localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// obrázky
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// API
app.use('/api/zvirata', animalRoutes);            // /api/zvirata, /api/zvirata/:id
app.use('/api/adopce', adoptionRoutes);           // /api/adopce/:id

// Spuštění serveru
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
