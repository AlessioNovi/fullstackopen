/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Link, Routes, Route, useMatch, useNavigate } from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to="/" style={padding}>Anecdotes</Link>
      <Link to="/create" style={padding}>Create new</Link>
      <Link to="/about" style={padding}>About</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}><li >{anecdote.content}</li></Link>)}
    </ul>
  </div>  
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const {fieldreset: contentReset, ...contentFields}  = useField({type: 'text', name: 'content'})
  const {fieldreset: authorReset , ...authorFields} = useField({type: 'text', name: 'author'})
  const {fieldreset: infoReset , ...infoFields} = useField({type: 'text', name: 'info'})


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: contentFields.value,
      author: authorFields.value,
      info: infoFields.value,
      votes: 0
    })
  }

  const handleReset = () => {
    contentReset()
    authorReset()
    infoReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentFields} />
        </div>  
        <div>
          author
          <input {...authorFields} />
        </div>
        <div>
          url for more info
          <input {...infoFields} />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

const Anecdote = (props) => {
  return (
    <div id={props.anecdote.id}>
      <h2>Author: {props.anecdote.author}</h2>
      <p>{props.anecdote.content}</p>
      <p>Info: {props.anecdote.info}</p>
      <p>Votes: {props.anecdote.votes}</p>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  let navigate = useNavigate();

  const anecdoteMatch = useMatch('/anecdotes/:id')

  const anecdoteById = (id) => anecdotes.find(a => a.id === id)

  const anecdote = anecdoteMatch ? anecdoteById(Number(anecdoteMatch.params.id)) : null

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote ${anecdote.content} has been created`)
    setTimeout(() => setNotification(''), 2000)
    navigate('/')
  }



  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu/>
      {notification && <p>{notification}</p>}
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes}/>}></Route>
        <Route path='/about' element={<About />}/>
        <Route path='/create' element={<CreateNew addNew={addNew} />} />
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote}/>}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
