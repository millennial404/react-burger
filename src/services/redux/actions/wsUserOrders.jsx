export const USER_ORDERS_WS_CONNECTION_START =
  "USER_ORDERS_WS_CONNECTION_START";
export const USER_ORDERS_WS_CONNECTION_SUCCESS =
  "USER_ORDERS_WS_CONNECTION_SUCCESS";
export const USER_ORDERS_WS_CONNECTION_ERROR =
  "USER_ORDERS_WS_CONNECTION_ERROR";
export const USER_ORDERS_WS_CONNECTION_CLOSED =
  "USER_ORDERS_WS_CONNECTION_CLOSED";
export const USER_ORDERS_WS_GET_MESSAGE = "USER_ORDERS_WS_GET_MESSAGE";
export const USER_ORDERS_WS_SEND_MESSAGE = "USER_ORDERS_WS_SEND_MESSAGE";

export const wsConnectionSuccess = () => {
  return {
    type: USER_ORDERS_WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = () => {
  return {
    type: USER_ORDERS_WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = () => {
  return {
    type: USER_ORDERS_WS_CONNECTION_CLOSED,
  };
};

export const wsGetMessage = (message) => {
  return {
    type: USER_ORDERS_WS_GET_MESSAGE,
    payload: message,
  };
};

export const wsSendMessage = (message) => {
  return {
    type: USER_ORDERS_WS_SEND_MESSAGE,
    payload: message,
  };
};
