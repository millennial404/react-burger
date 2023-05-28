import {placeAnOrder} from "../../utils/burger-api";
import {clearBurgerComponent} from "./constructorIngredients";
import {clearIngredientsCount} from "./ingredients";

export const GET_ID_ORDER = 'GET_ID_ORDER';
export const GET_ID_ORDER_FAILED = 'GET_ID_ORDER_FAILED';
export const GET_ID_ORDER_SUCCESS = 'GET_ID_ORDER_SUCCESS';
export const CLEAR_ID_ORDER = 'CLEAR_ID_ORDER';


export function getIdOrder(arrayComponentsId) {
  return function (dispatch) {
    dispatch({
      type: GET_ID_ORDER
    })
    placeAnOrder(arrayComponentsId)
      .then((res) => {
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

export function clearGetIdOrder() {
  return {
    type: CLEAR_ID_ORDER
  }
}