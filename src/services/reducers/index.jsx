import {combineReducers} from 'redux';
import {ingredientsReducer} from "./ingredients";
import {componentsReducer} from "./constructorIngredients";
import {ingredientDelailsReducer} from "../reducers/currentIngredient"
import {createdOrderReducer} from "./createdOrder";

// Корневой редьюсер
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  components: componentsReducer,
  ingredientDetails: ingredientDelailsReducer,
  orderId: createdOrderReducer

})