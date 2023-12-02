import '../../styles/Notification.css';
import { useContext } from 'react';
import NotificationContext from '../context/notificationContext';

function Notification() {
  const [notificationMessage] = useContext(NotificationContext);

  if (!notificationMessage.text) {
    return null;
  }

  // const notificationRef = useRef(null);

  // useEffect(() => {
  //   notificationRef.current.focus();
  // }, [notificationMessage]);

  return <div className={notificationMessage.isError ? 'error' : 'success'}>{notificationMessage.text}</div>;
}

export default Notification;
