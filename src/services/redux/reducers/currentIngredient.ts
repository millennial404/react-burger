import {GET_INGREDIENT_DETAILS, CLEAR_INGREDIENT_DETAILS} from '../actions/currentIngredient';
import {TCurrentIngredientActions} from '../actions/currentIngredient';

type TCurrentIngredientState = {
  name: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  image_large: string;
}

const initialState: TCurrentIngredientState = {
  name: '',
  calories: 0,
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  image_large: ''
}
export const ingredientDetailsReducer = (state = initialState, action: TCurrentIngredientActions) => {
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
        ...initialState
      }
    }
    default: {
      return state;
    }
  }
}