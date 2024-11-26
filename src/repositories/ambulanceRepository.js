// src/repositories/ambulanceRepository.js

import { kwikMedicalDb } from './supabaseClient.js';

export async function findAvailableAmbulance() {
  try {
    const { data: ambulances, error } = await kwikMedicalDb
      .from('ambulances')
      .select('*')
      .eq('status', 'available')
      .limit(1);

    if (error) {
      console.error('Error finding available ambulance:', error);
      throw new Error('Failed to find an available ambulance.');
    }

    if (!ambulances || ambulances.length === 0) {
      throw new Error('No ambulances available.');
    }

    return ambulances[0];
  } catch (error) {
    console.error('findAvailableAmbulance error:', error);
    throw error;
  }
}

//update found ambulance status to in service
export async function updateAmbulanceStatus(ambulanceId, status) {
  try {
    const { data, error } = await kwikMedicalDb
      .from('ambulances')
      .update({ status })
      .eq('ambulance_id', ambulanceId);

    if (error) {
      console.error('Error updating ambulance status:', error);
      throw new Error('Failed to update ambulance status.');
    }

    return data;
  } catch (error) {
    console.error('updateAmbulanceStatus error:', error);
    throw error;
  }
}
