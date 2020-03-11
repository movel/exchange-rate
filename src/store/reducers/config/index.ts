import { FETCH_CONFIG_ERROR, FETCH_CONFIG_SUCCESS, FETCH_CONFIG_DATA, FETCH_CONFIG_QUOTES, POST_CONFIG_DATA, PATCH_CONFIG_DATA, CLEAR_CONFIG_DATA } from '../../actions/types'

export type InitialStateConfigType = {
  config: string [] | null,
  config_key: string | null,
  configSuccess: boolean,
  quotes: string []
}

const initialState: InitialStateConfigType = {
  config: [],
  config_key: null,
  configSuccess: false,
  quotes: []
}

export default function configReducer(state = initialState, action: any):InitialStateConfigType {
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