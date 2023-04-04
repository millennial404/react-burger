import React from "react";
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {rootReducer} from './services/reducers';
import ReactDOM from "react-dom/client";
import App from "./components/App/App";

const store = createStore(rootReducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(
  document.querySelector("#root")
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
