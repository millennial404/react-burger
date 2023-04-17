import {GET_INGREDIENT_DETAILS, CLEAR_INGREDIENT_DETAILS} from '../actions/currentIngredient';

const initialState = {
  name: '',
  calories: '',
  proteins: '',
  fat: '',
  carbohydrates: '',
  image: ''
}
export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENT_DETAILS: {
      return {
        ...state,
        name: action.name,
        calories: action.calories,
        proteins: action.proteins,
        fat: action.fat,
        carbohydrates: action.carbohydrates,
        image_large: action.image_large,
      }
    }
    case CLEAR_INGREDIENT_DETAILS: {
      return {
        ...state,
        name: '',
        calories: '',
        proteins: '',
        fat: '',
        carbohydrates: '',
        image_large: ''
      }
    }
    default: {
      return state
    }
  }
}