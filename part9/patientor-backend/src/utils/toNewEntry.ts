import { BaseEntry, Diagnosis, EntryWithoutId,  HealthCheckRating, HospitalEntry,  OccupationalHealthcareEntry, OccupationalHealthcareEntryWithoutId } from "../types";

const isString = (value: unknown): value is string => {
  return typeof value === 'string' && value !== '';
};

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};


const validateString = (value: unknown, errorMessage: string): string => {
  if (!isString(value)) {
    throw Error(errorMessage);
  }

  return value; 
};

const isDate = (value: string): boolean => {
  const regex = /^\d{4}\/\d{2}\/\d{2}$/;
  return regex.test(value);
};

const validateDate = (value: unknown): string => {
  if (!isString(value) || !isDate(value)) {
    throw Error('Invalid Date format');
  }
  return value;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isHealthCheckRating = (value: number): value is HealthCheckRating => {
  return Object.values(HealthCheckRating).map((g) => Number(g)).includes(value);
};

const validateHealthCheckRating = (value: unknown): HealthCheckRating => {
  if (!isNumber(value) || !isHealthCheckRating(value)) {
    throw Error('Invalid HealthCheckRating parameter');
  }

  return value;
};


export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw Error('Invalid argument provided');
  }

 
  if ('description' in object 
  && 'date' in object 
  && 'specialist' in object
  && 'type' in object) {
    const newEntry: Omit<BaseEntry, 'id'> = {
      description: validateString(object.description, 'Invalid description'),
      date: validateDate(object.date),
      specialist: validateString(object.specialist, 'Invalid Specialist param'),
      diagnosisCodes: parseDiagnosisCodes(object),
    };

    switch (object.type) {
      case 'Hospital': {
        if ('discharge' in object) {
          const { date, criteria } = object.discharge as HospitalEntry['discharge'];
          const newHospitalEntry = {
            ...newEntry,
            type: object.type,
            discharge: { date: validateDate(date), criteria: validateString(criteria, 'invalid discharge criteria param')}
          };
          return newHospitalEntry;
        }
        throw Error('missing discharge params for Hospital Entry');
      }
      case 'HealthCheck': {
        if ('healthCheckRating' in object) {
          const newHealthCheckRatingEntry = {
            ...newEntry,
            type: object.type,
            healthCheckRating: validateHealthCheckRating(Number(object.healthCheckRating))
          };
          return newHealthCheckRatingEntry;
        }
        throw Error('missing healthCheckRating param from healthCheckRating Entry');
      }
      case 'OccupationalHealthcare': {
        if ('employerName' in object) {
          const newOccupationalHealthcareEntry: OccupationalHealthcareEntryWithoutId = {
            ...newEntry,
            type: object.type,
            employerName: validateString(object.employerName, 'Invalid emplyoer param')
          };

          if ('sickLeave' in object) {
            const sickLeaveObj = object.sickLeave as OccupationalHealthcareEntry['sickLeave'];
            if (sickLeaveObj?.startDate !== undefined && sickLeaveObj?.endDate !== undefined) {
              newOccupationalHealthcareEntry.sickLeave = object.sickLeave as OccupationalHealthcareEntry['sickLeave'];
            } else {
              throw Error('incomplete Sickleave params');
            }
          }
          return newOccupationalHealthcareEntry;
        }
        throw Error('Missing OccupationalHealthcare Entry params');
      }
    }
  }
  throw Error('Some params are missing, please retry');
};