import {
  PROFILE_DATA_FORM_SUBMIT,
  PROFILE_DATA_FORM_SUBMIT_FAILED, PROFILE_DATA_FORM_SUBMIT_SUCCESS,
  SET_PROFILE_DATA,
  SET_PROFILE_DATA_FORM_VALUE
} from "../actions/profileData";

const initialState = {
  profileEditRequest: false,
  profileEditFailed: false,
  form: {
    name: '',
    email: '',
    password: '',
  }
}

export const profileDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_DATA_FORM_VALUE: {
      return {
        form: {
          ...state.form,
          [action.field]: action.value
        }
      }
    }
    case SET_PROFILE_DATA: {
      return {
        ...state,
        form: {
          name: action.name,
          email: action.email
        },
      }
    }
    case PROFILE_DATA_FORM_SUBMIT: {
      return {
        ...state,
        registrationRequest: true,
        registrationFailed: false,
      };
    }
    case PROFILE_DATA_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        form: {
          ...initialState.form
        },
        registrationRequest: false
      };
    }
    case PROFILE_DATA_FORM_SUBMIT_FAILED: {
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