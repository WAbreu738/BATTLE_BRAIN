import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GlobalStateProvider } from "./Main_components/Options.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </React.StrictMode>
  </BrowserRouter>
);
