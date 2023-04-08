import {ADD_BURGER_COMPONENT, ADD_BURGER_COMPONENT_BUN} from "../actions/constructorIngredients";


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