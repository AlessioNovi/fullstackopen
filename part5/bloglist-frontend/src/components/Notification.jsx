import '../../styles/Notification.css';

function Notification({ message }) {
  return <div className={message.isError ? 'error' : 'success'}>{message.text}</div>;
}

export default Notification;
