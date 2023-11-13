import axios from "axios";

const BASE_URL = '/api/persons';

// mix of async / await and then / catch syntax for practice
const getAll = async () => {
  const request = await axios.get(BASE_URL)
  return request.data
}

const createPhoneDetails = newDetails => {
  const request = axios.post(BASE_URL, newDetails)
  return request.then(response => response.data)
}

const deletePhoneDetails = id => {
  const request = axios.delete(`${BASE_URL}/${id}`)
  return request.then(response => response)
}

const updatePhoneDetails = (id, obj) => {
  const request = axios.put(`${BASE_URL}/${id}`, obj)
  return request.then(response => response.data)
}

export default { getAll, createPhoneDetails, deletePhoneDetails, updatePhoneDetails }