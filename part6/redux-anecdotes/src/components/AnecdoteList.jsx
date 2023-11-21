import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react';
import { initializeAnectdotes } from '../reducers/anecdoteReducer';


const AnectodeList = () => {
  const dispatch = useDispatch()

    
  const anecdotes = useSelector(state => {
      if (state.filter === '') {
        return state.anecdotes
      } else if (state.filter !== '') {
        console.log(state)
        return state.anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(state.filter.toUpperCase()))
      }
    })

    const voteAnecdoteHandler = (id, displayMessage, votes) => {
      dispatch(voteAnecdote(id, votes))
      dispatch(setNotification(displayMessage, 2000))
    }

    useEffect(() => {
     dispatch(initializeAnectdotes())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    return (
        <>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdoteHandler(anecdote.id, `You liked ${anecdote.content}`, anecdote.votes)}>vote</button>
          </div>
        </div>
        )}
        </>
    )
}

export default AnectodeList