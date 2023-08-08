import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import { socketMiddleware } from './middleware';
import {rootReducer} from "./reducers";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS, WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from "./actions/ws";
import {configureStore} from "@reduxjs/toolkit";

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;
//
// const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions)));
//
// export const initStore = () =>
//   createStore(rootReducer, enhancer);

export const store = configureStore({
  reducer: rootReducer,

})