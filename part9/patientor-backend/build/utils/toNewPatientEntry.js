"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientEntry = void 0;
const types_1 = require("../types");
const isString = (value) => {
    return typeof value === 'string' && value !== '';
};
const validateName = (value) => {
    if (!isString(value)) {
        throw Error('Invalid name parameter');
    }
    return value;
};
const isDate = (value) => {
    const regex = /^\d{4}\/\d{2}\/\d{2}$/;
    return regex.test(value);
};
const validateDate = (value) => {
    if (!isString(value) || !isDate(value)) {
        throw Error('Invalid Date format');
    }
    return value;
};
const validateSsn = (value) => {
    if (!isString(value)) {
        throw Error('Invalid SSN parameter');
    }
    return value;
};
const validateOccupation = (value) => {
    if (!isString(value)) {
        throw Error('Invalid Occupation parameter');
    }
    return value;
};
const isGender = (value) => {
    return Object.values(types_1.Gender).map((g) => g.toString()).includes(value);
};
const validateGender = (value) => {
    if (!isString(value) || !isGender(value)) {
        throw Error('Invalid Gender parameter');
    }
    return value;
};
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw Error('Invalid argument provided');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newPatientEntry = {
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
exports.toNewPatientEntry = toNewPatientEntry;
