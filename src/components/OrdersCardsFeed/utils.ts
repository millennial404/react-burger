import {productsPropTypes} from "../../utils/types";

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