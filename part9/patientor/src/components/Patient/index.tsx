import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Diagnosis, Patient } from "../../types";
import { AxiosError } from "axios";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryDetails from "../EntryDetails.tsx";
import AddEntry from "../AddEntry/index.tsx";

interface PatientDetailsProps {
  diagnoses: Diagnosis[]
}


const PatientDetails = ({diagnoses}: PatientDetailsProps) => {
  const { patientId }  = useParams(); 
  const [patientDetails, setPatientDetails] = useState<null | Patient>(null);

  const renderGender = () => {
    if (patientDetails?.gender === 'male') {
      return (
        <MaleIcon />
      );
    }
    else if (patientDetails?.gender === 'female') {
      return (
        <FemaleIcon />
      );
    }
    else {
      return (
        <TransgenderIcon />
      );
    }
  };
  
  useEffect(() => {
    (async () => {
      try {
        const request = await patientService.getById(patientId!);
        setPatientDetails(request);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error.response?.data);
        } else {
          console.log(error);
        }
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (patientDetails === null) {
    return (
      <p>Failed to fetch User details</p>
    );
  }

  return (
    <>
      <Box sx={{marginTop: 3}}>
        <Typography variant="h4">
          {patientDetails.name} {renderGender()}
        </Typography>
        <p>SSN: {patientDetails.ssn}</p>
        <p>Occupation: {patientDetails.occupation}</p>
        <AddEntry setPatientDetails={setPatientDetails} diagnoses={diagnoses}/>
      </Box>
      <Box sx={{marginTop: 3}}>
      </Box>
      <p style={{fontWeight: 'bold'}}>Entries</p>
      {patientDetails.entries.length === 0 ?  <p>No Entries</p> : (
        patientDetails.entries.map((entry) => <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses}/>)
      )}
    </>
  );
};

export default PatientDetails;