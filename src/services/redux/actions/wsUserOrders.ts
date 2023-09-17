export const USER_ORDERS_WS_CONNECTION_START: 'USER_ORDERS_WS_CONNECTION_START' =
  "USER_ORDERS_WS_CONNECTION_START";
export const USER_ORDERS_WS_CONNECTION_SUCCESS: 'USER_ORDERS_WS_CONNECTION_SUCCESS' =
  "USER_ORDERS_WS_CONNECTION_SUCCESS";
export const USER_ORDERS_WS_CONNECTION_ERROR: 'USER_ORDERS_WS_CONNECTION_ERROR' =
  "USER_ORDERS_WS_CONNECTION_ERROR";
export const USER_ORDERS_WS_CONNECTION_CLOSED: 'USER_ORDERS_WS_CONNECTION_CLOSED' =
  "USER_ORDERS_WS_CONNECTION_CLOSED";
export const USER_ORDERS_WS_GET_MESSAGE: 'USER_ORDERS_WS_GET_MESSAGE' = "USER_ORDERS_WS_GET_MESSAGE";
export const USER_ORDERS_WS_SEND_MESSAGE: 'USER_ORDERS_WS_SEND_MESSAGE' = "USER_ORDERS_WS_SEND_MESSAGE";
export const USER_ORDERS_WS_CONNECTION_STOP: 'USER_ORDERS_WS_CONNECTION_STOP' = "USER_ORDERS_WS_CONNECTION_STOP"

export type TUserOrdersWsConnectionStart = {
  readonly type: typeof USER_ORDERS_WS_CONNECTION_START;
  payload: string
}

export type TUserOrdersWsConnectionSuccess = {
  readonly type: typeof USER_ORDERS_WS_CONNECTION_SUCCESS;
}

export type TUserOrdersWsConnectionError = {
  readonly type: typeof USER_ORDERS_WS_CONNECTION_ERROR;
  payload: undefined | string;
}

export type TUserOrdersWsConnectionClose = {
  readonly type: typeof USER_ORDERS_WS_CONNECTION_CLOSED;
}

export type TUserOrdersWsConnectionGetMessage = {
  readonly type: typeof USER_ORDERS_WS_GET_MESSAGE;
  payload: any;
}

export type TUserOrdersWsConnectionSendMessage = {
  readonly type: typeof USER_ORDERS_WS_SEND_MESSAGE;
}

export type TUserOrdersWsConnectionStop = {
  readonly type: typeof USER_ORDERS_WS_CONNECTION_STOP;
}

export type TUserOrdersWsConnectionActions =
  | TUserOrdersWsConnectionStart
  | TUserOrdersWsConnectionSuccess
  | TUserOrdersWsConnectionError
  | TUserOrdersWsConnectionClose
  | TUserOrdersWsConnectionGetMessage
  | TUserOrdersWsConnectionSendMessage
  | TUserOrdersWsConnectionStop
export const wsConnectUserOrders = (url: string): TUserOrdersWsConnectionStart => {
  return {
    type: USER_ORDERS_WS_CONNECTION_START,
    payload: url,
  };
};

export const wsDisconnectUserOrders = (): TUserOrdersWsConnectionStop => {
  return {
    type: USER_ORDERS_WS_CONNECTION_STOP,
  };
};