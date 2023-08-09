import { socketMiddleware } from "./middleware";
import { rootReducer } from "./reducers";
import {
  ALL_ORDERS_WS_CONNECTION_CLOSED,
  ALL_ORDERS_WS_CONNECTION_ERROR,
  ALL_ORDERS_WS_CONNECTION_START,
  ALL_ORDERS_WS_CONNECTION_SUCCESS,
  ALL_ORDERS_WS_GET_MESSAGE,
  ALL_ORDERS_WS_SEND_MESSAGE,
} from "./actions/wsAllOrders";
import {
  USER_ORDERS_WS_CONNECTION_CLOSED,
  USER_ORDERS_WS_CONNECTION_ERROR,
  USER_ORDERS_WS_CONNECTION_START,
  USER_ORDERS_WS_CONNECTION_SUCCESS,
  USER_ORDERS_WS_GET_MESSAGE,
  USER_ORDERS_WS_SEND_MESSAGE,
} from "./actions/wsUserOrders";
import { configureStore } from "@reduxjs/toolkit";

const allOrdersMiddleware = socketMiddleware({
  wsInit: ALL_ORDERS_WS_CONNECTION_START,
  wsSendMessage: ALL_ORDERS_WS_SEND_MESSAGE,
  onOpen: ALL_ORDERS_WS_CONNECTION_SUCCESS,
  onClose: ALL_ORDERS_WS_CONNECTION_CLOSED,
  onError: ALL_ORDERS_WS_CONNECTION_ERROR,
  onMessage: ALL_ORDERS_WS_GET_MESSAGE,
});

const userOrdersMiddleware = socketMiddleware({
  wsInit: USER_ORDERS_WS_CONNECTION_START,
  wsSendMessage: USER_ORDERS_WS_SEND_MESSAGE,
  onOpen: USER_ORDERS_WS_CONNECTION_SUCCESS,
  onClose: USER_ORDERS_WS_CONNECTION_CLOSED,
  onError: USER_ORDERS_WS_CONNECTION_ERROR,
  onMessage: USER_ORDERS_WS_GET_MESSAGE,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      allOrdersMiddleware,
      userOrdersMiddleware
    );
  },
});
