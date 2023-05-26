
export function getIngredientById(id, ingredients) {
  return ingredients.find((ingredient) => ingredient._id === id);
}