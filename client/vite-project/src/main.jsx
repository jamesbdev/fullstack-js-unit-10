import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./reset.css";
import "./global.css";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";
import ThemeProvider from "./context/ThemeContext";

const theme = {
  //define theme properties
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <BrowserRouter>
    <UserContext>
  <App />
  </UserContext>
</BrowserRouter>

 
  </React.StrictMode>
);
