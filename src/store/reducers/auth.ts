import { AUTH_SUCCESS, AUTH_LOGOUT, AUTH_CONFIG } from '../actions/types'

export type InitialStateType = {
  token: string | null
  userId: string | null
}

const initialState: InitialStateType = {
  token: null,
  userId: null
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