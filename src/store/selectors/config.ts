import { State } from "../reducers"
import { createSelector } from "reselect"

export const getConfig = (state: State) => {
  return state.config
}

export const getConfigKeyReselector = (state: State) => {
  if (state.config.config_key !== undefined) {
    return state.config.config_key.name
  } else return 'name'
  
}

export const getConfigKey = createSelector(getConfigKeyReselector, (config_key) => {
  return config_key
})