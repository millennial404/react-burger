 export function reducer(state, action) {
    switch (action.type) {
      case "addIngredient":
        return { ...state, ingredients: [...state.ingredients, action.payload ]};
      case "addBun":
        return { ...state, bun: [action.payload] };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }