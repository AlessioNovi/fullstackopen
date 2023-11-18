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

const createBlog = async (blog) => {
  const config = { headers: { Authorization: token } };
  const request = await axios.post(baseUrl, blog, config);
  return request.data;
};

const updateBlogLikes = async (blog, id) => {
  const config = { headers: { Authorization: token } };
  const request = await axios.put(`${baseUrl}/${id}`, blog, config);
  return request.data;
};

const deleteBlog = async (id) => {
  const config = { headers: { Authorization: token } };
  await axios.delete(`${baseUrl}/${id}`, config);
};
export default {
  getAll,
  createBlog,
  setToken,
  updateBlogLikes,
  deleteBlog,
};
