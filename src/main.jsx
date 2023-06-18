import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./styles/global.scss";
import { BrowserRouter } from "react-router-dom";
import AuthenticationContextProvider from "./context/authentication.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthenticationContextProvider>
        <App />
      </AuthenticationContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
