import {getUserData, loginRequest, logoutRequest} from "../../../utils/burger-api";
import {setProfileData, TSetProfileData} from "./profileData";
import Cookies from 'js-cookie';
import {RootState} from "../store";


export const SIGN_IN_FORM_SET_VALUE: 'SIGN_IN_FORM_SET_VALUE' = "SIGN_IN_FORM_SET_VALUE";
export const SIGN_IN_FORM_SUBMIT: 'SIGN_IN_FORM_SUBMIT' = "SIGN_IN_FORM_SUBMIT";
export const SIGN_IN_FORM_SUBMIT_FAILED: 'SIGN_IN_FORM_SUBMIT_FAILED' = "SIGN_IN_FORM_SUBMIT_FAILED";
export const SIGN_IN_FORM_SUBMIT_SUCCESS: 'SIGN_IN_FORM_SUBMIT_SUCCESS' = "SIGN_IN_FORM_SUBMIT_SUCCESS";
export const SIGN_OUT: 'SIGN_OUT' = "SIGN_OUT";
export const SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS' = "SIGN_OUT_SUCCESS";
export const SIGN_OUT_FAILED: 'SIGN_OUT_FAILED' = "SIGN_OUT_FAILED";
export const GET_LOGIN_STATUS: 'GET_LOGIN_STATUS' = "GET_LOGIN_STATUS";
export const GET_LOGIN_STATUS_FAILED: 'GET_LOGIN_STATUS_FAILED' = "GET_LOGIN_STATUS_FAILED";
export const GET_LOGIN_STATUS_SUCCESS: 'GET_LOGIN_STATUS_SUCCESS' = "GET_LOGIN_STATUS_SUCCESS";
export const SIGN_IN: 'SIGN_IN' = "SIGN_IN"

export type TSetLoginFormValueAction = {
  readonly type: typeof SIGN_IN_FORM_SET_VALUE;
  field: string;
  value: string;
}

export type TSignInFormSubmitAction = {
  readonly type: typeof SIGN_IN_FORM_SUBMIT;

}

export type TSignInFormSubmitFailedAction = {
  readonly type: typeof SIGN_IN_FORM_SUBMIT_FAILED;
}

export type TSignInFormSubmitSuccessAction = {
  readonly type: typeof SIGN_IN_FORM_SUBMIT_SUCCESS;
  isAuthenticated: boolean;
}

export type TSignOutAction = {
  readonly type: typeof SIGN_OUT;
}

export type TSignOutSuccessAction = {
  readonly type: typeof SIGN_OUT_SUCCESS;

}

export type TSignOutFailedAction = {
  readonly type: typeof SIGN_OUT_FAILED;

}

export type TGetLoginStatusAction = {
  readonly type: typeof GET_LOGIN_STATUS;

}

export type TGetLoginStatusFailedAction = {
  readonly type: typeof GET_LOGIN_STATUS_FAILED;

}

export type TGetLoginStatusSuccessAction = {
  readonly type: typeof GET_LOGIN_STATUS_SUCCESS;
  isAuthenticated: boolean;

}

export type TSignInAction = {
  readonly type: typeof SIGN_IN;
}

export type TAuthActions =
  | TSetLoginFormValueAction
  | TSignInFormSubmitAction
  | TSignInFormSubmitFailedAction
  | TSignInFormSubmitSuccessAction
  | TSignOutAction
  | TSignOutSuccessAction
  | TSignOutFailedAction
  | TGetLoginStatusAction
  | TGetLoginStatusFailedAction
  | TGetLoginStatusSuccessAction
  | TSignInAction;


export const setLoginFormValue = (field: string, value: string): TSetLoginFormValueAction => ({
  type: SIGN_IN_FORM_SET_VALUE,
  field,
  value,
});

export const onAuthenticated = (): TSignInAction => {
  return {
    type: SIGN_IN
  }
}
export const login = () => (dispatch: (arg: TSignInFormSubmitAction | TSignInFormSubmitSuccessAction | TSignInFormSubmitFailedAction| TSetProfileData) => void, getState: () => RootState) => {
  dispatch({
    type: SIGN_IN_FORM_SUBMIT
  });
  loginRequest(getState().auth.form)
    .then((res:any) => {
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

export const getLoginData = () => (dispatch: (arg: TGetLoginStatusAction | TGetLoginStatusSuccessAction | TGetLoginStatusFailedAction | TSetProfileData) => void) => {
  dispatch({
    type: GET_LOGIN_STATUS
  });
  getUserData().then((res: any) => {
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
      })
    });
}
export const logout = () => (dispatch: (arg: TSignOutAction | TSignOutSuccessAction | TSignOutFailedAction) => void ) => {
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