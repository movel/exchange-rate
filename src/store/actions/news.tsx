export type Action =
  | { type: '' }
  | { type: 'fetchNewsSuccess'; payload: [] }
  | { type: 'fetchNewsError'; payload: Error }

export const fetchNewsSuccess = (payload: []) => ({
  type: 'fetchNewsSuccess',
  payload: payload
})

export const fetchNewsError = (err: Error) => ({
  type: 'fetchNewsError',
  payload: err
})