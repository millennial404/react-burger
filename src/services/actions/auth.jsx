import { loginRequest } from "../../utils/burger-api";

export const SIGN_IN_FORM_SET_VALUE = "SIGN_IN_FORM_SET_VALUE";
export const SIGN_IN_FORM_SUBMIT = "SIGN_IN_FORM_SUBMIT";
export const SIGN_IN_FORM_SUBMIT_FAILED = "SIGN_IN_FORM_SUBMIT_FAILED";
export const SIGN_IN_FORM_SUBMIT_SUCCESS = "SIGN_IN_FORM_SUBMIT_SUCCESS";
export const SIGN_OUT = "SIGN_OUT";

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
          res
        });
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

export const logout = () => {
  return {
    type: SIGN_OUT,
    userData: null,
  };
};
