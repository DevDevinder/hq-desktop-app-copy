// src/services/serverFunctionService.js

import { kwikMedicalDb } from '../repositories/supabaseClient.js';

export async function findNearestHospital(location, requiredSpecialty, isPriority, excludedHospitalId = null) {
  try {
    const { data, error } = await kwikMedicalDb.rpc('find_nearest_hospital', {
      patient_location: location, // Should be in 'SRID=4326;POINT(lon lat)' format
      required_specialty: requiredSpecialty || null,
      is_priority: isPriority,
      excluded_hospital_id: excludedHospitalId,
    });

    if (error) {
      console.error('Error finding nearest hospital:', error);
      throw new Error('Failed to fetch the nearest hospital.');
    }

    return data[0]; // Return the first matching hospital
  } catch (err) {
    console.error('findNearestHospital error:', err);
    throw err;
  }
}
