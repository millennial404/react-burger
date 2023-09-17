import {productsPropTypes} from "../../utils/types";

export const countingIngredients = (ingredientId: string, composition: string[]) => {
  return composition.reduce((acc, i) => {
    if (ingredientId === i) {
      acc += 1;
    }
    return acc;
  }, 0);
};

export const priceOrder = (menuIngredients: productsPropTypes[], arrayIdsOrderIngredients: string[]): number => {
  let totalSum = 0;
  for (const componentId of arrayIdsOrderIngredients) {
    if (componentId) {
      const ingredient = menuIngredients.find((element) => element._id === componentId);
      totalSum += ingredient ? ingredient.price : 0;
    }
  }
  return totalSum;
};

export function getIngredientById(id: string, ingredients: productsPropTypes[]) {
  return ingredients.find((ingredient) => ingredient._id === id);
}