// src/app/views/patientView.js

export function renderPatients(patients) {
  const resultsContainer = document.querySelector('#search-results');
  resultsContainer.innerHTML = '';

  if (patients.length === 0) {
    resultsContainer.innerHTML = '<p>No matching patients found.</p>';
    return;
  }

  patients.forEach((patient) => {
    const patientCard = document.createElement('div');
    patientCard.classList.add('patient-card');

    patientCard.innerHTML = `
      <div class="patient-details">
        <p><strong>Name:</strong> ${patient.name}</p>
        <p><strong>NHS Number:</strong> ${patient.nhs_registration_number}</p>
        <p><strong>Address:</strong> ${patient.address}</p>
        <p><strong>Condition:</strong> ${patient.medical_history}</p>
      </div>
    `;

    const selectButton = document.createElement('button');
    selectButton.textContent = 'Select';
    selectButton.classList.add('select-button');
    selectButton.addEventListener('click', () => autofillPatient(patient));
    patientCard.appendChild(selectButton);

    resultsContainer.appendChild(patientCard);
  });
}

function autofillPatient(patient) {
  document.querySelector('#submit-name').value = patient.name;
  document.querySelector('#submit-address').value = patient.address;
  document.querySelector('#submit-nhs').value = patient.nhs_registration_number;
  document.querySelector('#submit-condition').value = patient.medical_history;
  document.querySelector('#submit-dob').value = patient.date_of_birth;
  document
    .querySelector('#submit-patient-section')
    .scrollIntoView({ behavior: 'smooth' });
}
