import {ADD_BURGER_COMPONENT} from "../actions/constructorIngredients";


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
    default: {
      return state
    }
  }
}