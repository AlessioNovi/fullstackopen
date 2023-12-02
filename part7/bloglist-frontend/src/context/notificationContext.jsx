import { createContext, useMemo, useReducer } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'DISPLAY': {
      return action.payload;
    }
    case 'RESET': {
      return {
        isError: false,
        text: '',
      };
    }
    default: {
      return state;
    }
  }
};

const NotificationContext = createContext();

export function NotificationContextProvider({ children }) {
  const [notificationMessage, notificationMessageDispatch] = useReducer(notificationReducer, {
    isError: false,
    text: '',
  });
  return (
    <NotificationContext.Provider
      value={useMemo(() => [notificationMessage, notificationMessageDispatch], [notificationMessage])}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
