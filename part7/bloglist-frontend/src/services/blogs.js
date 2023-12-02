import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/blogs';

let token;

const setToken = (tokenArg) => {
  token = `Bearer ${tokenArg}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const getById = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`);
  return request.data;
};

const createBlog = async (blog) => {
  const config = { headers: { Authorization: token } };
  const request = await axios.post(baseUrl, blog, config);
  return request.data;
};

const updateBlogLikes = async ({ blogObj, id }) => {
  const config = { headers: { Authorization: token } };
  const request = await axios.put(`${baseUrl}/${id}`, blogObj, config);
  return request.data;
};

const deleteBlog = async (id) => {
  const config = { headers: { Authorization: token } };
  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request.data;
};

const addComment = async ({ comment, id }) => {
  const config = { headers: { Authorization: token } };
  const request = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config);
  return request.data;
};

export default {
  getAll,
  createBlog,
  setToken,
  updateBlogLikes,
  deleteBlog,
  getById,
  addComment,
};
