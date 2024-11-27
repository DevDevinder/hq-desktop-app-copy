import { handleDispatch as handleDispatchService } from '../../services/callHandlingService.js';

export async function handleDispatch(req, res) {
  try {
    const { dispatchData, patientDetails } = req.body;
    const result = await handleDispatchService(dispatchData, patientDetails);
    res.json(result);
  } catch (error) {
    console.error('handleDispatch error:', error);
    if (error.message.includes('A pending dispatch already exists')) {
        return res.status(400).json({ message: error.message }); // Send the exact error message
      }

      res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
    }
}
