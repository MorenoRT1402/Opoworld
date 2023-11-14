import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LoggedUserProvider } from '../context/LoggedUserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <LoggedUserProvider>
    <App />
  </LoggedUserProvider>,
)

