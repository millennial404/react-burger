import {registerUser} from "../../../utils/burger-api";
import Cookies from "js-cookie";
import {
  setProfileData, TSetProfileData
} from "./profileData";
import {onAuthenticated, TSignInAction} from "./auth";
import {RootState} from "../store";

export const USER_REGISTER_FORM_SET_VALUE: 'USER_REGISTER_FORM_SET_VALUE' = 'USER_REGISTER_FORM_SET_VALUE';
export const USER_REGISTER_FORM_SUBMIT: 'USER_REGISTER_FORM_SUBMIT' = 'USER_REGISTER_FORM_SUBMIT';
export const USER_REGISTER_FORM_SUBMIT_FAILED: 'USER_REGISTER_FORM_SUBMIT_FAILED' = 'USER_REGISTER_FORM_SUBMIT_FAILED';
export const USER_REGISTER_FORM_SUBMIT_SUCCESS: 'USER_REGISTER_FORM_SUBMIT_SUCCESS' = 'USER_REGISTER_FORM_SUBMIT_SUCCESS';

export type TUserRegisterSetFormValue = {
  readonly type: typeof USER_REGISTER_FORM_SET_VALUE;
  readonly field: string;
  readonly value: string;
}
export type TUserRegisterSubmit = {
  readonly type: typeof USER_REGISTER_FORM_SUBMIT;
}
export type TUserRegisterFailed = {
  readonly type: typeof USER_REGISTER_FORM_SUBMIT_FAILED;
}
export type TUserRegisterSuccess = {
  readonly type: typeof USER_REGISTER_FORM_SUBMIT_SUCCESS;
}

export type TRegisterUserAction =
  | TUserRegisterSetFormValue
  | TUserRegisterSubmit
  | TUserRegisterFailed
  | TUserRegisterSuccess

export const setUserFormValue = (field: string, value: string): TUserRegisterSetFormValue => ({
  type: USER_REGISTER_FORM_SET_VALUE,
  field,
  value
})

export const register = () => (dispatch: (arg: TUserRegisterSubmit | TUserRegisterSuccess | TUserRegisterFailed | TSignInAction | TSetProfileData) => void, getState: () => RootState) => {
  dispatch({
    type: USER_REGISTER_FORM_SUBMIT
  });
  registerUser(getState().registration.form)
    .then((res: any) => {
      if (res) {
        dispatch({
          type: USER_REGISTER_FORM_SUBMIT_SUCCESS,
        })
        Cookies.set('accessToken', res.accessToken)
        Cookies.set('refreshToken', res.refreshToken)
        dispatch(setProfileData(res.user.email, res.user.name))
        dispatch(onAuthenticated())
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
