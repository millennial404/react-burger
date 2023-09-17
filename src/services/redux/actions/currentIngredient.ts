
export const GET_INGREDIENT_DETAILS: 'GET_INGREDIENT_DETAILS' = "GET_INGREDIENT_DETAILS";

export const CLEAR_INGREDIENT_DETAILS: 'CLEAR_INGREDIENT_DETAILS' = "CLEAR_INGREDIENT_DETAILS";

type TIngredientDetailsArg = {
  name: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  image_large: string;
}

type TIngredientDetails = {
  readonly type: typeof GET_INGREDIENT_DETAILS;
  name: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  image_large: string;
}

type TClearIngredientDetails = {
  readonly type: typeof CLEAR_INGREDIENT_DETAILS;
}

export type TCurrentIngredientActions =
  | TIngredientDetails
  | TClearIngredientDetails

export function ingredientDetails({name, calories, proteins, fat, carbohydrates, image_large}: TIngredientDetailsArg): TIngredientDetails {
  return {
    type: GET_INGREDIENT_DETAILS,
    name,
    calories,
    proteins,
    fat,
    carbohydrates,
    image_large,
  }
}

export function clearIngredientDetails(): TClearIngredientDetails {
  return {
    type: CLEAR_INGREDIENT_DETAILS
  }
}
