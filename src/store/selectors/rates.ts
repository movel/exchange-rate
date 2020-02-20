import { State } from "../reducers"

export const getActualData = (state: State) => {
  return state.rates.actualData
}