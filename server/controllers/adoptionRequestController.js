import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const adopcePath = path.join(__dirname, '../data/adopce.json');

export const createAdoptionRequest = (req, res) => {
  const animalId = req.params.id;
  const { jmeno, email, telefon, zprava, adresa } = req.body;

  // základní validace
  if (!jmeno || !email || !telefon || !adresa) {
    return res.status(400).json({ code: 'dtoInIsNotValid', message: 'Chybí povinné údaje' });
  }

  const newRequest = {
    id: Date.now().toString(),
    zvireId: animalId,
    jmeno,
    email,
    telefon,
    adresa,
    zprava,
    datumZadosti: new Date().toISOString(),
    stav: 'čeká na schválení'
  };

  try {
    const data = JSON.parse(fs.readFileSync(adopcePath, 'utf-8'));
    data.push(newRequest);

    fs.writeFileSync(adopcePath, JSON.stringify(data, null, 2), 'utf-8');
    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Chyba při ukládání adopční žádosti:', error);
    res.status(500).json({ code: 'internalError', message: 'Nepodařilo se uložit žádost' });
  }
};
