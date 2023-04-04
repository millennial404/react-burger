import {combineReducers} from 'redux';
import {ingredientsReducer} from "./ingredients";
import {componentsReducer} from "./constructorIngredients";

// Корневой редьюсер
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  components: componentsReducer,

})