import { AUTH_GOOGLE_FIREBASE } from '../actions/types'

const initialState = {
  token: null
}

export default function authReducer(state = initialState, action: any) {
  switch(action.type) {
    case AUTH_GOOGLE_FIREBASE:
      return action.data
    default: 
      return state
  }
}