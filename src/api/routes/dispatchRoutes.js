import express from 'express';
import {
  createDispatch,
  getDispatches,
  getDispatchByNHS,
  getExistingDispatch,
  reassignHospital,
} from '../controllers/dispatchController.js';

const router = express.Router();

router.post('/', createDispatch);
router.get('/', getDispatches);
router.get('/by-nhs/:nhsNumber', getDispatchByNHS);
router.get('/existing', getExistingDispatch);
router.post('/:dispatchId/reassign', reassignHospital);

export default router;
