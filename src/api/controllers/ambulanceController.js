import {
    findAvailableAmbulance as findAvailableAmbulanceRepo,
    updateAmbulanceStatus as updateAmbulanceStatusRepo,
  } from '../../repositories/ambulanceRepository.js';
  
  export async function findAvailableAmbulance(req, res) {
    try {
      const ambulance = await findAvailableAmbulanceRepo();
      res.json(ambulance);
    } catch (error) {
      console.error('findAvailableAmbulance error:', error);
      res.status(500).json({ message: error.message });
    }
  }
  
  export async function updateAmbulanceStatus(req, res) {
    try {
      const { ambulanceId } = req.params;
      const { status } = req.body;
      await updateAmbulanceStatusRepo(ambulanceId, status);
      res.status(200).json({ message: 'Ambulance status updated successfully' });
    } catch (error) {
      console.error('updateAmbulanceStatus error:', error);
      res.status(500).json({ message: error.message });
    }
  }
  