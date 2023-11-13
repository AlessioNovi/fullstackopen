/* eslint-disable no-console */
const mongoose = require('mongoose');

// eslint-disable-next-line no-unused-vars
const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const url = null; // removed in ordert not to share credentials

mongoose.set('strictQuery', false);
mongoose.connect(url);

const phoneEntry = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model('Person', phoneEntry);

if (process.argv.length < 4) {
  Person.find({}).then((result) => {
    console.log('Phone Entries');
    result.forEach((person) => {
      console.log(`Name: ${person.name} Number: ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name,
    number,
  });

  person.save().then(() => {
    console.log(`Added ${name} number ${number} to your phonebook`);
    mongoose.connection.close();
  }).catch((error) => console.log(error));
}
