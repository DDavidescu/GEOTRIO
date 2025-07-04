import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserProvider } from './context/UserContext'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <App />
      </UserProvider>  
    </BrowserRouter>
  </React.StrictMode>
)
