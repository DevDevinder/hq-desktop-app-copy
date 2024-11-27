import express from 'express';
import { findNearestHospital, geocodeAddress } from '../controllers/hospitalController.js';

const router = express.Router();

router.post('/nearest', findNearestHospital);
router.post('/geocode', geocodeAddress);

export default router;
