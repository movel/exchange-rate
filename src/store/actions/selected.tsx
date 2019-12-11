import { ADD_SELECTED, ADD_SELECTED_ERROR } from './types'

export type Action =
  | { type: '' }
  | { type: 'ADD_SELECTED'; selected: { value: string, label: string, title: string }[] }
  | { type: 'ADD_SELECTED_ERROR'; payload: Error }

export const addSelected = (selected: []) => ({
  type: ADD_SELECTED,
  selected
})

export const addSelectedError = (err: Error) => ({
  type: ADD_SELECTED_ERROR,
  payload: err
})