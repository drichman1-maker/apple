import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { ProductConditionProvider } from './contexts/ProductConditionContext.jsx'
import { AuthProvider } from './auth/AuthContext'
import ErrorBoundary from './ErrorBoundary.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <ProductConditionProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </ProductConditionProvider>
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
