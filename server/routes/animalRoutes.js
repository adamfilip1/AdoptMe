import express from 'express';
import { getAllAnimals, getAnimalById } from '../controllers/animalController.js';

const router = express.Router();

// route bude po připojení aktivní na: /api/zvirata/
router.get('/', getAllAnimals);

// route bude aktivní na: /api/zvirata/:id
router.get('/:id', getAnimalById);

export default router;
