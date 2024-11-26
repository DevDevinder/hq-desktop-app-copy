import { createClient } from '@supabase/supabase-js';

const patientDbUrl = 'https://nrqjhafprdwixajofsyu.supabase.co';
const patientDbKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ycWpoYWZwcmR3aXhham9mc3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyODQ4OTUsImV4cCI6MjA0Njg2MDg5NX0.k1KgYadfUoOTlCTRY8aRBByRqlMNof3D7Mfs0-dCb78';
export const patientDb = createClient(patientDbUrl, patientDbKey);

// KwikMedical Database
const kwikMedicalDbUrl = 'https://vznlzqgdbdvoqpodfgpe.supabase.co';
const kwikMedicalDbKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6bmx6cWdkYmR2b3Fwb2RmZ3BlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyMTcxNjQsImV4cCI6MjA0Njc5MzE2NH0.kR_p4OnRI7uI09UodAQjI12oJjj6k08zc4b84Q-4mDg';
export const kwikMedicalDb = createClient(kwikMedicalDbUrl, kwikMedicalDbKey);