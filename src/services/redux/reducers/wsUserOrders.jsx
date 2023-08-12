import {
  USER_ORDERS_WS_CONNECTION_SUCCESS,
  USER_ORDERS_WS_CONNECTION_ERROR,
  USER_ORDERS_WS_CONNECTION_CLOSED,
  USER_ORDERS_WS_GET_MESSAGE,
} from "../actions/wsUserOrders";

const initialState = {
  wsConnected: false,
  orders: [],
  error: undefined,
};

export const wsUserOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ORDERS_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case USER_ORDERS_WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case USER_ORDERS_WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case USER_ORDERS_WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload,
      };

    default:
      return state;
  }
};
