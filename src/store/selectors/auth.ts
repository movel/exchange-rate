import { State } from "../reducers"

export const getIsAuthenticated = (state: State) => {
  return !!state.auth.token
}

export const getToken = (state: State) => {
  return state.auth.token
}

export const getUserId = (state: State) => {
  return state.auth.userId
}