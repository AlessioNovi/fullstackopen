const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const { MONGODB_URI } = require('../utils/config');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
];

let token;

beforeEach(async () => {
  await mongoose.connect(MONGODB_URI);
  await Blog.deleteMany({});
  await User.deleteMany({});
  await api.post('/api/users').send({ name: 'test', username: 'test', password: 'test' });
  const loginRequest = await api.post('/api/users/login').send({ username: 'test', password: 'test' });
  token = loginRequest.body.token;
  const blogsObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogsObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('testing blog CRUD operation and some validation', () => {
  test('it retrieves all the current blogs in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('it retrieves the correct number of notes from the request', async () => {
    const request = await api.get('/api/blogs');
    expect(request.body.length).toBe(2);
  });

  test('it checks that a single blog has an id property defined', async () => {
    const request = await api.get('/api/blogs');
    const { id } = request.body[0];
    expect(id).toBeDefined();
  });

  test('it creates a new blog and it is added to the database', async () => {
    const usersRequest = await api.get('/api/users');
    const { id } = usersRequest.body[0];
    const newBlog = {
      title: 'new test blog',
      url: 'https://test.com/',
      likes: 1,
      user: id,
    };

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const request = await api.get('/api/blogs');
    expect(request.body.length).toBe(initialBlogs.length + 1);
  });

  test('it creates a new blog with 0 likes if param is not provided', async () => {
    const usersRequest = await api.get('/api/users');
    const { id } = usersRequest.body[0];

    const newBlog = {
      title: 'new test blog',
      url: 'https://test.com/',
      user: id,
    };

    const request = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog);
    const { likes } = request.body;

    expect(likes).toBe(0);
  });

  test('it send a 400 response when author or url params are missing', async () => {
    const newBlog = {
      author: 'test author',
      url: 'https://test.com/',
    };

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });

  test('it correctly deletes a blog', async () => {
    const usersRequest = await api.get('/api/users');
    const { id } = usersRequest.body[0];
    const newBlog = {
      title: 'new test blog',
      url: 'https://test.com/',
      likes: 1,
      user: id,
    };

    const newBlogRequest = await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog);

    await api.delete(`/api/blogs/${newBlogRequest.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);
  });

  test('it correclty update the number of likes', async () => {
    const request = await api.get('/api/blogs');
    const blog = request.body[0];
    const { id, likes: initialLikes } = blog;
    const updateRequest = await api.put(`/api/blogs/${id}`).set('Authorization', `Bearer ${token}`).send({ likes: 3 });
    const updatedBlog = updateRequest.body;
    expect(updatedBlog.likes).not.toBe(initialLikes);
    expect(updatedBlog.likes).toBe(3);
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
