"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseComment = (comment) => {
    if (!comment || !isString(comment)) {
        throw Error('Missing or incorrect comment');
    }
    return comment;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw Error('Invalid or missing date');
    }
    return date;
};
const isWeather = (param) => {
    return Object.values(types_1.Weather).map(v => v.toString()).includes(param);
};
const parseWeather = (weather) => {
    if (!weather || !isString(weather) || !isWeather(weather)) {
        throw Error('Invalid or missing weather');
    }
    return weather;
};
const isVisibility = (param) => {
    return Object.values(types_1.Visibility).map(v => v.toString()).includes(param);
};
const parseVisibility = (visibility) => {
    if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect or missing visibility: ' + visibility);
    }
    return visibility;
};
const toNewDiaryEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw Error('incorrect or missing data');
    }
    if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object) {
        const newEntry = {
            comment: parseComment(object.comment),
            date: parseDate(object.date),
            weather: parseWeather(object.weather),
            visibility: parseVisibility(object.visibility)
        };
        return newEntry;
    }
    throw Error('Incorrect data. Some fields are missing');
};
exports.default = toNewDiaryEntry;
