import { Box } from '@mui/material';
import { Diagnosis, HealthCheckEntry } from '../../types';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

interface HealthCheckEntryDetailsProps {
  entry: HealthCheckEntry
  diagnoses: Diagnosis[]
}

const HealthCheckEntryDetails = ({entry, diagnoses}: HealthCheckEntryDetailsProps) => {

  const renderDiagnosesDescription = (codesArr: Array<Diagnosis['code']>) => {
    const lis = codesArr.map((code, idx) => {
      const description = diagnoses.find((d) => d.code === code)!;
      return <li key={idx}>{code} {description ? description.name : null}</li>;
    });
    return (
      <ul>
        {lis}
      </ul>
    );
  };

  const renderHealthRating = () => {
    switch (entry.healthCheckRating) {
      case 0: {
        return (
          <div>
            <FavoriteIcon />
            <FavoriteIcon />           
            <FavoriteIcon />
            <FavoriteIcon />
          </div>
        );
      }
      case 1: {
        return (
          <div>
            <FavoriteIcon />
            <FavoriteIcon />           
            <FavoriteIcon />
          </div>
        );
      }
      case 2: {
        return (
          <div>
            <FavoriteIcon />
            <FavoriteIcon />           
          </div>
        );
      }
      case 3: {
        return (
          <div>
            <HeartBrokenIcon />
          </div>
        );
      }
    }
  };

  return (
    <Box sx={{border: 1, borderRadius: 2, padding: 1, marginBottom: 2 }}>
      <p>{entry.date} <HealthAndSafetyIcon /></p>
      {renderHealthRating()}
      <p style={{fontStyle: 'italic'}}>{entry.description}</p>
      {entry.diagnosisCodes && renderDiagnosesDescription(entry.diagnosisCodes)}
      <p>Diagnose by {entry.specialist}</p>
    </Box>
  );
};

export default HealthCheckEntryDetails;