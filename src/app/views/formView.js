// src/app/views/formView.js

import { geocodeAddress } from '../../services/geoService.js';
import { handleDispatch } from '../../services/callHandlingService.js';
import { updateOperationStatus } from '../components/operationStatus.js';

export function setupFormSubmission() {
  document.querySelector('#submit-patient-form').addEventListener('submit', submitPatient);
  document.querySelector('#geocode-button').addEventListener('click', geocodeAndUpdateLocation);
}

async function geocodeAndUpdateLocation() {
  const address = document.querySelector('#submit-location').value;

  if (!address) {
    alert('Please enter an address to geocode.');
    return;
  }

  try {
    const location = await geocodeAddress(address);
    document.querySelector('#submit-location').value = `${location.lat}, ${location.lng}`;
    alert(`Geocoded Location: Latitude ${location.lat}, Longitude ${location.lng}`);
  } catch (error) {
    alert(`Geocoding Error: ${error.message}`);
  }
}

async function submitPatient(event) {
  event.preventDefault();

  const name = document.querySelector('#submit-name').value;
  const address = document.querySelector('#submit-address').value;
  const nhs = document.querySelector('#submit-nhs').value;
  const dob = document.querySelector('#submit-dob').value;
  const condition = document.querySelector('#submit-condition').value;
  const location = document.querySelector('#submit-location').value;
  const callNotes = document.querySelector('#call-notes').value;
  const requiresSpecialist = document.querySelector('#specialist-required').checked;
  const priority = document.querySelector('#priority').checked;
  const requiredSpecialty = document.querySelector('#required-specialty').value;

  if (!name || !address || !nhs || !condition || !dob || !location) {
    updateOperationStatus('All fields except call notes and specialist toggle are required.', 'error');
    return;
  }

  try {
    const [lat, lng] = location.split(',').map(parseFloat);

    if (isNaN(lat) || isNaN(lng)) {
      updateOperationStatus('Invalid location format. Please use "lat,lng".', 'error');
      return;
    }

    const patientDetails = {
      name,
      nhs_registration_number: nhs,
      address,
      date_of_birth: dob,
      medical_history: condition,
    };

    const dispatchData = {
      priority,
      requires_specialist: requiresSpecialist,
      call_notes: callNotes || 'No notes provided',
      required_specialty: requiresSpecialist ? requiredSpecialty : null,
      location: `SRID=4326;POINT(${lng} ${lat})`,
      address,
    };

    const { dispatchId, assignedHospital, assignedAmbulance } = await handleDispatch(
      dispatchData,
      patientDetails
    );

    if (!dispatchId) {
      updateOperationStatus('Dispatch creation failed.', 'error');
      return;
    }

    updateOperationStatus(
      `Dispatch created successfully. Hospital: ${assignedHospital.name}, Ambulance ID: ${assignedAmbulance.ambulance_id}`,
      'success'
    );
  } catch (error) {
    console.error('submitPatient error:', error);
    updateOperationStatus(`Error: ${error.message}`, 'error');
  }
}
