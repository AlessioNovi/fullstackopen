import diagnosesData from "../data/diagnoses";
import patientData from '../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { Diagnosis, Entry, EntryWithoutId } from "../types";

const getAll = (): Diagnosis[] => {
  return diagnosesData;
};

const addEntryForPatient = (newEntry: EntryWithoutId, id: string): Entry => {
  const patient = patientData.find((p) => p.id === id);

  if (!patient) {
    throw Error('Patient not found for given id');
  }

  const entryObj: Entry = {
    ...newEntry,
    id: uuidv4()
  };

  return entryObj;
};

export default {
  getAll,
  addEntryForPatient
};