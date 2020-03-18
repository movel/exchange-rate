import { AppStateType } from './../reducers/AppStateType'
import { createSelector } from "reselect"


export const getIsAuthenticated = (state: AppStateType) => {
  return !!state.auth.token
}

export const getToken = (state: AppStateType) => {
  return state.auth.token
}

export const getUserIdReselector = (state: AppStateType) => {
  return state.auth.userId
}

export const getUserId = createSelector(getUserIdReselector, (userId) => {
  return userId
})