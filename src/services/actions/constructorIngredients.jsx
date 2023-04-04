export const ADD_BURGER_COMPONENT = 'ADD_BURGER_COMPONENT'



export function addBurgerComponent(component) {
  return {
    type:ADD_BURGER_COMPONENT,
    component: component
  }
}