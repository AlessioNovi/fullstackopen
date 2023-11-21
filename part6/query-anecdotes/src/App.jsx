import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery ,useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from './services/anecdotes'
import { useContext } from 'react'
import CounterContext from './context/notificationContext'


const App = () => {
  const queryClient = useQueryClient()
  const [notificationMessage, notificationMessageDispatch] = useContext(CounterContext)

  const anecdoteQuery = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
  })

  const voteMutation = useMutation({
    mutationFn: anecdoteService.addVote,
    onSuccess: (data) => {
      // queryClient.invalidateQueries('anecdotes')
      const anecdotesArr = queryClient.getQueriesData({ queryKey: ['anecdotes']})[0][1].filter(a => a.id !== data.id)
      notificationMessageDispatch({ type: 'DISPLAY', payload: `${data.content} has been liked`})
      setTimeout(() => {
        notificationMessageDispatch({type: 'RESET'})
      }, 2000)
      queryClient.setQueryData(['anecdotes'], anecdotesArr.concat(data).sort((a, b) => b.votes - a.votes))
    } 
  })

  const handleVote = (id, votes) => {
    voteMutation.mutate({id, votes})
  }


  if (anecdoteQuery.error) {
    return (
      <p>Anecdote service not available due to problems in server</p>
    )
  }
  
  if (anecdoteQuery.isSuccess) {
    const anecdotes = anecdoteQuery.data.sort((a, b) => b.votes - a.votes)
    return (
      <div>
        <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id, anecdote.votes)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App
