import express from 'express';
import { createAdoptionRequest } from '../controllers/adoptionRequestController.js';

const router = express.Router();

router.post('/:id', createAdoptionRequest);

export default router;
