import { setupDispatchListener as setupDispatchListenerService } from '../../services/realtimeService.js';

export async function setupDispatchListener(req, res) {
  try {
    const { nhsNumber } = req.body;
    await setupDispatchListenerService(nhsNumber);
    res.status(200).json({ message: 'Real-time listener set up successfully.' });
  } catch (error) {
    console.error('setupDispatchListener error:', error);
    res.status(500).json({ message: error.message });
  }
}
