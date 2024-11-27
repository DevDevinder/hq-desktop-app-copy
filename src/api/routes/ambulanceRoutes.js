import express from 'express';
import {
  findAvailableAmbulance,
  updateAmbulanceStatus,
} from '../controllers/ambulanceController.js';

const router = express.Router();

router.get('/available', findAvailableAmbulance); // Find available ambulance
router.put('/:ambulanceId/status', updateAmbulanceStatus); // Update ambulance status

export default router;
