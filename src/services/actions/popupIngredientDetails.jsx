export const OPEN_POPUP_INGREDIENT_DETAILS = 'OPEN_POPUP_INGREDIENT_DETAILS';
export const CLOSE_POPUP_INGREDIENT_DETAILS = 'CLOSE_POPUP_INGREDIENT_DETAILS';


export function openPopupIngredientDetails() {
  return {
    type: OPEN_POPUP_INGREDIENT_DETAILS
  }
}

export function closePopupIngredientDetails() {
  return {
    type: CLOSE_POPUP_INGREDIENT_DETAILS
  }
}