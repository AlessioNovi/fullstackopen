const Blog = require('../models/blog');
const User = require('../models/user');

const getBlogs = async (request, response) => {
  const blogs = await Blog.find({}).populate('user', '-blogs -password');
  response.json(blogs);
};

const createBlog = async (request, response) => {
  const {
    title, url,
  } = request.body;
  let { likes } = request.body;

  if (likes === undefined) likes = 0;

  if (!title || !url) {
    response.status(400);
    throw Error('Missing title or url params');
  }

  const userCreator = await User.findById(request.user.id);

  if (!userCreator) {
    response.status(404);
    throw Error('User id not found');
  }

  const newBlog = {
    title, author: userCreator.name, url, likes, user: userCreator.id,
  };

  const blog = new Blog(newBlog);
  const savedBlog = await blog.save();
  userCreator.blogs = userCreator.blogs.concat(savedBlog);
  await userCreator.save();
  response.status(201).json(savedBlog);
};

const deleteBlog = async (request, response) => {
  const { id } = request.params;
  const blog = await Blog.findById(id);

  if (!blog) {
    response.status(404);
    throw Error('resource for provided id was not found.');
  }

  if (request.user.id !== blog.user.toString()) {
    response.status(401);
    throw Error('invalid token. Unauthorized');
  }

  const user = await User.findById(request.user.id);
  await user.blogs.pull(blog);
  await user.save();
  await blog.remove();
  response.status(204).end();
};

const updateLikes = async (request, response) => {
  const { id } = request.params;
  const {
    likes, user, author, title, url,
  } = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(id, {
    user,
    author,
    title,
    url,
    likes: likes + 1,
  }, { new: true });
  response.json(updatedBlog);
};

module.exports = {
  getBlogs, createBlog, deleteBlog, updateLikes,
};
