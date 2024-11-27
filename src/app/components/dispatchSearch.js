export function setupDispatchSearch() {
  document
    .querySelector('#search-dispatch-form')
    .addEventListener('submit', async (event) => {
      event.preventDefault();

      const nhsNumber = document.querySelector('#search-nhs-dispatch').value.trim();

      if (!nhsNumber) {
        alert('Please enter an NHS Registration Number.');
        return;
      }

      await renderDispatchForNHS(nhsNumber);
    });
}

async function fetchDispatchByNHSFromAPI(nhsNumber) {
  try {
    const response = await fetch(`http://localhost:3000/api/dispatches/by-nhs/${nhsNumber}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch dispatch: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('fetchDispatchByNHSFromAPI error:', error);
    throw error;
  }
}

export async function renderDispatchForNHS(nhsNumber) {
  const dispatchesContainer = document.querySelector('#dispatches-container');
  dispatchesContainer.innerHTML = '';

  try {
    const dispatch = await fetchDispatchByNHSFromAPI(nhsNumber);

    if (!dispatch) {
      dispatchesContainer.innerHTML =
        '<p>No active dispatch found for the provided NHS Registration Number.</p>';
      return;
    }

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
      button.addEventListener('click', async (event) => {
        const dispatchId = event.target.getAttribute('data-dispatch-id');
        await reassignHospital(dispatchId);
        await renderDispatchForNHS(nhsNumber);
      });
    });
  } catch (error) {
    console.error('renderDispatchForNHS error:', error);
    dispatchesContainer.innerHTML = `<p>Error fetching dispatch: ${error.message}</p>`;
  }
}

async function reassignHospital(dispatchId) {
  try {
    const response = await fetch(`http://localhost:3000/api/dispatches/${dispatchId}/reassign`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Failed to reassign hospital: ${response.statusText}`);
    }

    alert('Hospital reassigned successfully!');
  } catch (error) {
    console.error('reassignHospital error:', error);
    alert('Failed to reassign hospital. Please try again.');
  }
}
