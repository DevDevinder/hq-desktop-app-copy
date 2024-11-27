import {
    createDispatch as createDispatchDb,
    fetchDispatches as fetchDispatchesDb,
    fetchDispatchByNHS as fetchDispatchByNHSDb,
    fetchExistingDispatch as fetchExistingDispatchDb,
    reassignHospitalByDispatchId,
  } from '../../repositories/dispatchRepository.js';
  
  // Create a dispatch
  export async function createDispatch(req, res) {
    try {
      const dispatchData = req.body;
      const dispatch = await createDispatchDb(dispatchData);
      res.status(201).json(dispatch);
    } catch (error) {
      console.error('createDispatch error:', error);
      res.status(500).json({ message: error.message });
    }
  }
  
  // Get all dispatches
  export async function getDispatches(req, res) {
    try {
      const dispatches = await fetchDispatchesDb();
      res.json(dispatches);
    } catch (error) {
      console.error('getDispatches error:', error);
      res.status(500).json({ message: error.message });
    }
  }
  
  // Get a dispatch by NHS registration number
  export async function getDispatchByNHS(req, res) {
    try {
      const { nhsNumber } = req.params;
      const dispatch = await fetchDispatchByNHSDb(nhsNumber);
      if (!dispatch) {
        res.status(404).json({ message: 'No active dispatch found for this NHS number.' });
        return;
      }
      res.json(dispatch);
    } catch (error) {
      console.error('getDispatchByNHS error:', error);
      res.status(500).json({ message: error.message });
    }
  }
  
  // Get an existing dispatch for a patient
  export async function getExistingDispatch(req, res) {
    try {
      const { patientId } = req.query;
      const dispatch = await fetchExistingDispatchDb(patientId);
      res.json(dispatch || null);
    } catch (error) {
      console.error('getExistingDispatch error:', error);
      res.status(500).json({ message: error.message });
    }
  }
  
  // Reassign a hospital
  export async function reassignHospital(req, res) {
    try {
      const { dispatchId } = req.params;
      await reassignHospitalByDispatchId(dispatchId);
      res.status(200).json({ message: 'Hospital reassigned successfully' });
    } catch (error) {
      console.error('reassignHospital error:', error);
      res.status(500).json({ message: error.message });
    }
  }
  