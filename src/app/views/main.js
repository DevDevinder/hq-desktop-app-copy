// src/app/views/main.js

import { setupPatientSearch } from '../components/patientSearch.js';
import { setupDispatchSearch } from '../components/dispatchSearch.js';
import { setupFormSubmission } from './formView.js';


document.addEventListener('DOMContentLoaded', () => {
  setupPatientSearch();
  setupDispatchSearch();
  setupFormSubmission();
});

