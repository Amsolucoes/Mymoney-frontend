import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
// import registerServiceWorker from "./registerServiceWorker";

import promise from "redux-promise";
import multi from "redux-multi";
import thunk from "redux-thunk";

import AuthOrApp from "./main/authOrApp";
import Reducers from "./main/reducers";
import axios from "axios"; // Importa o Axios

const token = localStorage.getItem("token");
console.log("Token salvo no localStorage:", token);

// Configura o interceptor do Axios
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("🔹 Token sendo enviado na requisição:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
const devTools =
  window.__REDUX_DEVTOOLS__EXTENSION__ &&
  window.__REDUX_DEVTOOLS__EXTENSION__();
const store = applyMiddleware(multi, thunk, promise)(createStore)(
  Reducers,
  devTools
);
ReactDOM.render(
  <Provider store={store}>
    <AuthOrApp />
  </Provider>,
  document.getElementById("app")
);

// registerServiceWorker()
