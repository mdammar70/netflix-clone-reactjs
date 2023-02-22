import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./app/store.jsx";
import "../index.css";
import ToggleColorModeProvider from "./utils/ToggleColorMode";
ReactDOM.render(
  <Provider store={store}>
    <ToggleColorModeProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ToggleColorModeProvider>
  </Provider>,
  document.getElementById("root")
);
