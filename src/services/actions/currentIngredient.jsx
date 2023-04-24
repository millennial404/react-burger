export const GET_INGREDIENT_DETAILS = "GET_INGREDIENT_DETAILS";

export const CLEAR_INGREDIENT_DETAILS = "CLEAR_INGREDIENT_DETAILS";

export function ingredientDetails({name, calories, proteins, fat, carbohydrates, image_large}) {
  return {
    type: GET_INGREDIENT_DETAILS,
    name: name,
    calories: calories,
    proteins: proteins,
    fat: fat,
    carbohydrates: carbohydrates,
    image_large: image_large
  }
}

export function clearIngredientDetails() {
  return {
    type: CLEAR_INGREDIENT_DETAILS
  }
}
