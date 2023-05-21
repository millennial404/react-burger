import {getUserData, loginRequest, logoutRequest, refreshToken} from "../../utils/burger-api";
import {setProfileData} from "./profileData";
import Cookies from 'js-cookie';

export const SIGN_IN_FORM_SET_VALUE = "SIGN_IN_FORM_SET_VALUE";
export const SIGN_IN_FORM_SUBMIT = "SIGN_IN_FORM_SUBMIT";
export const SIGN_IN_FORM_SUBMIT_FAILED = "SIGN_IN_FORM_SUBMIT_FAILED";
export const SIGN_IN_FORM_SUBMIT_SUCCESS = "SIGN_IN_FORM_SUBMIT_SUCCESS";
export const SIGN_OUT = "SIGN_OUT";
export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const SIGN_OUT_FAILED = "SIGN_OUT_FAILED";
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
    .catch((err) => {
      if (err === 403) {
        refreshToken()
          .then((data) => {
            Cookies.set('accessToken', data.accessToken)
            Cookies.set('refreshToken', data.refreshToken)
            dispatch({
              type: GET_LOGIN_STATUS_SUCCESS,
            });
          })
      } else {
        dispatch({
          type: GET_LOGIN_STATUS_FAILED
        })
      }
    });
}
export const logout = () => (dispatch) => {
  dispatch({
    type: SIGN_OUT
  });
  logoutRequest()
    .then((res) => {
        if (res) {
          dispatch({
            type: SIGN_OUT_SUCCESS
          })
          Cookies.set('accessToken', "")
          Cookies.set('refreshToken', "")
        } else {
          dispatch({
            type: SIGN_OUT_FAILED
          });
        }
      }
    )
    .catch(() => {
      dispatch({
        type: SIGN_OUT_FAILED
      });
    });
};
