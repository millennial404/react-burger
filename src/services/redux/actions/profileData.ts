import {updateUserData} from "../../../utils/burger-api";


export const SET_PROFILE_DATA: 'SET_PROFILE_DATA' = "SET_PROFILE_DATA";
export const SET_PROFILE_DATA_FORM_VALUE: 'SET_PROFILE_DATA_FORM_VALUE' = "SET_PROFILE_DATA_FORM_VALUE";
export const PROFILE_DATA_FORM_SUBMIT: 'PROFILE_DATA_FORM_SUBMIT' = 'PROFILE_DATA_FORM_SUBMIT';
export const PROFILE_DATA_FORM_SUBMIT_FAILED: 'PROFILE_DATA_FORM_SUBMIT_FAILED' = 'PROFILE_DATA_FORM_SUBMIT_FAILED';
export const PROFILE_DATA_FORM_SUBMIT_SUCCESS: 'PROFILE_DATA_FORM_SUBMIT_SUCCESS' = 'PROFILE_DATA_FORM_SUBMIT_SUCCESS';


export type TSetProfileDataFormValue = {
  readonly type: typeof SET_PROFILE_DATA_FORM_VALUE;
   field: string;
   value: string;
}
export type TSetProfileData = {
  readonly type: typeof SET_PROFILE_DATA;
   login: string;
   name: string;

}
export type TSetProfileDataSubmit = {
  readonly type: typeof PROFILE_DATA_FORM_SUBMIT;

}
export type TSetProfileDataFailed = {
  readonly type: typeof PROFILE_DATA_FORM_SUBMIT_FAILED;

}
export type TSetProfileDataSuccess = {
  readonly type: typeof PROFILE_DATA_FORM_SUBMIT_SUCCESS;

}

export type TProfileDataAction =
  | TSetProfileDataFormValue
  | TSetProfileData
  | TSetProfileDataSubmit
  | TSetProfileDataFailed
  | TSetProfileDataSuccess

export const setProfileDataFormValue = (field: string, value: string): TSetProfileDataFormValue => ({
  type: SET_PROFILE_DATA_FORM_VALUE,
  field,
  value
})
export const setProfileData = (login: string, name: string): TSetProfileData => {
  return {
    type: SET_PROFILE_DATA,
    login: login,
    name: name,
  }
}

export const updateProfileData = () => (dispatch: (arg: TProfileDataAction) => void , getState: () => any) => {
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