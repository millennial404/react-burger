import {getIngredientsData} from "../../utils/burger-api";

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const INCREMENT_INGREDIENT_COUNT = 'INCREMENT_INGREDIENT_COUNT';
export const DECREMENT_INGREDIENT_COUNT = 'DECREMENT_INGREDIENT_COUNT';
export const CLEAR_INGREDIENT_COUNT = 'CLEAR_INGREDIENT_COUNT'

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS
    })
    getIngredientsData().then(res => {
      if (res) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data.map((item) => {
            return {...item, count: 0}
          })
        })
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      }
    }).catch(() => {
      dispatch({
        type: GET_INGREDIENTS_FAILED
      })
    })
  }
}

export function incrementIngredient(addedIngredient) {
  return {
    type: INCREMENT_INGREDIENT_COUNT,
    addedIngredient: addedIngredient
  }
}

export function decrementIngredient(removedIngredient) {
  return {
    type: DECREMENT_INGREDIENT_COUNT,
    removedIngredient: removedIngredient
  }
}

export function clearIngredientsCount() {
  return {
    type: CLEAR_INGREDIENT_COUNT,
  }
}