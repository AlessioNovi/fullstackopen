import { Box } from '@mui/material';
import { Diagnosis, HospitalEntry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface HospitalEntryProps {
  entry: HospitalEntry
  diagnoses: Diagnosis[]
}

const HospitalEntryDetails = ({entry, diagnoses}: HospitalEntryProps) => {

  const renderDiagnosesDescription = (codesArr: Array<Diagnosis['code']>) => {
    const lis = codesArr.map((code, idx) => {
      const description = diagnoses.find((d) => d.code === code)!;
      return <li key={idx}>{code} {description.name}</li>;
    });
    return (
      <ul>
        {lis}
      </ul>
    );
  };

  return (
    <Box sx={{border: 1, borderRadius: 2, padding: 1, marginBottom: 2 }}>
      <p>{entry.date} <LocalHospitalIcon /></p>
      <p style={{fontStyle: 'italic'}}>{entry.description}</p>
      {entry.diagnosisCodes && renderDiagnosesDescription(entry.diagnosisCodes)}
      <p>Diagnose by {entry.specialist}</p>
      <p>Discharged on: {entry.discharge.date} Based on: {entry.discharge.criteria}</p>
    </Box>
  );
};

export default HospitalEntryDetails;