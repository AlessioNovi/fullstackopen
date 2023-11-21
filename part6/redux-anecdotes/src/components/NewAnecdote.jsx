import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    

    const createAnectode = (event) => {
        event.preventDefault()
        dispatch(createNewAnecdote(event.target[`anectdote-text`].value))
        dispatch(setNotification(`${event.target[`anectdote-text`].value} was added to the list!`, 2000))
        event.target['anectdote-text'].value = ''
    }

    return  (
        <div>
            <h2>Add Anectode</h2>
            <form onSubmit={createAnectode}>
                <label>
                    Text:
                    <input name="anectdote-text"/>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewAnecdote