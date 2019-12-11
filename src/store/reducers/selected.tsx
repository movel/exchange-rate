import { Action } from '../actions/selected'
import {ADD_SELECTED, ADD_SELECTED_ERROR} from '../actions/types'

export const initialState = {
  selected: []
}

export default function selectedReducer(state = initialState.selected, action: Action) {
  switch (action.type) {
    case ADD_SELECTED: 
      return {
        ...state,
        selected: action.selected
    };
    case ADD_SELECTED_ERROR: 
      return {
        ...state,
    };
    default:
      return state;
  }
}