import {placeAnOrder} from "../../utils/burger-api";

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
          if (res && res.success) {
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