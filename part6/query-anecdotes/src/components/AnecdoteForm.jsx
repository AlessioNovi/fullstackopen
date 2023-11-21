import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdotesService from '../services/anecdotes'
import { useContext } from 'react'
import NotificationMessageContext from '../context/notificationContext'

const AnecdoteForm = () => {
  const [notificationMessage, notificationMessageDispatch] = useContext(NotificationMessageContext)
  const queryClient = useQueryClient()

  const anecdoteMutation = useMutation({
    mutationFn: anecdotesService.createNew,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldData) => oldData.concat(newAnecdote))
      notificationMessageDispatch({ type: 'DISPLAY', payload: `${newAnecdote.content} has been Created`})
      setTimeout(() => {
        notificationMessageDispatch({type: 'RESET'})
      }, 2000)
    },
    onError: () => {
      notificationMessageDispatch({ type: 'DISPLAY', payload: 'New blog post must be 5 characters long at least'})
      setTimeout(() => {
        notificationMessageDispatch({type: 'RESET'})
      }, 2000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    anecdoteMutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
