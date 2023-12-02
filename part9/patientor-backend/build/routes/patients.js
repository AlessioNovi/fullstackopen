"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsServices_1 = __importDefault(require("../services/patientsServices"));
const toNewPatientEntry_1 = require("../utils/toNewPatientEntry");
const toNewEntry_1 = require("../utils/toNewEntry");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.json(patientsServices_1.default.getAllWithoutSSN());
});
router.post('/', (req, res) => {
    try {
        const newPatient = (0, toNewPatientEntry_1.toNewPatientEntry)(req.body);
        const newPatientEntry = patientsServices_1.default.addNewPatient(newPatient);
        res.json(newPatientEntry);
    }
    catch (error) {
        let message = 'Something bad happened';
        if (error instanceof Error) {
            message += ` ${error.message}`;
            console.log(message);
            res.status(400).send(message);
        }
        else {
            console.log('Unknown error happened');
            res.status(400).send(error);
        }
    }
});
router.get('/:patientId', (req, res) => {
    try {
        const { patientId } = req.params;
        const patient = patientsServices_1.default.getPatientById(patientId);
        res.json(patient);
    }
    catch (error) {
        let message = 'Something bad happened';
        if (error instanceof Error) {
            message += ` ${error.message}`;
            console.log(message);
            res.status(400).send(message);
        }
        else {
            console.log('Unknown error happened');
            res.status(400).send(error);
        }
    }
});
router.post('/:patientId/entries', (req, res) => {
    try {
        const { patientId } = req.params;
        const patient = patientsServices_1.default.getPatientById(patientId);
        const newEntry = (0, toNewEntry_1.toNewEntry)(req.body);
        const updatedPatient = patientsServices_1.default.addNewPatientEntry(newEntry, patient);
        res.json(updatedPatient);
    }
    catch (error) {
        let message = 'Something bad happened';
        if (error instanceof Error) {
            message += ` ${error.message}`;
            console.log(message);
            res.status(400).send(message);
        }
        else {
            console.log('Unknown error happened');
            res.status(400).send(error);
        }
    }
});
exports.default = router;
