import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/users';

const login = async (credentialsObj) => {
  const request = await axios.post(`${baseUrl}/login`, credentialsObj);
  return request.data;
};

export default { login };
