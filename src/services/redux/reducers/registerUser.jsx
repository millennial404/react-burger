import {
  USER_REGISTER_FORM_SET_VALUE,
  USER_REGISTER_FORM_SUBMIT,
  USER_REGISTER_FORM_SUBMIT_FAILED,
  USER_REGISTER_FORM_SUBMIT_SUCCESS
} from "../actions/registerUser";


const initialState = {
  registrationRequest: false,
  registrationFailed: false,
  form: {
    name: '',
    email: '',
    password: '',
  }
}

export const userRegistrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_FORM_SET_VALUE: {
      return {
        form: {
          ...state.form,
          [action.field]: action.value
        }
      }
    }
    case USER_REGISTER_FORM_SUBMIT: {
      return {
        ...state,
        registrationRequest: true,
        registrationFailed: false,
      };
    }
    case USER_REGISTER_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        form: {
          ...initialState.form
        },
        registrationRequest: false
      };
    }
    case USER_REGISTER_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        registrationFailed: true,
        registrationRequest: false
      };
    }
    default: {
      return state
    }
  }
}