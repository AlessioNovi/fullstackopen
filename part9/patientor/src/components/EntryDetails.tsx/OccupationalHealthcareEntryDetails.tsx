import { Box } from '@mui/material';
import { Diagnosis,  OccupationalHealthcareEntry } from '../../types';
import WorkIcon from '@mui/icons-material/Work';

interface OccupationalHealthcareEntryDetailsProps {
  entry: OccupationalHealthcareEntry
  diagnoses: Diagnosis[]
}

const OccupationalHealthcareEntryDetails = ({entry, diagnoses}: OccupationalHealthcareEntryDetailsProps) => {

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

  const renderSickLeave = (leaveObj: OccupationalHealthcareEntry['sickLeave']) => {
    return <p>Sick Leave started {leaveObj?.endDate} - Sick Leave Ended {leaveObj?.startDate}</p>;
  };

  return (
    <Box sx={{border: 1, borderRadius: 2, padding: 1, marginBottom: 2 }}>
      <p>{entry.date} <WorkIcon /> <span style={{fontStyle: 'italic'}}>{entry.employerName}</span></p>
      <p style={{fontStyle: 'italic'}}>{entry.description}</p>
      {entry.diagnosisCodes && renderDiagnosesDescription(entry.diagnosisCodes)}
      {entry.sickLeave && renderSickLeave(entry.sickLeave)}
      <p>Diagnose by {entry.specialist}</p>
    </Box>
  );
};

export default OccupationalHealthcareEntryDetails;