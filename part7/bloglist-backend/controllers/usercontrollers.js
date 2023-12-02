const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getUsers = async (request, response) => {
  const users = await User.find({}, { password: 0 }).populate('blogs', '-likes -user');
  response.json(users);
};

const getUserById = async (request, response) => {
  const { userId } = request.params;
  const user = await User.findById(userId, { password: 0 }).populate({ path: 'blogs', select: 'title' });

  if (!user) {
    response.status(404);
    throw Error('User by id not found');
  }

  response.json(user);
};

const createUser = async (request, response) => {
  const { name, username, password } = request.body;

  if (!username || !password) {
    response.status(400);
    throw Error('Missing username or password');
  }

  if (username.length < 2 || password.length < 2) {
    response.status(400);
    throw Error('Username and password must be at least three characters long');
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = new User({ name, username, password: hashedPassword });

  const savedUser = await newUser.save();

  response.status(201).json(savedUser);
};

const login = async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });

  if (!user) {
    response.status(400);
    throw Error('Invalid credentials');
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    response.status(400);
    throw Error('Invalid credentials');
  }

  const userTokenDetails = { username: user.username, id: user.id };
  const token = jwt.sign(userTokenDetails, process.env.SECRET);

  response.json({ token, username: user.username, name: user.name });
};

module.exports = {
  createUser,
  getUsers,
  login,
  getUserById,
};
