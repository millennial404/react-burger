import {combineReducers} from 'redux';
import {ingredientsReducer} from "./ingredients";
import {componentsReducer} from "./constructorIngredients";
import {ingredientDetailsReducer} from "./currentIngredient"
import {createdOrderReducer} from "./createdOrder";
import {popupIngredientDetailsReducer} from "./popupIngredientDetails";

// Корневой редьюсер
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  components: componentsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderId: createdOrderReducer,
  popup: popupIngredientDetailsReducer

})