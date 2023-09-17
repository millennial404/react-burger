import {placeAnOrder} from "../../../utils/burger-api";
import {clearBurgerComponent, TClearBurgerComponent} from "./constructorIngredients";
import {clearIngredientsCount, TClearIngredientCount} from "./ingredients";

export const GET_ID_ORDER: 'GET_ID_ORDER' = 'GET_ID_ORDER';
export const GET_ID_ORDER_FAILED: 'GET_ID_ORDER_FAILED' = 'GET_ID_ORDER_FAILED';
export const GET_ID_ORDER_SUCCESS: 'GET_ID_ORDER_SUCCESS' = 'GET_ID_ORDER_SUCCESS';
export const CLEAR_ID_ORDER: 'CLEAR_ID_ORDER' = 'CLEAR_ID_ORDER';

type TGetIdOrder = {
  readonly type: typeof GET_ID_ORDER;
}

type TGetIdOrderFailed = {
  readonly type: typeof GET_ID_ORDER_FAILED;
}

type TGetIdOrderSuccess = {
  readonly type: typeof GET_ID_ORDER_SUCCESS;
  orderId: number | null;
}

type TClearIdOrder = {
  readonly type: typeof CLEAR_ID_ORDER;
}

export type TCreatedOrderActions =
  | TGetIdOrder
  | TGetIdOrderFailed
  | TGetIdOrderSuccess
  | TClearIdOrder

export function getIdOrder(arrayComponentsId: string[]) {
  return function (dispatch: (arg: TCreatedOrderActions | TClearBurgerComponent | TClearIngredientCount) => void) {
    dispatch({
      type: GET_ID_ORDER
    })
    placeAnOrder(arrayComponentsId)
      .then((res:any) => {
          if (res) {
            dispatch({
              type: GET_ID_ORDER_SUCCESS,
              orderId: res.order.number
            })
          } else {
            dispatch({
              type: GET_ID_ORDER_FAILED
            })
          }
        }
      )
      .then(() => {
        dispatch(clearBurgerComponent());
        dispatch(clearIngredientsCount());
      })
      .catch(() => {
        dispatch({
          type: GET_ID_ORDER_FAILED
        })
      })
  }
}

export function clearGetIdOrder(): TClearIdOrder {
  return {
    type: CLEAR_ID_ORDER
  }
}