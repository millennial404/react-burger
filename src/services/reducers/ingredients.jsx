import {
  DECREMENT_INGREDIENT_COUNT,
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  INCREMENT_INGREDIENT_COUNT
} from '../actions/ingredients';

const initialState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredients: []
}

export const ingredientsReducer = (state = initialState, action) => {
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
          }
          else if (action.addedIngredient.type === "bun" && ingredient.type === "bun" && ingredient._id === action.addedIngredient._id) {
            return {...ingredient, count: 2}
          }
          else if (ingredient._id === action.addedIngredient._id) {
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
    default: {
      return state
    }
  }
}