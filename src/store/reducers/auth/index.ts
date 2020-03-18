import { actionTypes } from '../../actions/types'

export type StateAuthType = {
  token: string | null
  userId: string | null
}

const initialState: StateAuthType = {
  token: null,
  userId: null
}

export default function authReducer(state = initialState, action: any): StateAuthType {
  switch(action.type) {
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token
      }
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null
      }
    case actionTypes.AUTH_CONFIG:
      return {
        ...state,
        userId: action.userId
      }
    default: 
      return state
  }
}