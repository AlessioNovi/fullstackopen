const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const app = require('../app');
const { MONGODB_URI } = require('../utils/config');

const api = supertest(app);

beforeEach(async () => {
  await mongoose.connect(MONGODB_URI);
  await User.deleteMany({});
  const newUser = new User({ name: 'test', username: 'test', password: 'testtest' });
  await newUser.save();
});

describe('User creation and some validation tests', () => {
  test('it creates a new user and saves it in the DB if the right constrains are met', async () => {
    const newUser = { name: 'alessio', username: 'alessio', password: 'passowrd' };
    await api.post('/api/users')
      .send(newUser)
      .expect(201);

    const request = await api.get('/api/users');
    expect(request.body.length).toBe(2);
  });

  test('it responds with  a bad request if username or password are less than three charachters long', async () => {
    const invalidUsername = { name: 'test', password: 'testtst', user: 'a' };

    await api.post('/api/users')
      .send(invalidUsername)
      .expect(400);

    const invalidPassword = { name: 'test', password: 'a', user: 'testtest' };

    await api.post('/api/users')
      .send(invalidPassword)
      .expect(400);
  });

  test('it responds with a bad request if username is already taken', async () => {
    const alreadyTaken = { name: 'test', username: 'test', password: 'testtest' };

    const request = await api.post('/api/users').send(alreadyTaken);
    expect(request.statusCode).toBe(400);
    expect(request.body.message).toContain('unique');
  });
});
