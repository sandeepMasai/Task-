import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { SavedPlacesProvider } from './context/SavedPlacesContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SavedPlacesProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </SavedPlacesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
