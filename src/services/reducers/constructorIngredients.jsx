import {
  ADD_BURGER_COMPONENT,
  ADD_BURGER_COMPONENT_BUN,
  DELETE_BURGER_COMPONENT,
  MOVE_BURGER_COMPONENT
} from "../actions/constructorIngredients";
import update from 'immutability-helper'


const initialState = {
  bun: [],
  components: []
}

export const componentsReducer = (state = initialState, action) => {
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
        components: update(state.components,{$splice: [[action.dragIndex, 1],[action.hoverIndex, 0, state.components[action.dragIndex]],],})
      }
    }
    case ADD_BURGER_COMPONENT_BUN: {
      return {
        ...state,
        bun: [action.component]
      }
    }
    default: {
      return state
    }
  }
}