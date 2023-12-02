import patientData from '../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { Entry, EntryWithoutId, NewPatientEntry, Patient, PatientWithoutSSNAndEntries } from '../types';

const getAllWithoutSSN = (): PatientWithoutSSNAndEntries[] => {
  return patientData.map(({id, name, dateOfBirth, gender, occupation}) => {
    const toReturn: PatientWithoutSSNAndEntries = { id, name, dateOfBirth , gender, occupation};
    return toReturn;
  });
};

const addNewPatient = (patientEntry: NewPatientEntry): Patient => {
  const id = uuidv4();
  const newPatient = {
    ...patientEntry,
    id
  };
  patientData.push(newPatient);
  return newPatient;
};

const getPatientById = (id: string): Patient => {
  const patient = patientData.find((p) => p.id === id);
  if (!patient) {
    throw Error('Patient for given id not found');
  }

  return patient;
};

const addNewPatientEntry = (entry: EntryWithoutId, patient: Patient): Patient => {
  const id = uuidv4();
  const newEntry: Entry = {
    ...entry,
    id
  };
  patient.entries.push(newEntry);
  return patient;
};

export default {
  getAllWithoutSSN,
  addNewPatient,
  getPatientById,
  addNewPatientEntry
};