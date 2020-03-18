import { AppStateType } from './../reducers/AppStateType'

export const getSelected = (state: AppStateType) => {
  return state.selected
}