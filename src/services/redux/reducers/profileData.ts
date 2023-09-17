import {
  PROFILE_DATA_FORM_SUBMIT,
  PROFILE_DATA_FORM_SUBMIT_FAILED, PROFILE_DATA_FORM_SUBMIT_SUCCESS,
  SET_PROFILE_DATA,
  SET_PROFILE_DATA_FORM_VALUE
} from "../actions/profileData";
import {TProfileDataAction} from '../actions/profileData';

type TProfileDataState = {
  profileEditRequest: boolean;
  profileEditFailed: boolean;
  form: {
    name: string;
    login: string;
    password: string;
  }
}

const initialState: TProfileDataState = {
  profileEditRequest: false,
  profileEditFailed: false,
  form: {
    name: '',
    login: '',
    password: '',
  }
}

export const profileDataReducer = (state = initialState, action: TProfileDataAction) => {
  switch (action.type) {
    case SET_PROFILE_DATA_FORM_VALUE: {
      return {
        ...state,
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
          ...state.form,
          name: action.name,
          login: action.login
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
          ...state.form,
          password: ''
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