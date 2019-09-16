import { FETCH_RATES_ERROR, FETCH_RATES_SUCCESS } from '../actions/types'

const initialState = {
  dataCurrency: {USDJPY: 108.45183333,}
}

export default function ratesReducer(state = initialState, action: any) {
  switch(action.type) {
    case FETCH_RATES_SUCCESS:
      return {
        ...state,
        dataCurrency: action.dataCurrency
      }
    case FETCH_RATES_ERROR:
      return {
        ...state,
      }  
    default: 
      return state
  }
}