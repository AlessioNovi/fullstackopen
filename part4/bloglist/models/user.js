const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
});

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  // eslint-disable-next-line no-param-reassign, no-underscore-dangle
  transform(doc, ret) { delete ret._id; },
});

userSchema.plugin(mongooseUniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;
