// src/app/components/patientSearch.js

import { fetchPatients } from '../../repositories/patientRepository.js';
import { renderPatients } from '../views/patientView.js';

export function setupPatientSearch() {
  document.querySelector('#search-patient-form').addEventListener('submit', searchPatients);
}

async function searchPatients(event) {
  event.preventDefault();

  const name = document.querySelector('#search-name').value;
  const address = document.querySelector('#search-address').value;
  const nhs = document.querySelector('#search-nhs').value;
  const condition = document.querySelector('#search-condition').value;

  const patients = await fetchPatients({ name, address, nhs, condition });
  renderPatients(patients);
}
