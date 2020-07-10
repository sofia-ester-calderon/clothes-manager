import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import optionsReducer from "./store/reducers/optionsReducer";

const rootReducer = combineReducers({ options: optionsReducer });

const composeEnhanders = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(rootReducer, applyMiddleware(thunk));
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
