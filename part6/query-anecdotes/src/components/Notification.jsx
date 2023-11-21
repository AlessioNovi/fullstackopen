import { useContext } from 'react'
import CounterContext from '../context/notificationContext'

const Notification = () => {
  const [notificationMessage, notificationMessageDispatch] = useContext(CounterContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notificationMessage) return null

  return (
    <div style={style}>
      {notificationMessage}
    </div>
  )
}

export default Notification
