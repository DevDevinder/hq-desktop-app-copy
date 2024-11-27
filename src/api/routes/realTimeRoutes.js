import express from 'express';
import { setupDispatchListener } from '../controllers/realTimeController.js';

const router = express.Router();

router.post('/dispatch-listener', setupDispatchListener);

export default router;
