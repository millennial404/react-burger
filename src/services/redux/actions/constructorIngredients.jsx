import {v4 as uuidv4} from 'uuid';

export const ADD_BURGER_COMPONENT = 'ADD_BURGER_COMPONENT'
export const DELETE_BURGER_COMPONENT = 'DELETE_BURGER_COMPONENT'
export const MOVE_BURGER_COMPONENT = 'MOVE_BURGER_COMPONENT'
export const ADD_BURGER_COMPONENT_BUN = 'ADD_BURGER_COMPONENT_BUN'
export const CLEAR_BURGER_COMPONENTS = 'CLEAR_BURGER_COMPONENTS';


export function addBurgerComponent(component) {
  return {
    type: ADD_BURGER_COMPONENT,
    component: {...component, uuid: uuidv4()}
  }
}

export function addBurgerComponentBun(component) {
  return {
    type: ADD_BURGER_COMPONENT_BUN,
    component: {...component, uuid: uuidv4()}
  }
}

export function deleteBurgerComponent(uuid) {
  return {
    type: DELETE_BURGER_COMPONENT,
    componentUUID: uuid
  }
}

export function moveBurgerComponent(dragIndex, hoverIndex) {
  return {
    type: MOVE_BURGER_COMPONENT,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex,
  }
}

export function clearBurgerComponent() {
  return {
    type: CLEAR_BURGER_COMPONENTS
  }
}