// src/services/realTimeService.js

import { kwikMedicalDb } from '../repositories/supabaseClient.js';
import { findNearestHospital } from './serverFunctionService.js';
import { findAvailableAmbulance } from '../repositories/ambulanceRepository.js';
import { fetchDispatchByNHS } from '../repositories/dispatchRepository.js';
import { renderDispatchForNHS } from '../app/components/dispatchSearch.js';

export function setupDispatchListener(nhsNumber) {
  console.log('Setting up real-time listener...');

  const dispatchChannel = kwikMedicalDb.channel('dispatches:updates');

  // Subscribe to updates on the dispatches table
  dispatchChannel
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'dispatches' },
      async (payload) => {
        const { status, dispatch_id, hospital_id } = payload.new;

        // Update UI only if the update corresponds to the searched NHS number
        try {
          const currentDispatch = await fetchDispatchByNHS(nhsNumber);

          if (currentDispatch?.dispatch_id === dispatch_id) {
            if (status === 'declined') {
              console.log(`Dispatch ${dispatch_id} declined. Reassigning hospital...`);
              reassignHospital(dispatch_id);
            } else if (status === 'accepted') {
              console.log(`Dispatch ${dispatch_id} accepted. Assigning ambulance...`);
              assignAmbulance(dispatch_id, hospital_id);
            }

            // Refresh the specific dispatch display
            renderDispatchForNHS(nhsNumber);
          }
        } catch (error) {
          console.error('Error handling dispatch update:', error);
        }
      }
    )
    .subscribe();

  console.log('Real-time listener subscribed to dispatch updates.');
}

// Reassign a hospital if the dispatch was declined
export async function reassignHospital(dispatchId) {
  try {
    // Fetch the dispatch details, including the current hospital_id
    const { data: dispatch, error: fetchError } = await kwikMedicalDb
      .from('dispatches')
      .select('location, required_specialty, priority, hospital_id')
      .eq('dispatch_id', dispatchId)
      .single();

    if (fetchError) throw new Error('Error fetching dispatch details.');

    const { location, required_specialty, priority, hospital_id } = dispatch;

    // Use the current hospital_id as the excludedHospitalId
    const excludedHospitalId = hospital_id;

    // Find a new hospital excluding the one that just declined
    const reassignedHospital = await findNearestHospital(
      location,
      required_specialty,
      priority,
      excludedHospitalId
    );

    if (!reassignedHospital) {
      console.error(`No hospitals available to reassign for dispatch ${dispatchId}.`);
      return;
    }

    // Update the dispatch record with the new hospital ID and reset the status
    const { error: updateError } = await kwikMedicalDb
      .from('dispatches')
      .update({
        hospital_id: reassignedHospital.hospital_id,
        status: 'pending', // Reset status to 'pending' or appropriate status
      })
      .eq('dispatch_id', dispatchId);

    if (updateError) throw new Error('Error updating dispatch with reassigned hospital.');

    console.log(`Hospital reassigned for dispatch ${dispatchId} to hospital ${reassignedHospital.name}.`);
  } catch (error) {
    console.error('reassignHospital error:', error);
  }
}