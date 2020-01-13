import { ADD_SELECTED, ADD_SELECTED_ERROR, CLEAR_SELECTED_DATA } from './types'

export type Action =
  | { type: '' }
  | { type: 'ADD_SELECTED'; selected: { value: string, label: string, title: string }[] }
  | { type: 'ADD_SELECTED_ERROR'; payload: Error }
  | { type: 'CLEAR_SELECTED_DATA'; }

export const addSelected = (selected: []) => ({
  type: ADD_SELECTED,
  selected
})

export const addSelectedError = (err: Error) => ({
  type: ADD_SELECTED_ERROR,
  payload: err
})

export const clearSelectedData = () => ({
  type: CLEAR_SELECTED_DATA
})