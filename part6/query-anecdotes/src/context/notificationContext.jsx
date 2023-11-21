import { useReducer, createContext, useContext } from "react";

const notificationMessageReducer = (state, action) => {
  switch (action.type) {
    case 'DISPLAY': {
      state = action.payload
      return state
    }
    case 'RESET': {
      return ''
    }
    default: {
      return state
    }
  }
}


const NotificationMessageContext = createContext()

// eslint-disable-next-line react/prop-types
export const NotificationMessageContextProvider = ({children}) => {
  const [notificationMessage, notificationMessageDispatch ] = useReducer(notificationMessageReducer, '')

  return (
    <NotificationMessageContext.Provider value={[notificationMessage, notificationMessageDispatch]}>
      {children}
    </NotificationMessageContext.Provider>
  )
}

export default NotificationMessageContext
