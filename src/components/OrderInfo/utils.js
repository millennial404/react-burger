export const countingIngredients = (ingredientId, composition) => {
  return composition.reduce((acc, i) => {
    if (ingredientId === i) {
      acc += 1;
    }
    return acc;
  }, 0);
};

export const priceOrder = (menuIngredients, arrayIdsOrderIngredients) => {
  return arrayIdsOrderIngredients.reduce((totalSum, componentId) => {
    return componentId
      ? totalSum +
      menuIngredients.find((element) => element._id === componentId).price
      : 0;
  }, 0);
};

export function getIngredientById(id, ingredients) {
  return ingredients.find((ingredient) => ingredient._id === id);
}