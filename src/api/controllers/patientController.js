import {
    fetchPatient,
    fetchPatients,
    createPatient as createPatientDb,
    updatePatient as updatePatientDb,
  } from '../../repositories/patientRepository.js';
  
  // Get a specific patient
  export async function getPatient(req, res) {
    try {
      const filters = req.query; // e.g., ?name=John
      const patient = await fetchPatient(filters);
      if (!patient) return res.status(404).json({ message: 'Patient not found' });
      res.json(patient);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  // Get a list of patients
  export async function getPatients(req, res) {
    try {
      const filters = req.query; 
      const patients = await fetchPatients(filters);
      res.json(patients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  // Create a new patient
  export async function createPatient(req, res) {
    try {
      const patientDetails = req.body;
      const patientId = await createPatientDb(patientDetails);
      res.status(201).json({ patientId });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
  // Update a patient
  export async function updatePatient(req, res) {
    try {
      const { id } = req.params;
      const updatedFields = req.body;
      await updatePatientDb(id, updatedFields);
      res.status(200).json({ message: 'Patient updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  