import { fetchPatients } from '../repositories/patientRepository.js';

export async function handlePatientSearch(event) {
  event.preventDefault();

  const name = document.querySelector('#search-name').value;
  const address = document.querySelector('#search-address').value;
  const nhs = document.querySelector('#search-nhs').value;
  const condition = document.querySelector('#search-condition').value;

  const patients = await fetchPatients({ name, address, nhs, condition });
  renderPatients(patients);
}
