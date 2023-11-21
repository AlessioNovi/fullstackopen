import { createSlice } from '@reduxjs/toolkit'

let notificationTimeout;

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        displayNotification(state, action) {
            state = action.payload
            return state
        },
        resetNotification(state) {
            state = ''
            return state
        }
    }
})

export const setNotification = (title, timeout) => {
    return (dispatch) => {
        clearTimeout(notificationTimeout)
        dispatch(displayNotification(title))
        notificationTimeout = setTimeout(() => {
            dispatch(resetNotification())
        }, timeout)
    }
}

export default notificationSlice.reducer
export const { displayNotification, resetNotification } = notificationSlice.actions