import {getUserData, loginRequest} from "../../utils/burger-api";
import {setProfileData} from "./profileData";
import Cookies from 'js-cookie';

export const SIGN_IN_FORM_SET_VALUE = "SIGN_IN_FORM_SET_VALUE";
export const SIGN_IN_FORM_SUBMIT = "SIGN_IN_FORM_SUBMIT";
export const SIGN_IN_FORM_SUBMIT_FAILED = "SIGN_IN_FORM_SUBMIT_FAILED";
export const SIGN_IN_FORM_SUBMIT_SUCCESS = "SIGN_IN_FORM_SUBMIT_SUCCESS";
export const SIGN_OUT = "SIGN_OUT";
export const GET_LOGIN_STATUS = "GET_LOGIN_STATUS";
export const GET_LOGIN_STATUS_FAILED = "GET_LOGIN_STATUS_FAILED";
export const GET_LOGIN_STATUS_SUCCESS = "GET_LOGIN_STATUS_SUCCESS";

export const setLoginFormValue = (field, value) => ({
  type: SIGN_IN_FORM_SET_VALUE,
  field,
  value,
});

export const login = () => (dispatch, getState) => {
  dispatch({
    type: SIGN_IN_FORM_SUBMIT
  });
  loginRequest(getState().auth.form)
    .then((res) => {
      if (res) {
        dispatch({
          type: SIGN_IN_FORM_SUBMIT_SUCCESS,
          isAuthenticated: true
        });
        Cookies.set('accessToken', res.accessToken)
        Cookies.set('refreshToken', res.refreshToken)
        dispatch(setProfileData(res.user.email, res.user.name))
      } else {
        dispatch({
          type: SIGN_IN_FORM_SUBMIT_FAILED
        });
      }
    })
    .catch(() => {
      dispatch({
        type: SIGN_IN_FORM_SUBMIT_FAILED
      });
    });
};

export const getLoginData = () => (dispatch) => {
  dispatch({
    type: GET_LOGIN_STATUS
  });
  getUserData().then((res) => {
    if (res) {
      dispatch({
        type: GET_LOGIN_STATUS_SUCCESS,
        isAuthenticated: true
      });
      dispatch(setProfileData(res.user.email, res.user.name))
    } else {
      dispatch({
        type: GET_LOGIN_STATUS_FAILED
      });
    }
  })
    .catch(() => {
      dispatch({
        type: GET_LOGIN_STATUS_FAILED
      });
    });
}
export const logout = () => {
  return {
    type: SIGN_OUT
  };
};
