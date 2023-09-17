import {passwordReset} from "../../../utils/burger-api";

export const RESET_PASS_FAILED: 'RESET_PASS_FAILED' = 'RESET_PASS_FAILED';
export const RESET_PASS_SUCCESS: 'RESET_PASS_SUCCESS' = 'RESET_PASS_SUCCESS';
export const RESET_PASS: 'RESET_PASS' = 'RESET_PASS';
export const CLEAR_RESET_PASS_STATE: 'CLEAR_RESET_PASS_STATE' = 'CLEAR_RESET_PASS_STATE';

export type TResetPassFailed = {
  readonly type: typeof RESET_PASS_FAILED;
}
export type TResetPassSuccess= {
  readonly type: typeof RESET_PASS_SUCCESS;
  isMail: boolean;
}
export type TResetPass= {
  readonly type: typeof RESET_PASS;
}
export type TClearResetPassState = {
  readonly type: typeof CLEAR_RESET_PASS_STATE;
}

export type TResetPassAction =
  | TResetPassFailed
  | TResetPassSuccess
  | TResetPass
  | TClearResetPassState

export function resetPass(value: string) {
  return function (dispatch: (arg: TResetPassFailed | TResetPassSuccess | TResetPass) => void) {
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