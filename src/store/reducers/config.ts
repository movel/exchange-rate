import { FETCH_CONFIG_ERROR, FETCH_CONFIG_SUCCESS, FETCH_CONFIG_DATA, FETCH_CONFIG_QUOTES } from '../actions/types'

const initialState = {
  config: null
}

export default function configReducer(state = initialState, action: any) {
  switch(action.type) {
    case FETCH_CONFIG_SUCCESS:
      return {
        ...state,
        configSuccess: action.actualData
      }
    case FETCH_CONFIG_DATA:
      return {
        ...state,
        config: action.payload
      }
    case FETCH_CONFIG_QUOTES:
      return {
        ...state,
        quotes: action.payload
      }
    case FETCH_CONFIG_ERROR:
      return {
        ...state,
      }  
    default: 
      return state
  }
}