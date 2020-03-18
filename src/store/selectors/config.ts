import { AppStateType } from './../reducers/AppStateType';
import { createSelector } from "reselect"

export const getConfig = (state: AppStateType) => {
  return state.config
}

export const getConfigKeyReselector = (state: AppStateType) => {
  if (state.config.config_key !== undefined) {
    return state.config.config_key
  } else return 'name'
  
}

export const getConfigKey = createSelector(getConfigKeyReselector, (config_key) => {
  return config_key
})