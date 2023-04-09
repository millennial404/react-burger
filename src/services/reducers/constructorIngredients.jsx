import {
  ADD_BURGER_COMPONENT,
  ADD_BURGER_COMPONENT_BUN,
  DELETE_BURGER_COMPONENT
} from "../actions/constructorIngredients";


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