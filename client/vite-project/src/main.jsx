import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './reset.css';
import './global.css';
import { BrowserRouter } from "react-router-dom";
import { userProvider } from './context/UserContext.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <App />
        </UserProvider>
      
      </ThemeProvider>
     
    </BrowserRouter>
  </React.StrictMode>,
)
