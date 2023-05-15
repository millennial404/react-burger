import {registerUser} from "../../utils/burger-api";

export const USER_REGISTER_FORM_SET_VALUE = 'USER_REGISTER_FORM_SET_VALUE';
export const USER_REGISTER_FORM_SUBMIT = 'USER_REGISTER_FORM_SUBMIT';
export const USER_REGISTER_FORM_SUBMIT_FAILED = 'USER_REGISTER_FORM_SUBMIT_FAILED';
export const USER_REGISTER_FORM_SUBMIT_SUCCESS = 'USER_REGISTER_FORM_SUBMIT_SUCCESS';

export const setUserFormValue = (field, value) => ({
  type: USER_REGISTER_FORM_SET_VALUE,
  field,
  value
})

export const register = () => (dispatch, getState) => {
  dispatch({
    type: USER_REGISTER_FORM_SUBMIT
  });
  registerUser(getState().registration.form)
    .then(res => {
      if (res) {
        dispatch({
          type: USER_REGISTER_FORM_SUBMIT_SUCCESS,
          res
        })
      } else {
        dispatch({
          type: USER_REGISTER_FORM_SUBMIT_FAILED
        })
      }
    }).catch(() => {
    dispatch({
      type: USER_REGISTER_FORM_SUBMIT_FAILED
    })
  })
}
