import { Select, MenuItem, SelectChangeEvent, Box, Alert } from "@mui/material";
import { InputLabel } from '@mui/material';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, EntryWithoutId, Patient } from "../../types";
import patientsService from "../../services/patients";
import { AxiosError } from "axios";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalHealthcareEntryForm from "./OccupationalHealthcareEntryForm";

interface AddEntryProps {
  setPatientDetails: React.Dispatch<React.SetStateAction<Patient | null>>
  diagnoses: Diagnosis[]
}

const AddEntry = ({ setPatientDetails, diagnoses }: AddEntryProps) => {
  const { patientId } = useParams();
  const [entryForm, setEntryForm] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: SelectChangeEvent) => {
    setEntryForm(e.target.value);
  };

  const handleSubmit = async (entry: EntryWithoutId) => {
    try {
      const updatedPatient = await patientsService.createEntryForPatient(patientId!, entry);
      setPatientDetails(updatedPatient);
      setEntryForm('');
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data);
      } else {
        setError('Unknown Error occured');
      }
      setTimeout(() => setError(''), 2000);
    }
  };

  const renderForm = () => {
    switch(entryForm) {
      case 'HealthCheckEntry': {
        return <HealthCheckEntryForm onSubmit={handleSubmit} setEntryForm={setEntryForm} diagnoses={diagnoses}/>;
      }
      case 'HospitalEntry': {
        return <HospitalEntryForm onSubmit={handleSubmit} setEntryForm={setEntryForm} diagnoses={diagnoses} />;
      }
      case 'OccupationalHealthcareEntry': {
        return <OccupationalHealthcareEntryForm onSubmit={handleSubmit} setEntryForm={setEntryForm} diagnoses={diagnoses} />;
      }
    }
  };



  return (
  <Box>
  <InputLabel id="entry-form-select">New Entry</InputLabel>
  <Select
    labelId="entry-form-select"
    id="entry-form-select"
    value={entryForm}
    onChange={handleChange}
  >
    <MenuItem value={"HealthCheckEntry"}>HealthCheckEntry</MenuItem>
    <MenuItem value={"HospitalEntry"}>HospitalEntry</MenuItem>
    <MenuItem value={"OccupationalHealthcareEntry"}>OccupationalHealthcareEntry</MenuItem>
  </Select>
  {error && <Alert severity="error">{error}</Alert>}
  {renderForm()}
  </Box>
  );
};

export default AddEntry;