import { productsPropTypes } from "./types";

export function getIngredientById(id: string | undefined, ingredients: productsPropTypes[]) {
  return ingredients.find((ingredient: productsPropTypes) => ingredient._id === id);
}