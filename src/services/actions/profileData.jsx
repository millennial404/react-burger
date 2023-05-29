import {updateUserData} from "../../utils/burger-api";


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
export const setProfileData = (login, name) => {
  return {
    type: SET_PROFILE_DATA,
    name: name,
    login: login
  }
}

export const updateProfileData = () => (dispatch, getState) => {
  dispatch({
    type: PROFILE_DATA_FORM_SUBMIT
  });
  updateUserData(getState().profileData.form)
    .then((res) => {
      if (res) {
        dispatch({
          type: PROFILE_DATA_FORM_SUBMIT_SUCCESS
        });
        dispatch(setProfileData(res.user.email, res.user.name))
      } else {
        dispatch({
          type: PROFILE_DATA_FORM_SUBMIT_FAILED
        });
      }
    })
    .catch(() => {
      dispatch({
        type: PROFILE_DATA_FORM_SUBMIT_FAILED
      });
    });
};