// src/app/views/dispatchView.js

import { fetchDispatches } from '../../repositories/dispatchRepository.js';
import { reassignHospital } from '../../services/realtimeService.js';


export async function renderDispatches() {
  const dispatchesContainer = document.querySelector('#dispatches-container');
  if (!dispatchesContainer) {
    console.error('Dispatches container not found.');
    return;
  }
  dispatchesContainer.innerHTML = '';

  try {
    const dispatches = await fetchDispatches();

    if (dispatches.length === 0) {
      dispatchesContainer.innerHTML = '<p>No active dispatches to display.</p>';
      return;
    }

    dispatches.forEach((dispatch) => {
      // ... Render each dispatch card
    });

    document.querySelectorAll('.reassign-button').forEach((button) => {
      button.addEventListener('click', (event) => {
        const dispatchId = event.target.getAttribute('data-dispatch-id');
        handleReassignHospital(dispatchId);
      });
    });
  } catch (error) {
    console.error('renderDispatches error:', error);
    dispatchesContainer.innerHTML = `<p>Error fetching dispatches: ${error.message}</p>`;
  }
}
