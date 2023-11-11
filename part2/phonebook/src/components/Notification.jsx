/* eslint-disable react/prop-types */
import '../styles/Notification.css'

const Notification = ({ message }) => {
  return (
    <div className={message.isError ? 'error' : 'success'}>
      {message.text}
    </div>
  ) 
}

export default Notification