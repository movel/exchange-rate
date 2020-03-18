import { actionTypes } from './types'

export type Action =
  | { type: '' }
  | { type: actionTypes.ADD_SELECTED; selected: { value: string, label: string, title: string }[] }
  | { type: actionTypes.ADD_SELECTED_ERROR; payload: Error }
  | { type: actionTypes.CLEAR_SELECTED_DATA; }

export const addSelected = (selected: []) => ({
  type: actionTypes.ADD_SELECTED,
  selected
})

export const addSelectedError = (err: Error) => ({
  type: actionTypes.ADD_SELECTED_ERROR,
  payload: err
})

export const clearSelectedData = () => ({
  type: actionTypes.CLEAR_SELECTED_DATA
})