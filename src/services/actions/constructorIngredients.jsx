export const ADD_BURGER_COMPONENT = 'ADD_BURGER_COMPONENT'
export const ADD_BURGER_COMPONENT_BUN= 'ADD_BURGER_COMPONENT_BUN'


export function addBurgerComponent(component) {
  return {
    type: ADD_BURGER_COMPONENT,
    component: component
  }
}

export function addBurgerComponentBun(component) {
  return {
    type: ADD_BURGER_COMPONENT_BUN,
    component: component
  }
}