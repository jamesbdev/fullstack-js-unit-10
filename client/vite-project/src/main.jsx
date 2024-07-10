import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './global.css';
import './reset.css';
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Courses from './components/Courses.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Courses />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>

  </React.StrictMode>,
)
