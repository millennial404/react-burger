import {SIGN_IN, SIGN_OUT} from "../actions/auth";


const initialState = {
  userData: null,
  isAuthenticated: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGN_IN:{
        return {
          ...state,
          userData: action.userData,
          isAuthenticated: true,
        }
      }
      case SIGN_OUT:{
        return {
          ...state,
          userData: action.userData,
          isAuthenticated: false,
        }
      }
      default: {
        return state
      }
    }
}