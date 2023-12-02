import { createContext, useMemo, useReducer } from 'react';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return { user: action.payload.userDetails, isLoggedIn: true };
    }
    case 'LOGOUT': {
      return {
        user: { name: '', token: '', username: '' },
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
};

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, userDispatch] = useReducer(userReducer, {
    user: { name: '', token: '', username: '' },
    isLoggedIn: false,
  });

  return <UserContext.Provider value={useMemo(() => [user, userDispatch], [user])}>{children}</UserContext.Provider>;
}
export default UserContext;
