/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;
const url = process.env.MONGODB_URI;
const Person = require('./models/person');

morgan.token('body', (req) => JSON.stringify(req.body));

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('dist'));

// let phoneEntries = [
//   {
//     "id": 1,
//     "name": "Arto Hellas",
//     "number": "040-123456"
//   },
//   {
//     "id": 2,
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523"
//   },
//   {
//     "id": 3,
//     "name": "Dan Abramov",
//     "number": "12-43-234345"
//   },
//   {
//     "id": 4,
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122"
//   }
// ]

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});

// eslint-disable-next-line consistent-return
app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ message: 'Missing name or number' });
  }

  const newEntry = new Person({ name, number });
  newEntry.save().then((result) => {
    res.json(result);
  })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body;
  Person.findByIdAndUpdate(req.body.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((result) => {
      if (!result) {
        res.statusMessage = 'Resource with given id not found';
        res.status(404).end();
      } else {
        res.json(result);
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log(`Person of id ${result.id} has been deleted`);
      res.status(204).end();
    })
    .catch((error) => next(error));

  // phoneEntries = phoneEntries.filter(entry => entry.id !== id)
  // res.status(204).end()
});

app.get('/info', (req, res) => {
  Person.find({})
    .then((result) => {
      const entries = result.length;
      const date = new Date();
      const text = `<div>
                    <p>PhoneBook has ${entries} entries currently</p>
                    <p>${date}</p>
                    </div>`;
      res.send(text);
    });
});

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'invalid id parameter' });
  } if (error.name === 'ValidationError') {
    return res.status(400).json({ message: error.message });
  }

  return next(error);
};

app.use(errorHandler);

console.log('Establishing Connections');
console.log();

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MONGODB');
    app.listen(PORT, () => console.log(`Express App listening on port ${PORT}`));
  })
  .catch((err) => console.log('DB connection failed with error', err.message));
