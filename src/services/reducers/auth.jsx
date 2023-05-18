import {
  SIGN_IN_FORM_SET_VALUE,
  SIGN_IN_FORM_SUBMIT,
  SIGN_IN_FORM_SUBMIT_FAILED,
  SIGN_IN_FORM_SUBMIT_SUCCESS,
  SIGN_OUT
} from "../actions/auth";


const initialState = {
  loginRequest: false,
  loginFailed: false,
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