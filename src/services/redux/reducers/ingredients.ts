import {
  CLEAR_INGREDIENT_COUNT,
  DECREMENT_INGREDIENT_COUNT,
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  INCREMENT_INGREDIENT_COUNT
} from '../actions/ingredients';
import {TIngredientsAction} from '../actions/ingredients';
import {productsPropTypes} from '../../../utils/types';


type TIngredientsState = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  ingredients: productsPropTypes[];
}
const initialState: TIngredientsState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: []
}

export const ingredientsReducer = (state = initialState, action: TIngredientsAction) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false
      };
    }
    case INCREMENT_INGREDIENT_COUNT: {
      return {
        ...state,

        ingredients: [...state.ingredients].map(ingredient => {
          if (action.addedIngredient.type === "bun" && ingredient.type === "bun" && ingredient._id !== action.addedIngredient._id) {
            return {...ingredient, count: 0}
          } else if (action.addedIngredient.type === "bun" && ingredient.type === "bun" && ingredient._id === action.addedIngredient._id) {
            return {...ingredient, count: 2}
          } else if (ingredient._id === action.addedIngredient._id) {
            return {...ingredient, count: ingredient.count + 1}
          } else {
            return ingredient
          }
        })
      };
    }
    case DECREMENT_INGREDIENT_COUNT: {
      return {
        ...state,
        ingredients: [...state.ingredients].map(ingredient => {
          if (ingredient._id === action.removedIngredient._id) {
            return {...ingredient, count: ingredient.count - 1}
          } else {
            return ingredient
          }
        })
      };
    }
    case CLEAR_INGREDIENT_COUNT: {
      return {
        ...state,
        ingredients: [...state.ingredients].map(ingredient => {
          return {...ingredient, count: 0}
        })
      };
    }
    default: {
      return state
    }
  }
}