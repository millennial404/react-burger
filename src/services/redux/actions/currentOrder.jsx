export const ADD_CURRENT_ORDER = 'ADD_CURRENT_ORDER';
export const CLEAR_CURRENT_ORDER = 'CLEAR_CURRENT_ORDER';


export function addCurrentOrder(currentOrder) {
  return {
    type: ADD_CURRENT_ORDER,
    payload: currentOrder
  }
}

export function clearCurrentOrders() {
  return {
    type: CLEAR_CURRENT_ORDER
  }
}