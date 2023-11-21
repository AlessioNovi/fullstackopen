import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../../services/anecdotes';


// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// export const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote(state, action) {
      const newState = state.map(anecdote => {
        if (anecdote.id !== action.payload) {
          return { ...anecdote }
        } else if (anecdote.id === action.payload) {
          return { ...anecdote, votes: anecdote.votes + 1 }
        }
      })
      return newState.sort((a, b) => b.votes - a.votes)
    },
    add(state, action) {
      return [...state, action.payload]
    },
    set(state, action) {
      state = action.payload
      return state.sort((a, b) => b.votes - a.votes)
    },
  }
})

export default anecdoteSlice.reducer
export const { vote, add, set } = anecdoteSlice.actions

export const initializeAnectdotes = () => {
  return async (dispatch) => {
    const data = await anecdotesService.getAll();
    dispatch(set(data))
  }
}

export const createNewAnecdote = (title) => {
  return async (dispatch) => {
    const data = await anecdotesService.createNew(title)
    dispatch(add(data))
  }
}

export const voteAnecdote = (id, votes) => {
  return async (dispatch) => {
    await anecdotesService.addVote(id, votes)
    dispatch(vote(id))
  }
}

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'VOTE': {
//       const newState = state.map(anecdote => {
//         if (anecdote.id !== action.payload.id) {
//           return { ...anecdote }
//         } else if (anecdote.id === action.payload.id) {
//           return { ...anecdote, votes: anecdote.votes + 1 }
//         }
//       })
//       return newState.sort((a, b) => b.votes - a.votes)
//     }
//     case 'ADD': {
//       return [...state, action.payload.newAnecdote]
//     }
//     default:
//       return state;
//   }
// }

// export const vote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id },
//   }
// }

// export const addAnecdote = (newAnecdote) => {
//   return {
//     type: 'ADD',
//     payload: { newAnecdote },
//   }
// }

