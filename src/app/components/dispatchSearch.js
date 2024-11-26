// src/app/components/dispatchSearch.js

import { fetchDispatchByNHS } from '../../repositories/dispatchRepository.js';
import { reassignHospital } from '../../services/realtimeService.js';


export function setupDispatchSearch() {
  document.querySelector('#search-dispatch-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nhsNumber = document.querySelector('#search-nhs-dispatch').value.trim();

    if (!nhsNumber) {
      alert('Please enter an NHS Registration Number.');
      return;
    }

    await renderDispatchForNHS(nhsNumber);
  });
}

export async function renderDispatchForNHS(nhsNumber) {
  const dispatchesContainer = document.querySelector('#dispatches-container');
  dispatchesContainer.innerHTML = '';

  try {
    const dispatch = await fetchDispatchByNHS(nhsNumber);

    if (!dispatch) {
      dispatchesContainer.innerHTML = '<p>No active dispatch found for the provided NHS Registration Number.</p>';
      return;
    }

    // Render the dispatch card
    const dispatchCard = document.createElement('div');
    dispatchCard.classList.add('dispatch-card');

    dispatchCard.innerHTML = `
      <div class="dispatch-details">
        <p><strong>Dispatch ID:</strong> ${dispatch.dispatch_id}</p>
        <p><strong>Patient ID:</strong> ${dispatch.patient_id}</p>
        <p><strong>Status:</strong> ${dispatch.status}</p>
        <p><strong>Hospital:</strong> ${dispatch.hospital_id?.name || 'Not assigned'}</p>
        <p><strong>Ambulance:</strong> ${dispatch.ambulance_id?.vehicle_number || 'Not assigned'}</p>
        <p><strong>Priority:</strong> ${dispatch.priority ? 'Yes' : 'No'}</p>
        <p><strong>Specialty Required:</strong> ${dispatch.required_specialty || 'None'}</p>
        <p><strong>Call Notes:</strong> ${dispatch.call_notes}</p>
        <button class="reassign-button" data-dispatch-id="${dispatch.dispatch_id}">Reassign Hospital</button>
      </div>
    `;

    dispatchesContainer.appendChild(dispatchCard);

    document.querySelectorAll('.reassign-button').forEach((button) => {
      button.addEventListener('click', (event) => {
        const dispatchId = event.target.getAttribute('data-dispatch-id');
        reassignHospital(dispatchId);
        //refresh the dispatch card
        renderDispatchForNHS(nhsNumber);
      });
    });
  } catch (error) {
    console.error('renderDispatchForNHS error:', error);
    dispatchesContainer.innerHTML = `<p>Error fetching dispatch: ${error.message}</p>`;
  }
}

