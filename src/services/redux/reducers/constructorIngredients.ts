import {
  ADD_BURGER_COMPONENT,
  ADD_BURGER_COMPONENT_BUN,
  DELETE_BURGER_COMPONENT,
  MOVE_BURGER_COMPONENT,
  CLEAR_BURGER_COMPONENTS
} from "../actions/constructorIngredients";
import update from 'immutability-helper'
import {TConstructorIngredientsActions} from '../actions/constructorIngredients';
import {productsPropTypes} from '../../../utils/types';

type TConstructorIngredientsState = {
  bun: productsPropTypes[];
  components: productsPropTypes[];
}

const initialState: TConstructorIngredientsState = {
  bun: [],
  components: []
}

export const componentsReducer = (state = initialState, action: TConstructorIngredientsActions) => {
  switch (action.type) {
    case ADD_BURGER_COMPONENT: {

      return {
        ...state,
        components: [...state.components, action.component]
      }
    }
    case DELETE_BURGER_COMPONENT: {
      return {
        ...state,
        components: [...state.components].filter((item => item.uuid !== action.componentUUID))
      }
    }
    case MOVE_BURGER_COMPONENT: {
      return {
        ...state,
        components: update(state.components, {$splice: [[action.dragIndex, 1], [action.hoverIndex, 0, state.components[action.dragIndex]],],})
      }
    }
    case ADD_BURGER_COMPONENT_BUN: {
      return {
        ...state,
        bun: [action.component]
      }
    }
    case CLEAR_BURGER_COMPONENTS: {
      return {
        ...state,
        bun: initialState.bun,
        components: initialState.components
      }
    }
    default: {
      return state
    }
  }
}