"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = void 0;
const types_1 = require("../types");
const isString = (value) => {
    return typeof value === 'string' && value !== '';
};
const isNumber = (value) => {
    return typeof value === 'number';
};
const validateString = (value, errorMessage) => {
    if (!isString(value)) {
        throw Error(errorMessage);
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
const parseDiagnosisCodes = (object) => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [];
    }
    return object.diagnosisCodes;
};
const isHealthCheckRating = (value) => {
    return Object.values(types_1.HealthCheckRating).map((g) => Number(g)).includes(value);
};
const validateHealthCheckRating = (value) => {
    if (!isNumber(value) || !isHealthCheckRating(value)) {
        throw Error('Invalid HealthCheckRating parameter');
    }
    return value;
};
const toNewEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw Error('Invalid argument provided');
    }
    if ('description' in object
        && 'date' in object
        && 'specialist' in object
        && 'type' in object) {
        const newEntry = {
            description: validateString(object.description, 'Invalid description'),
            date: validateDate(object.date),
            specialist: validateString(object.specialist, 'Invalid Specialist param'),
            diagnosisCodes: parseDiagnosisCodes(object),
        };
        switch (object.type) {
            case 'Hospital': {
                if ('discharge' in object) {
                    const { date, criteria } = object.discharge;
                    const newHospitalEntry = Object.assign(Object.assign({}, newEntry), { type: object.type, discharge: { date: validateDate(date), criteria: validateString(criteria, 'invalid discharge criteria param') } });
                    return newHospitalEntry;
                }
                throw Error('missing discharge params for Hospital Entry');
            }
            case 'HealthCheck': {
                if ('healthCheckRating' in object) {
                    const newHealthCheckRatingEntry = Object.assign(Object.assign({}, newEntry), { type: object.type, healthCheckRating: validateHealthCheckRating(Number(object.healthCheckRating)) });
                    return newHealthCheckRatingEntry;
                }
                throw Error('missing healthCheckRating param from healthCheckRating Entry');
            }
            case 'OccupationalHealthcare': {
                if ('employerName' in object) {
                    const newOccupationalHealthcareEntry = Object.assign(Object.assign({}, newEntry), { type: object.type, employerName: validateString(object.employerName, 'Invalid emplyoer param') });
                    if ('sickLeave' in object) {
                        const sickLeaveObj = object.sickLeave;
                        if ((sickLeaveObj === null || sickLeaveObj === void 0 ? void 0 : sickLeaveObj.startDate) !== undefined && (sickLeaveObj === null || sickLeaveObj === void 0 ? void 0 : sickLeaveObj.endDate) !== undefined) {
                            newOccupationalHealthcareEntry.sickLeave = object.sickLeave;
                        }
                        else {
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
exports.toNewEntry = toNewEntry;
