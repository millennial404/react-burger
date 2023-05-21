import {
  GET_LOGIN_STATUS,
  GET_LOGIN_STATUS_FAILED, GET_LOGIN_STATUS_SUCCESS,
  SIGN_IN_FORM_SET_VALUE,
  SIGN_IN_FORM_SUBMIT,
  SIGN_IN_FORM_SUBMIT_FAILED,
  SIGN_IN_FORM_SUBMIT_SUCCESS,
  SIGN_OUT, SIGN_OUT_FAILED, SIGN_OUT_SUCCESS
} from "../actions/auth";


const initialState = {
  loginRequest: false,
  loginFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  loginStatusRequest: false,
  loginStatusFailed: false,
  isAuthenticated: false,
  form: {
    email: '',
    password: '',
  }
  
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_FORM_SET_VALUE: {
      return {
        form: {
          ...state.form,
          [action.field]: action.value
        }
      }
    }
    case SIGN_IN_FORM_SUBMIT: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      };
    }
    case SIGN_IN_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        form: {
          ...initialState.form
        },
        isAuthenticated: action.isAuthenticated,
        loginRequest: false
      };
    }
    case SIGN_IN_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        loginFailed: true,
        loginRequest: false
      };
    }
    case GET_LOGIN_STATUS: {
      return {
        ...state,
        loginStatusRequest: true,
        loginStatusFailed: false,
      };
    }
    case GET_LOGIN_STATUS_SUCCESS: {
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        loginStatusRequest: false
      };
    }
    case GET_LOGIN_STATUS_FAILED: {
      return {
        ...state,
        loginStatusFailed: true,
        loginStatusRequest: false
      };
    }
    case SIGN_OUT:{
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
      }
    }
    case SIGN_OUT_FAILED:{
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
      }
    }
    case SIGN_OUT_SUCCESS:{
      return {
        ...initialState
      }
    }
    default: {
      return state
    }
  }
}