const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: Number,
  comments: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

blogSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  // eslint-disable-next-line no-param-reassign, no-underscore-dangle
  transform(doc, ret) { delete ret._id; },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;