import { State } from "../reducers"
import { createSelector } from "reselect"

export const getConfig = (state: State) => {
  return state.config
}

export const getConfigKeyReselector = (state: State) => {
  return state.config.config_key
}

export const getConfigKey = createSelector(getConfigKeyReselector, (config_key) => {
  return config_key
})