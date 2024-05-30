import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GlobalStateProvider } from "./Main_components/OptionsProvider.jsx";
import { ApolloProvider } from "@apollo/client";
import "./index.css";
import client from "../ApolloClient.js";

// import { AuthProvider } from "./Main_components/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <GlobalStateProvider>
          <App />
        </GlobalStateProvider>
      </ApolloProvider>
    </React.StrictMode>
  </BrowserRouter>
);
