export const priceOrder = (menuIngredients, arrayIdsOrderIngredients) => {
  return arrayIdsOrderIngredients.reduce((totalSum, componentId) => {
    return componentId
      ? totalSum +
      menuIngredients.find((element) => element._id === componentId).price
      : 0;
  }, 0);
};