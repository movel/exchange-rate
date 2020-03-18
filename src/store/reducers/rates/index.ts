import { actionTypes } from '../../actions/types'

export type StateRatesType = {
  dataCurrency: {},
  actualData: boolean,
  quotes: string []
}

const initialState: StateRatesType = {
  dataCurrency: {USDJPY: 108.45183333,},
  actualData: false,
  quotes: []
}

export default function ratesReducer(state = initialState, action: any): StateRatesType {
  switch(action.type) {
    case actionTypes.FETCH_RATES_SUCCESS:
      return {
        ...state,
        actualData: action.actualData
      }
    case actionTypes.FETCH_RATES_DATA:
      return {
        ...state,
        dataCurrency: action.dataCurrency
      }
    case actionTypes.FETCH_RATES_QUOTES:
      return {
        ...state,
        quotes: action.payload
      }
    case actionTypes.FETCH_RATES_ERROR:
      return {
        ...state,
      }
    default: 
      return state
  }
}