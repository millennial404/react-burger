import {combineReducers} from 'redux';
import {ingredientsReducer} from "./ingredients";
import {componentsReducer} from "./constructorIngredients";
import {ingredientDetailsReducer} from "./currentIngredient"
import {createdOrderReducer} from "./createdOrder";
import {userRegistrationReducer} from "./registerUser";
import {authReducer} from "./auth";
import {profileDataReducer} from "./profileData";
import {resetPassReducer} from "./resetPass";
import {wsReducer} from "./ws";

// Корневой редьюсер
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  components: componentsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderId: createdOrderReducer,
  registration: userRegistrationReducer,
  auth: authReducer,
  profileData: profileDataReducer,
  resetPass: resetPassReducer,
  feed: wsReducer


})