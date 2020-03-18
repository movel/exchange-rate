import { actionTypes } from '../../actions/types'

export type StateSelectedType = {
  selected: string [] | null
}

const initialState: StateSelectedType = {
  selected: []
}

export default function selectedReducer(state = initialState, action: any): StateSelectedType {
  switch (action.type) {
    case actionTypes.ADD_SELECTED: 
      return {
        ...state,
        selected: action.selected
    }
    case actionTypes.ADD_SELECTED_ERROR: 
      return {
        ...state,
    }
    case actionTypes.CLEAR_SELECTED_DATA: 
      return {
        ...state,
        selected: null
    }
    default:
      return state
  }
}