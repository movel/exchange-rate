import { actionTypes } from '../../actions/types'

export type StateConfigType = {
  config: string [] | null,
  config_key: string | null,
  configSuccess: boolean,
  quotes: string []
}

const initialState: StateConfigType = {
  config: [],
  config_key: null,
  configSuccess: false,
  quotes: []
}

export default function configReducer(state = initialState, action: any): StateConfigType {
  switch(action.type) {
    case actionTypes.FETCH_CONFIG_SUCCESS:
      return {
        ...state,
        configSuccess: action.actualData
      }
    case actionTypes.FETCH_CONFIG_DATA:
      return {
        ...state,
        config: action.payload
      }
    case actionTypes.FETCH_CONFIG_QUOTES:
      return {
        ...state,
        quotes: action.payload
      }
    case actionTypes.FETCH_CONFIG_ERROR:
      return {
        ...state,
      }
    case actionTypes.POST_CONFIG_DATA:
      return {
        ...state,
        config_key: action.payload
      }
    case actionTypes.PATCH_CONFIG_DATA:
      return {
        ...state,
      }
    case actionTypes.CLEAR_CONFIG_DATA:
      return {
        ...state,
        config: null,
        config_key: ''
      }
    default: 
      return state
  }
}