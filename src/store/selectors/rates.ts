import { AppStateType } from './../reducers/AppStateType'

export const getActualData = (state: AppStateType) => {
  return state.rates.actualData
}

export const getQuotes = (state: AppStateType) => {
  return state.rates.quotes
}