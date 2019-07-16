export type Action =
  | { type: '' }
  | { type: 'addSelected'; payload: [] }
  | { type: 'addSelectedError'; payload: Error }

export const addSelected = (payload: []) => ({
  type: 'addSelected',
  payload: payload
})

export const addSelectedError = (err: Error) => ({
  type: 'addSelectedError',
  payload: err
})