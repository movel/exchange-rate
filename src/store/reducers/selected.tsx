import { Action } from '../actions/selected'

export const initialState = {
  selected: [{
    "value": "JPY",
    "label": "JPY",
    "title": "Japanese Yen",
  }]
}

export function selectedReducer(state = initialState.selected, action: Action) {
  switch (action.type) {
    case 'addSelected': return {
      ...state,
      selected: action.payload
    };
    case 'addSelectedError': return {
      ...state,
    };
    default:
      return state;
  }
}