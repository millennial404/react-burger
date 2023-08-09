export const ALL_ORDERS_WS_CONNECTION_START = "ALL_ORDERS_WS_CONNECTION_START";
export const ALL_ORDERS_WS_CONNECTION_SUCCESS =
  "ALL_ORDERS_WS_CONNECTION_SUCCESS";
export const ALL_ORDERS_WS_CONNECTION_ERROR = "ALL_ORDERS_WS_CONNECTION_ERROR";
export const ALL_ORDERS_WS_CONNECTION_CLOSED =
  "ALL_ORDERS_WS_CONNECTION_CLOSED";
export const ALL_ORDERS_WS_GET_MESSAGE = "ALL_ORDERS_WS_GET_MESSAGE";
export const ALL_ORDERS_WS_SEND_MESSAGE = "ALL_ORDERS_WS_SEND_MESSAGE";

export const wsConnectionSuccess = () => {
  return {
    type: ALL_ORDERS_WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = () => {
  return {
    type: ALL_ORDERS_WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = () => {
  return {
    type: ALL_ORDERS_WS_CONNECTION_CLOSED,
  };
};

export const wsGetMessage = (message) => {
  return {
    type: ALL_ORDERS_WS_GET_MESSAGE,
    payload: message,
  };
};

export const wsSendMessage = (message) => {
  return {
    type: ALL_ORDERS_WS_SEND_MESSAGE,
    payload: message,
  };
};
