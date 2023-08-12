import {CLEAR_RESET_PASS_STATE, RESET_PASS, RESET_PASS_FAILED, RESET_PASS_SUCCESS} from "../actions/resetPass";


const initialState = {
  resetPassRequest: false,
  resetPassFailed: false,
  isMail: false
}
export const resetPassReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASS: {
      return {
        resetPassRequest: true,
        resetPassFailed: false,
      }
    }
    case RESET_PASS_SUCCESS: {
      return {
        ...state,
        resetPassRequest: false,
        isMail: action.isMail,
      }
    }
    case RESET_PASS_FAILED: {
      return {
        resetPassRequest: false,
        resetPassFailed: true,
      }
    }
    case CLEAR_RESET_PASS_STATE: {
      return {
        ...initialState
      }
    }
    default: {
      return state
    }
  }
}