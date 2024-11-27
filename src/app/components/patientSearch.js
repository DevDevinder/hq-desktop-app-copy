import { renderPatients } from '../views/patientView.js';

export function setupPatientSearch() {
  document
    .querySelector('#search-patient-form')
    .addEventListener('submit', searchPatients);
}

async function fetchPatientsFromAPI(filters) {
  try {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`http://localhost:3000/api/patients?${query}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch patients: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching patients:', error);
    return []; // Return an empty array to avoid breaking the UI
  }
}

async function searchPatients(event) {
  event.preventDefault();

  // Extract search filters from the form
  const name = document.querySelector('#search-name').value;
  const address = document.querySelector('#search-address').value;
  const nhs = document.querySelector('#search-nhs').value;
  const condition = document.querySelector('#search-condition').value;

  const filters = { name, address, nhs, condition };

  try {
    const patients = await fetchPatientsFromAPI(filters);
    renderPatients(patients);
  } catch (error) {
    console.error('Error in searchPatients:', error);
    document.querySelector(
      '#search-results'
    ).innerHTML = '<p>Failed to fetch patients. Please try again later.</p>';
  }
}
