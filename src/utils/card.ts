
export function getIngredientById(id: string, ingredients: Array<{[key: string]: string | number}>) {
  return ingredients.find((ingredient) => ingredient._id === id);
}