import {
  ALL_ORDERS_WS_CONNECTION_SUCCESS,
  ALL_ORDERS_WS_CONNECTION_ERROR,
  ALL_ORDERS_WS_CONNECTION_CLOSED,
  ALL_ORDERS_WS_GET_MESSAGE,
} from "../actions/wsAllOrders";
import {TAllOrdersWsConnectionActions} from '../actions/wsAllOrders';
import {TOrder} from "../../../utils/types";

type TAllOrdersWsConnectionState = {
  wsConnected: boolean,
  orders: { total: number, totalToday: number, orders: TOrder[] },
  error: string | undefined,
}

const initialState: TAllOrdersWsConnectionState = {
  wsConnected: false,
  orders: { total: 0, totalToday: 0, orders: [] },
  error: undefined,
};

export const wsAllOrdersReducer = (state = initialState, action: TAllOrdersWsConnectionActions) => {
  switch (action.type) {
    case ALL_ORDERS_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case ALL_ORDERS_WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case ALL_ORDERS_WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case ALL_ORDERS_WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload,
      };

    default:
      return state;
  }
};
