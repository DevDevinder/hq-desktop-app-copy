// src/services/callHandlingService.js

import { findNearestHospital } from './serverFunctionService.js';
import { findAvailableAmbulance } from '../repositories/ambulanceRepository.js';
import { updateAmbulanceStatus } from '../repositories/ambulanceRepository.js';
import { fetchPatient } from '../repositories/patientRepository.js';
import { createDispatch } from '../repositories/dispatchRepository.js';
import { updatePatient } from '../repositories/patientRepository.js';
import { createPatient } from '../repositories/patientRepository.js';
import { fetchExistingDispatch } from '../repositories/dispatchRepository.js';



// Main handler for dispatch logic
export async function handleDispatch(dispatchData, patientDetails) {
  try {
    const existingPatient = await fetchPatient(patientDetails);
    let patientId;

    if (existingPatient) {
      const existingDispatch = await fetchExistingDispatch(existingPatient.patient_id);

      if (existingDispatch) {
        throw new Error(
          `A pending dispatch already exists for patient ${existingPatient.name} (Dispatch ID: ${existingDispatch.dispatch_id}).`
        );
      }

      await updatePatient(existingPatient.patient_id, { address: dispatchData.address });
      patientId = existingPatient.patient_id;
    } else {
      // Corrected variable assignment
      const newPatientId = await createPatient(patientDetails);
      patientId = newPatientId;
    }

    // Ensure dispatchData.location is in the correct format
    const patientLocation = dispatchData.location; // Should be 'SRID=4326;POINT(lon lat)'

    // Corrected order of parameters
    const assignedHospital = await findNearestHospital(
      patientLocation,
      dispatchData.required_specialty,
      dispatchData.priority
    );

    if (!assignedHospital) throw new Error('No suitable hospital found.');

    const assignedAmbulance = await findAvailableAmbulance();

    if (!assignedAmbulance) throw new Error('No available ambulances.');

    const dispatchRecord = {
      ...dispatchData,
      patient_id: patientId,
      hospital_id: assignedHospital.hospital_id,
      ambulance_id: assignedAmbulance.ambulance_id,
      status: 'pending',
    };

    const createdDispatch = await createDispatch(dispatchRecord);

    if (!createdDispatch) {
      throw new Error('Dispatch creation failed.');
    }
      //update the ambulance status to in service
      await updateAmbulanceStatus(assignedAmbulance.ambulance_id, 'in service');

    return {
      dispatchId: createdDispatch.dispatch_id,
      assignedHospital,
      assignedAmbulance,
    };

  
  } catch (error) {
    console.error('handleDispatch error:', error);
    throw error;
  }
}