import express from 'express';
import patientServices from '../services/patientsServices';
import { toNewPatientEntry } from '../utils/toNewPatientEntry';
import { toNewEntry } from '../utils/toNewEntry';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientServices.getAllWithoutSSN());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const newPatientEntry = patientServices.addNewPatient(newPatient);
    res.json(newPatientEntry);
  } catch (error: unknown) {
    let message = 'Something bad happened';
    if (error instanceof Error) {
      message += ` ${error.message}`;
      console.log(message);
      res.status(400).send(message);
    } else {
      console.log('Unknown error happened');
      res.status(400).send(error);
    }
  }
});

router.get('/:patientId', (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = patientServices.getPatientById(patientId);
    res.json(patient);
  } catch (error) {
    let message = 'Something bad happened';
    if (error instanceof Error) {
      message += ` ${error.message}`;
      console.log(message);
      res.status(400).send(message);
    } else {
      console.log('Unknown error happened');
      res.status(400).send(error);
    }
  }
});

router.post('/:patientId/entries', (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = patientServices.getPatientById(patientId);
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientServices.addNewPatientEntry(newEntry, patient);
    res.json(updatedPatient);
  } catch (error: unknown) {
    let message = 'Something bad happened';
    if (error instanceof Error) {
      message += ` ${error.message}`;
      console.log(message);
      res.status(400).send(message);
    } else {
      console.log('Unknown error happened');
      res.status(400).send(error);
    }
  }
});


export default router;