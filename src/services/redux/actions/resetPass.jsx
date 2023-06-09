import {passwordReset} from "../../../utils/burger-api";

export const RESET_PASS_FAILED = 'GET_ID_ORDER_FAILED';
export const RESET_PASS_SUCCESS = 'RESET_PASS_SUCCESS';
export const RESET_PASS = 'RESET_PASS';
export const CLEAR_RESET_PASS_STATE = 'CLEAR_RESET_PASS_STATE';

export function resetPass(value) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASS
    })
    passwordReset(value)
      .then((res) => {
          if (res) {
            dispatch({
              type: RESET_PASS_SUCCESS,
              isMail: true
            })
          } else {
            dispatch({
              type: RESET_PASS_FAILED
            })
          }
        }
      )
      .catch(() => {
        dispatch({
          type: RESET_PASS_FAILED
        })
      })
  }
}