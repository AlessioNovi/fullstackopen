const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3 },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: (v) => {
        const check = v.match(/^\d{2,3}-\d+/g);
        if (!check) return false;
        return v === check.join('');
      },
      message: 'Invalid phone Number',
    },
  },
});

personSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  // eslint-disable-next-line no-param-reassign, no-underscore-dangle
  transform(doc, ret) { delete ret._id; },
});

// eslint-disable-next-line new-cap
const Person = new mongoose.model('Person', personSchema);

module.exports = Person;
