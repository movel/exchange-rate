import { State } from "../reducers"
import { createSelector } from "reselect"

export const getIsAuthenticated = (state: State) => {
  return !!state.auth.token
}

export const getToken = (state: State) => {
  return state.auth.token
}

export const getUserIdReselector = (state: State) => {
  return state.auth.userId
}

export const getUserId = createSelector(getUserIdReselector, (userId) => {
  return userId
})