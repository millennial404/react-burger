import {ADD_CURRENT_ORDER, CLEAR_CURRENT_ORDER} from '../actions/currentOrder'


const initialState = {
  currentOrder: null
}

export const currentOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CURRENT_ORDER: {
      return {
        ...state,
        currentOrder: action.payload
      }
    }
    case CLEAR_CURRENT_ORDER: {
      return {
        ...state,
        currentOrder: initialState.currentOrder
      }
    }
    default: {
      return state
    }
  }
}