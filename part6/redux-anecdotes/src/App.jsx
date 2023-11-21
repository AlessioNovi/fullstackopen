import NewAnecdote from './components/NewAnecdote'
import AnectodeList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
const App = () => {


  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnectodeList />
      <NewAnecdote />
    </div>
  )
}

export default App