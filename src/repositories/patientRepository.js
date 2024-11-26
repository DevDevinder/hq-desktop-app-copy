// src/repositories/patientRepository.js

import { kwikMedicalDb } from './supabaseClient.js';
import { patientDb } from './supabaseClient.js';


export async function fetchPatient(filters) {
  try {
    let query = kwikMedicalDb.from('patients').select('*');

    if (filters.name) query = query.ilike('name', `%${filters.name}%`);
    if (filters.nhs_registration_number)
      query = query.eq('nhs_registration_number', filters.nhs_registration_number);

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching patient:', error);
      throw new Error('Error fetching patient.');
    }

    return data?.[0] || null;
  } catch (error) {
    console.error('fetchPatient error:', error);
    throw error;
  }
}

export async function fetchPatients(filters) {
  try {
    let query = patientDb.from('patients').select('*');

    if (filters.name) query = query.ilike('name', `%${filters.name}%`);
    if (filters.address) query = query.ilike('address', `%${filters.address}%`);
    if (filters.nhs) query = query.eq('nhs_registration_number', filters.nhs);
    if (filters.condition) query = query.ilike('medical_history', `%${filters.condition}%`);

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching patients:', error);
      throw new Error('Error fetching patients.');
    }

    return data || [];
  } catch (error) {
    console.error('fetchPatients error:', error);
    throw error;
  }
}

export async function fetchPatientIdByNHS(nhsNumber) {
  try {
    const { data, error } = await kwikMedicalDb
      .from('patients')
      .select('patient_id')
      .eq('nhs_registration_number', nhsNumber)
      .single();

    if (error) {
      console.error('Error fetching patient ID:', error);
      throw new Error('Failed to fetch patient ID.');
    }

    return data?.patient_id || null;
  } catch (error) {
    console.error('fetchPatientIdByNHS error:', error);
    throw error;
  }
}

export async function updatePatient(patientId, updatedFields) {
  try {
    const { error } = await kwikMedicalDb
      .from('patients')
      .update(updatedFields)
      .eq('patient_id', patientId);

    if (error) {
      console.error('Error updating patient:', error);
      throw new Error('Error updating patient record.');
    }
  } catch (error) {
    console.error('updatePatient error:', error);
    throw error;
  }
}

export async function createPatient(patientDetails) {
  try {
    const { data, error } = await kwikMedicalDb
      .from('patients')
      .insert([patientDetails])
      .select('patient_id');

    if (error) throw new Error('Error creating new patient record.');
    return data?.[0]?.patient_id;
  } catch (error) {
    console.error('createPatient error:', error);
    throw error;
  }
}
