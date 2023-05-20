import {USER_REGISTER_FORM_SET_VALUE} from "./registerUser";

export const SET_PROFILE_DATA = "SET_PROFILE_DATA";
export const SET_PROFILE_DATA_FORM_VALUE = "SET_PROFILE_DATA_FORM_VALUE";
export const PROFILE_DATA_FORM_SUBMIT = 'PROFILE_DATA_FORM_SUBMIT';
export const PROFILE_DATA_FORM_SUBMIT_FAILED = 'PROFILE_DATA_FORM_SUBMIT_FAILED';
export const PROFILE_DATA_FORM_SUBMIT_SUCCESS = 'PROFILE_DATA_FORM_SUBMIT_SUCCESS';

export const setProfileDataFormValue = (field, value) => ({
  type: SET_PROFILE_DATA_FORM_VALUE,
  field,
  value
})
export const setProfileData = ( email, name ) => {
  return {
    type: SET_PROFILE_DATA,
    name: name,
    email: email
  }
}