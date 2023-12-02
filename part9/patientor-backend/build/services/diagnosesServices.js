"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_1 = __importDefault(require("../data/diagnoses"));
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const getAll = () => {
    return diagnoses_1.default;
};
const addEntryForPatient = (newEntry, id) => {
    const patient = patients_1.default.find((p) => p.id === id);
    if (!patient) {
        throw Error('Patient not found for given id');
    }
    const entryObj = Object.assign(Object.assign({}, newEntry), { id: (0, uuid_1.v4)() });
    return entryObj;
};
exports.default = {
    getAll,
    addEntryForPatient
};
