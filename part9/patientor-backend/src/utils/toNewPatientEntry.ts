import { Gender, NewPatientEntry } from "../types";

const isString = (value: unknown): value is string => {
  return typeof value === 'string' && value !== '';
};

const validateName = (value: unknown): string => {
  if (!isString(value)) {
    throw Error('Invalid name parameter');
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

const validateSsn = (value: unknown): string => {
  if (!isString(value)) {
    throw Error('Invalid SSN parameter');
  }

  return value;
};

const validateOccupation = (value: unknown): string => {
  if (!isString(value)) {
    throw Error('Invalid Occupation parameter');
  }

  return value;
};

const isGender = (value: string): value is Gender => {
  return Object.values(Gender).map((g) => g.toString()).includes(value);
};

const validateGender = (value: unknown): Gender => {
  if (!isString(value) || !isGender(value)) {
    throw Error('Invalid Gender parameter');
  }

  return value;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw Error('Invalid argument provided');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatientEntry: NewPatientEntry = {
      name: validateName(object.name),
      dateOfBirth: validateDate(object.dateOfBirth),
      ssn: validateSsn(object.ssn),
      gender: validateGender(object.gender),
      occupation: validateOccupation(object.occupation),
      entries: []
    };
    return newPatientEntry;
  }

  throw Error('Some parameters are missing. Please provide in full');
};