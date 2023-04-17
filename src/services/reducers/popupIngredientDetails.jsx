import {CLOSE_POPUP_INGREDIENT_DETAILS, OPEN_POPUP_INGREDIENT_DETAILS} from "../actions/popupIngredientDetails";

const initialState = {
  status: false,
}

export const popupIngredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_POPUP_INGREDIENT_DETAILS: {
      return {
        status: true,
      }
    }
    case CLOSE_POPUP_INGREDIENT_DETAILS: {
      return {
        status: initialState.status,
      }
    }
    default: {
      return state
    }
  }
}