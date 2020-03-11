import { Action } from '../../actions/selected'
import {ADD_SELECTED, ADD_SELECTED_ERROR, CLEAR_SELECTED_DATA} from '../../actions/types'

export const initialState = {
  selected: []
}

export default function selectedReducer(state = initialState.selected, action: Action) {
  switch (action.type) {
    case ADD_SELECTED: 
      return {
        ...state,
        selected: action.selected
    }
    case ADD_SELECTED_ERROR: 
      return {
        ...state,
    }
    case CLEAR_SELECTED_DATA: 
      return {
        ...state,
        selected: null
    }
    default:
      return state
  }
}