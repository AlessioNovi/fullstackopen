import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext';
import blogService from '../services/blogs.js';
import loginService from '../services/login';
import useNotification from './notificationHook';

const useUser = () => {
  const [, userDispatch] = useContext(UserContext);
  const { setNotificationMessage } = useNotification();
  const navigate = useNavigate();

  const login = async (credentialsObj) => {
    try {
      const loggedUser = await loginService.login(credentialsObj);
      blogService.setToken(loggedUser.token);
      userDispatch({ type: 'LOGIN', payload: { userDetails: loggedUser, isLoggedIn: true } });
      setNotificationMessage('User logged in');
      window.localStorage.setItem('loggedUserDetails', JSON.stringify(loggedUser));
      navigate('/');
    } catch (error) {
      setNotificationMessage(error.response.data.message, true);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('loggedUserDetails');
    userDispatch({ type: 'LOGOUT' });
    blogService.setToken();
  };

  const checkIfTokenExists = () => {
    const userDetails = window.localStorage.getItem('loggedUserDetails');
    if (userDetails) {
      const parsedUserDetails = JSON.parse(userDetails);
      userDispatch({ type: 'LOGIN', payload: { userDetails: parsedUserDetails, isLoggedIn: true } });
      blogService.setToken(parsedUserDetails.token);
      navigate('/');
    }
  };

  return {
    login,
    logout,
    checkIfTokenExists,
  };
};

export default useUser;
