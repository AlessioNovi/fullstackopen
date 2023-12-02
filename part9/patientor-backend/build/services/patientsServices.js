"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const getAllWithoutSSN = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => {
        const toReturn = { id, name, dateOfBirth, gender, occupation };
        return toReturn;
    });
};
const addNewPatient = (patientEntry) => {
    const id = (0, uuid_1.v4)();
    const newPatient = Object.assign(Object.assign({}, patientEntry), { id });
    patients_1.default.push(newPatient);
    return newPatient;
};
const getPatientById = (id) => {
    const patient = patients_1.default.find((p) => p.id === id);
    if (!patient) {
        throw Error('Patient for given id not found');
    }
    return patient;
};
const addNewPatientEntry = (entry, patient) => {
    const id = (0, uuid_1.v4)();
    const newEntry = Object.assign(Object.assign({}, entry), { id });
    patient.entries.push(newEntry);
    return patient;
};
exports.default = {
    getAllWithoutSSN,
    addNewPatient,
    getPatientById,
    addNewPatientEntry
};
