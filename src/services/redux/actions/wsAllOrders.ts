export const ALL_ORDERS_WS_CONNECTION_START: 'ALL_ORDERS_WS_CONNECTION_START' = "ALL_ORDERS_WS_CONNECTION_START";
export const ALL_ORDERS_WS_CONNECTION_SUCCESS: 'ALL_ORDERS_WS_CONNECTION_SUCCESS' =
  "ALL_ORDERS_WS_CONNECTION_SUCCESS";
export const ALL_ORDERS_WS_CONNECTION_ERROR: 'ALL_ORDERS_WS_CONNECTION_ERROR' = "ALL_ORDERS_WS_CONNECTION_ERROR";
export const ALL_ORDERS_WS_CONNECTION_CLOSED: 'ALL_ORDERS_WS_CONNECTION_CLOSED' =
  "ALL_ORDERS_WS_CONNECTION_CLOSED";
export const ALL_ORDERS_WS_GET_MESSAGE: 'ALL_ORDERS_WS_GET_MESSAGE' = "ALL_ORDERS_WS_GET_MESSAGE";
export const ALL_ORDERS_WS_SEND_MESSAGE: 'ALL_ORDERS_WS_SEND_MESSAGE' = "ALL_ORDERS_WS_SEND_MESSAGE";
export const ALL_ORDERS_WS_CONNECTION_STOP: 'ALL_ORDERS_WS_CONNECTION_STOP' = "ALL_ORDERS_WS_CONNECTION_STOP"

export type TAllOrdersWsConnectionStart = {
  readonly type: typeof ALL_ORDERS_WS_CONNECTION_START;
  payload: string
}

export type TAllOrdersWsConnectionSuccess = {
  readonly type: typeof ALL_ORDERS_WS_CONNECTION_SUCCESS;
}

export type TAllOrdersWsConnectionError = {
  readonly type: typeof ALL_ORDERS_WS_CONNECTION_ERROR;
  payload: undefined | string;
}

export type TAllOrdersWsConnectionClose = {
  readonly type: typeof ALL_ORDERS_WS_CONNECTION_CLOSED;
}

export type TAllOrdersWsConnectionGetMessage = {
  readonly type: typeof ALL_ORDERS_WS_GET_MESSAGE;
  payload: any;
}

export type TAllOrdersWsConnectionSendMessage = {
  readonly type: typeof ALL_ORDERS_WS_SEND_MESSAGE;
}

export type TAllOrdersWsConnectionStop = {
  readonly type: typeof ALL_ORDERS_WS_CONNECTION_STOP;
}

export type TAllOrdersWsConnectionActions =
  | TAllOrdersWsConnectionStart
  | TAllOrdersWsConnectionSuccess
  | TAllOrdersWsConnectionError
  | TAllOrdersWsConnectionClose
  | TAllOrdersWsConnectionGetMessage
  | TAllOrdersWsConnectionSendMessage
  | TAllOrdersWsConnectionStop
export const wsConnectAllOrders = (url: string): TAllOrdersWsConnectionStart => {
  return {
    type: ALL_ORDERS_WS_CONNECTION_START,
    payload: url,
  };
};

export const wsDisconnectAllOrders = (): TAllOrdersWsConnectionStop => {
  return {
    type: ALL_ORDERS_WS_CONNECTION_STOP,
  };
};
