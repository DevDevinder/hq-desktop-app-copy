import { kwikMedicalDb } from './supabaseClient.js';
import { fetchPatientIdByNHS } from './patientRepository.js';


export async function createDispatch(dispatchData) {
  try {
    const { data, error } = await kwikMedicalDb
      .from('dispatches')
      .insert([dispatchData])
      .select('*');

    if (error) {
      console.error('Error creating dispatch record:', error);
      throw new Error('Failed to create dispatch record.');
    }

    if (!data || data.length === 0) {
      throw new Error('Dispatch creation failed: no data returned.');
    }

    return data[0];
  } catch (error) {
    console.error('createDispatch error:', error);
    throw error;
  }
}

export async function fetchExistingDispatch(patientId) {
  try {
    const { data, error } = await kwikMedicalDb
      .from('dispatches')
      .select('*')
      .eq('patient_id', patientId)
      .eq('status', 'pending');

    if (error) {
      console.error('Error fetching existing dispatch:', error);
      throw new Error('Error checking for existing dispatch.');
    }

    return data?.[0] || null;
  } catch (error) {
    console.error('fetchExistingDispatch error:', error);
    throw error;
  }
}

export async function fetchDispatchByNHS(nhsNumber) {
  try {
    const patientId = await fetchPatientIdByNHS(nhsNumber);

    if (!patientId) {
      throw new Error(`No patient found for NHS Registration Number: ${nhsNumber}`);
    }

    const { data, error } = await kwikMedicalDb
      .from('dispatches')
      .select(
        `
      dispatch_id,
      patient_id,
      status,
      hospital_id (
        name
      ),
      ambulance_id (
        vehicle_number
      ),
      priority,
      required_specialty,
      call_notes
    `
      )
      .eq('patient_id', patientId)
      .neq('status', 'completed')
      .single();

    if (error) {
      console.error('Error fetching dispatch by NHS registration number:', error);
      throw new Error('Failed to fetch dispatch.');
    }

    return data || null;
  } catch (error) {
    console.error('fetchDispatchByNHS error:', error);
    throw error;
  }
}

export async function fetchDispatches() {
  try {
    const { data, error } = await kwikMedicalDb
      .from('dispatches')
      .select(
        `
      dispatch_id,
      patient_id,
      status,
      hospital_id (
        name
      ),
      ambulance_id (
        vehicle_number
      ),
      priority,
      required_specialty,
      call_notes
    `
      )
      .neq('status', 'completed');

    if (error) {
      console.error('Error fetching dispatches:', error);
      throw new Error('Failed to fetch dispatches.');
    }

    return data || [];
  } catch (error) {
    console.error('fetchDispatches error:', error);
    throw error;
  }
}

export async function reassignHospitalByDispatchId(dispatchId) {
  try {
    const { error } = await kwikMedicalDb
      .from('dispatches')
      .update({ hospital_id: null })
      .eq('dispatch_id', dispatchId);

    if (error) {
      throw new Error('Failed to reassign hospital.');
    }
  } catch (error) {
    console.error('reassignHospitalByDispatchId error:', error);
    throw error;
  }
}