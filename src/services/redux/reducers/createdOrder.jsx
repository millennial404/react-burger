import {CLEAR_ID_ORDER, GET_ID_ORDER, GET_ID_ORDER_FAILED, GET_ID_ORDER_SUCCESS} from "../actions/createdOrder";


const initialState = {
  orderRequest: false,
  orderFailed: false,
  orderId: ''

}

export const createdOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ID_ORDER: {
      return {
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