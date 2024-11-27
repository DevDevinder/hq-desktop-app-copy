// src/api/routes/patientRoutes.js

import express from 'express';
import {
  getPatient,
  getPatients,
  createPatient,
  updatePatient,
} from '../controllers/patientController.js';

const router = express.Router();

router.get('/', getPatients);
router.get('/:id', getPatient); 
router.post('/', createPatient); 
router.put('/:id', updatePatient);

export default router;
