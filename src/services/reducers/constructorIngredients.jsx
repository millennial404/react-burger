import {ADD_BURGER_COMPONENT} from "../actions/constructorIngredients";


const initialState = [];

export const componentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BURGER_COMPONENT: {
      return {
        state: [...state, action.component]
      }
    }
  }
}