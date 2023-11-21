import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationMessageContextProvider } from './context/notificationContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationMessageContextProvider>
    <QueryClientProvider client={queryClient} >
      <App />
    </QueryClientProvider>
  </NotificationMessageContextProvider>

)