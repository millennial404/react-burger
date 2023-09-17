import {v4 as uuidv4} from 'uuid';
import {productsPropTypes} from '../../../utils/types';

export const ADD_BURGER_COMPONENT: 'ADD_BURGER_COMPONENT' = 'ADD_BURGER_COMPONENT'
export const DELETE_BURGER_COMPONENT: 'DELETE_BURGER_COMPONENT' = 'DELETE_BURGER_COMPONENT'
export const MOVE_BURGER_COMPONENT: 'MOVE_BURGER_COMPONENT' = 'MOVE_BURGER_COMPONENT'
export const ADD_BURGER_COMPONENT_BUN: 'ADD_BURGER_COMPONENT_BUN' = 'ADD_BURGER_COMPONENT_BUN'
export const CLEAR_BURGER_COMPONENTS: 'CLEAR_BURGER_COMPONENTS' = 'CLEAR_BURGER_COMPONENTS';


export type TAddBurgerComponent = {
  readonly type: typeof ADD_BURGER_COMPONENT;
  component: productsPropTypes;
}

export type TDeleteBurgerComponent = {
  readonly type: typeof DELETE_BURGER_COMPONENT;
  componentUUID: string | undefined;
}

export type TMoveBurgerComponent = {
  readonly type: typeof MOVE_BURGER_COMPONENT;
  dragIndex: number,
  hoverIndex: number,
}

export type TAddBurgerComponentBun = {
  readonly type: typeof ADD_BURGER_COMPONENT_BUN;
  component: productsPropTypes;
}

export type TClearBurgerComponent = {
  readonly type: typeof CLEAR_BURGER_COMPONENTS;
}

export type TConstructorIngredientsActions =
  | TAddBurgerComponent
  | TDeleteBurgerComponent
  | TMoveBurgerComponent
  | TAddBurgerComponentBun
  | TClearBurgerComponent


export function addBurgerComponent(component: productsPropTypes): TAddBurgerComponent {
  return {
    type: ADD_BURGER_COMPONENT,
    component: {...component, uuid: uuidv4()}
  }
}

export function addBurgerComponentBun(component: productsPropTypes): TAddBurgerComponentBun {
  return {
    type: ADD_BURGER_COMPONENT_BUN,
    component: {...component, uuid: uuidv4()}
  }
}

export function deleteBurgerComponent(uuid: string | undefined): TDeleteBurgerComponent {
  return {
    type: DELETE_BURGER_COMPONENT,
    componentUUID: uuid
  }
}

export function moveBurgerComponent(dragIndex: number, hoverIndex: number): TMoveBurgerComponent {
  return {
    type: MOVE_BURGER_COMPONENT,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex,
  }
}

export function clearBurgerComponent(): TClearBurgerComponent {
  return {
    type: CLEAR_BURGER_COMPONENTS
  }
}