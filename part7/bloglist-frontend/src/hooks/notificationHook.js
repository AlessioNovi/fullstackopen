import { useContext } from 'react';
import NotificationContext from '../context/notificationContext';

let notificationId;

const useNotification = () => {
  const [, notificationMessageDispatch] = useContext(NotificationContext);

  const setNotificationMessage = (message, isError = false) => {
    clearTimeout(notificationId);
    notificationMessageDispatch({
      type: 'DISPLAY',
      payload: {
        isError,
        text: message,
      },
    });

    notificationId = setTimeout(() => {
      notificationMessageDispatch({ type: 'RESET' });
    }, 2000);
  };

  return { setNotificationMessage };
};

export default useNotification;
