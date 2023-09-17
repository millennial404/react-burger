import {CLEAR_ID_ORDER, GET_ID_ORDER, GET_ID_ORDER_FAILED, GET_ID_ORDER_SUCCESS} from "../actions/createdOrder";
import {TCreatedOrderActions} from '../actions/createdOrder';

type TCreatedOrderState = {
  orderRequest: boolean;
  orderFailed: boolean;
  orderId: number | null;
}

const initialState: TCreatedOrderState = {
  orderRequest: false,
  orderFailed: false,
  orderId: null

}

export const createdOrderReducer = (state = initialState, action: TCreatedOrderActions) => {
  switch (action.type) {
    case GET_ID_ORDER: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      }
    }
    case GET_ID_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderId: action.orderId
      }
    }
    case GET_ID_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      }
    }
    case CLEAR_ID_ORDER: {
      return {
        ...initialState
      }
    }
    default: {
      return state
    }
  }
}