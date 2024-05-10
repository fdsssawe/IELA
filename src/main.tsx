import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/reducer.js'
import { GoogleOAuthProvider } from "@react-oauth/google"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}> 
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </GoogleOAuthProvider>
  </Provider>
)
