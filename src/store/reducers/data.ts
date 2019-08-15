import { FETCH_DATA } from '../actions/types'

const initialState = {
  dataCurrency: {USDJPY: 108.45183333,}
}

export default function dataReducer(state = initialState, action: any) {
  switch(action.type) {
    case FETCH_DATA:
      return {
        ...state,
        dataCurrency: action.dataCurrency
      }
    default: 
      return state
  }
}