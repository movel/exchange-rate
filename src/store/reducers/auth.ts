import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_CONFIG } from '../actions/types'

const initialState = {
  token: null
}

export default function authReducer(state = initialState, action: any) {
  switch(action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null
      }
    case AUTH_CONFIG:
      return {
        ...state,
        userId: action.userId
      }
    default: 
      return state
  }
}