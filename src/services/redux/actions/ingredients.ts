import {getIngredientsData} from "../../../utils/burger-api";
import {productsPropTypes} from '../../../utils/types';

export const GET_INGREDIENTS: 'GET_INGREDIENTS' = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const INCREMENT_INGREDIENT_COUNT: 'INCREMENT_INGREDIENT_COUNT' = 'INCREMENT_INGREDIENT_COUNT';
export const DECREMENT_INGREDIENT_COUNT: 'DECREMENT_INGREDIENT_COUNT' = 'DECREMENT_INGREDIENT_COUNT';
export const CLEAR_INGREDIENT_COUNT: 'CLEAR_INGREDIENT_COUNT' = 'CLEAR_INGREDIENT_COUNT'

export type TGetIngredients = {
  readonly type: typeof GET_INGREDIENTS;
}

export type TGetIngredientsFailed = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TGetIngredientsSuccess = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: productsPropTypes[];
}

export type TIncrementIngredientCount = {
  readonly type: typeof INCREMENT_INGREDIENT_COUNT;
  addedIngredient: productsPropTypes;
}

export type TDecrementIngredientCount = {
  readonly type: typeof DECREMENT_INGREDIENT_COUNT;
  removedIngredient: productsPropTypes;
}

export type TClearIngredientCount = {
  readonly type: typeof CLEAR_INGREDIENT_COUNT;
}

export type TIngredientsAction =
  |TGetIngredients
  |TGetIngredientsFailed
  |TGetIngredientsSuccess
  |TIncrementIngredientCount
  |TDecrementIngredientCount
  |TClearIngredientCount
export function getIngredients() {
  return function (dispatch: (action: TIngredientsAction) => void) {
    dispatch({
      type: GET_INGREDIENTS
    })
    getIngredientsData().then((res: any) => {
      if (res) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data.map((item: productsPropTypes) => {
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

export function incrementIngredient(addedIngredient: productsPropTypes): TIncrementIngredientCount {
  return {
    type: INCREMENT_INGREDIENT_COUNT,
    addedIngredient: addedIngredient
  }
}

export function decrementIngredient(removedIngredient: productsPropTypes) {
  return {
    type: DECREMENT_INGREDIENT_COUNT,
    removedIngredient: removedIngredient
  }
}

export function clearIngredientsCount(): TClearIngredientCount {
  return {
    type: CLEAR_INGREDIENT_COUNT,
  }
}