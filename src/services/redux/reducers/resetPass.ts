import {CLEAR_RESET_PASS_STATE, RESET_PASS, RESET_PASS_FAILED, RESET_PASS_SUCCESS} from "../actions/resetPass";
import {TResetPassAction} from '../actions/resetPass'

type TRegisterUserState = {
  resetPassRequest: boolean;
  resetPassFailed: boolean;
  isMail: boolean;
}

const initialState: TRegisterUserState = {
  resetPassRequest: false,
  resetPassFailed: false,
  isMail: false
}
export const resetPassReducer = (state = initialState, action: TResetPassAction) => {
  switch (action.type) {
    case RESET_PASS: {
      return {
        ...state,
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
        ...state,
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