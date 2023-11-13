const express = require('express')
const app = express()

app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

const generateId = () => {
  const id = notes.length === 0 ? 0 : Math.max(...notes.map(note => note.id ))
  return id + 1
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.post('/api/notes', (request, response) => {
  const data = request.body

  if (!data.content) {
    return response.status(400).json({ error: 'Content missing' })
  }

  const newNote = {
    content: data.content,
    important: data.important || false,
    id: generateId()
  }

  notes = notes.concat(newNote)
  response.json(newNote)
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if (!note) {
    response.statusMessage = 'Note Id is not found in the list'
    response.status(404).end()
  } else {
    response.json(note)
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})