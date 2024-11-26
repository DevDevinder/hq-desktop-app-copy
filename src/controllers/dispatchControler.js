import { fetchDispatchByNHS, createDispatch } from '../repositories/dispatchRepository.js';
import { renderDispatchForNHS, updateOperationStatus } from '../app/views/uiUtils.js';

export async function handleDispatchSearch(event) {
  event.preventDefault();

  const nhsNumber = document.querySelector('#search-nhs-dispatch').value.trim();

  if (!nhsNumber) {
    alert('Please enter an NHS Registration Number.');
    return;
  }

  await renderDispatchForNHS(nhsNumber);
}
