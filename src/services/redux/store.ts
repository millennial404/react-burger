import {socketMiddleware} from "./middleware";
import {rootReducer} from "./reducers";
import {
  ALL_ORDERS_WS_CONNECTION_CLOSED,
  ALL_ORDERS_WS_CONNECTION_ERROR,
  ALL_ORDERS_WS_CONNECTION_START,
  ALL_ORDERS_WS_CONNECTION_STOP,
  ALL_ORDERS_WS_CONNECTION_SUCCESS,
  ALL_ORDERS_WS_GET_MESSAGE,
  ALL_ORDERS_WS_SEND_MESSAGE, TAllOrdersWsConnectionActions,
} from "./actions/wsAllOrders";
import {
  TUserOrdersWsConnectionActions,
  USER_ORDERS_WS_CONNECTION_CLOSED,
  USER_ORDERS_WS_CONNECTION_ERROR,
  USER_ORDERS_WS_CONNECTION_START,
  USER_ORDERS_WS_CONNECTION_STOP,
  USER_ORDERS_WS_CONNECTION_SUCCESS,
  USER_ORDERS_WS_GET_MESSAGE,
  USER_ORDERS_WS_SEND_MESSAGE,
} from "./actions/wsUserOrders";
import {configureStore, ThunkAction} from "@reduxjs/toolkit";
import {TAuthActions} from "./actions/auth";
import {TConstructorIngredientsActions} from "./actions/constructorIngredients";
import {TCreatedOrderActions} from "./actions/createdOrder";
import {TCurrentIngredientActions} from "./actions/currentIngredient";
import {TIngredientsAction} from "./actions/ingredients";
import {TProfileDataAction} from "./actions/profileData";
import {TRegisterUserAction} from "./actions/registerUser";
import {TResetPassAction} from "./actions/resetPass";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import type {} from "redux-thunk/extend-redux";


export type RootState = ReturnType<typeof rootReducer>;

const allOrdersMiddleware = socketMiddleware({
  wsInit: ALL_ORDERS_WS_CONNECTION_START,
  wsSendMessage: ALL_ORDERS_WS_SEND_MESSAGE,
  onOpen: ALL_ORDERS_WS_CONNECTION_SUCCESS,
  onClose: ALL_ORDERS_WS_CONNECTION_CLOSED,
  onError: ALL_ORDERS_WS_CONNECTION_ERROR,
  onMessage: ALL_ORDERS_WS_GET_MESSAGE,
  wsClose: ALL_ORDERS_WS_CONNECTION_STOP
});

const userOrdersMiddleware = socketMiddleware({
  wsInit: USER_ORDERS_WS_CONNECTION_START,
  wsSendMessage: USER_ORDERS_WS_SEND_MESSAGE,
  onOpen: USER_ORDERS_WS_CONNECTION_SUCCESS,
  onClose: USER_ORDERS_WS_CONNECTION_CLOSED,
  onError: USER_ORDERS_WS_CONNECTION_ERROR,
  onMessage: USER_ORDERS_WS_GET_MESSAGE,
  wsClose: USER_ORDERS_WS_CONNECTION_STOP
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      allOrdersMiddleware,
      userOrdersMiddleware
    );
  },
});

export type AppActions =
  | TAuthActions
  | TConstructorIngredientsActions
  | TCreatedOrderActions
  | TCurrentIngredientActions
  | TIngredientsAction
  | TProfileDataAction
  | TRegisterUserAction
  | TResetPassAction
  | TAllOrdersWsConnectionActions
  | TUserOrdersWsConnectionActions;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActions
>;

type AppDispatch<TReturnType = void> = (
  action: AppActions | AppThunk<TReturnType>
) => TReturnType;
export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;