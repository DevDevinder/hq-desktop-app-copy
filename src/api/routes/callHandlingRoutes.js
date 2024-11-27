import express from 'express';
import { handleDispatch } from '../controllers/callHandlingController.js';

const router = express.Router();

router.post('/dispatch', handleDispatch); // Handle dispatch creation

export default router;
