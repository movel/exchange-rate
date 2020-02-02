import { FETCH_RATES_ERROR, FETCH_RATES_SUCCESS, FETCH_RATES_DATA, FETCH_RATES_QUOTES, IS_ACTUAL_DATA } from '../actions/types'

const initialState = {
  dataCurrency: {USDJPY: 108.45183333,},
  actualData: false,
  quotes: []
}

export default function ratesReducer(state = initialState, action: any) {
  switch(action.type) {
    case FETCH_RATES_SUCCESS:
      return {
        ...state,
        actualData: action.actualData
      }
    case FETCH_RATES_DATA:
      return {
        ...state,
        dataCurrency: action.dataCurrency
      }
    case FETCH_RATES_QUOTES:
      return {
        ...state,
        quotes: action.payload
      }
    case FETCH_RATES_ERROR:
      return {
        ...state,
      }
    case IS_ACTUAL_DATA:
      return {
        ...state,
        isActualData: action.payload
      }
    default: 
      return state
  }
}