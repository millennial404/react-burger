import React from "react";
import {compose, createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {rootReducer} from './services/redux/reducers';
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import {BrowserRouter} from "react-router-dom";
import {initStore} from "./services/redux/store";

const store = initStore();

const root = ReactDOM.createRoot(
  document.querySelector("#root")
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);