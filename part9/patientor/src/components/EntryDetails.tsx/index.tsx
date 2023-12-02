import { Diagnosis, Entry } from "../../types";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails";

interface EntryDetailsProps {
  entry: Entry
  diagnoses: Diagnosis[]
}

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  switch (entry.type) {
    case 'HealthCheck': {
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses}/>;
    }
    case 'Hospital': {
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    }
    case 'OccupationalHealthcare': {
      return <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses}/>;
    }
  }
};

export default EntryDetails;