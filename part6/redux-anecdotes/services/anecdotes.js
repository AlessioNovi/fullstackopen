import axios from 'axios'
const BASE_URL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const request = await axios.get(BASE_URL)
  return request.data
}

const createNew =  async (title) => {
  const dataObj = { content: title, votes: 0 }
  const request = await axios.post(BASE_URL, dataObj)
  return request.data
}

const addVote = async (id, votes) => {
  const dataObj = { votes: votes + 1}
  const request = await axios.patch(`${BASE_URL}/${id}`, dataObj)
  return request.data
}

export default {
  getAll,
  createNew,
  addVote
}