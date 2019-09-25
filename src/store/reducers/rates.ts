import { FETCH_RATES_ERROR, FETCH_RATES_SUCCESS, FETCH_RATES_DATA, FETCH_RATES_QUOTES } from '../actions/types'

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
    default: 
      return state
  }
}