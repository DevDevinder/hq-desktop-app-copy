// src/app/components/operationStatus.js

export function updateOperationStatus(message, status) {
    const statusDiv = document.querySelector('#operation-status');
    statusDiv.textContent = message;
    statusDiv.className = status;
  }
  