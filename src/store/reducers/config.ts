import { FETCH_CONFIG_ERROR, FETCH_CONFIG_SUCCESS, FETCH_CONFIG_DATA, FETCH_CONFIG_QUOTES, POST_CONFIG_DATA, PATCH_CONFIG_DATA, CLEAR_CONFIG_DATA } from '../actions/types'

export type InitialStateConfigType = {
  config?: string [],
  config_key: string | null
}

const initialState: InitialStateConfigType = {
  config_key: null
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
    case POST_CONFIG_DATA:
      return {
        ...state,
        config_key: action.payload
      }
    case PATCH_CONFIG_DATA:
      return {
        ...state,
      }
    case CLEAR_CONFIG_DATA:
      return {
        ...state,
        config: null,
        config_key: ''
      }
    default: 
      return state
  }
}