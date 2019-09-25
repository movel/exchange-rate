import * as Redux from 'redux'
import axios from 'axios'
import { REACT_API_CURRENCY_LAYER_COM, REACT_API_GOOGLE_FIREBASE } from '../../env.local'
import { FETCH_RATES_ERROR, FETCH_RATES_SUCCESS, FETCH_RATES_DATA, FETCH_RATES_QUOTES } from './types'

export const fetchRatesSuccess = (payload: boolean) => ({
  type: FETCH_RATES_SUCCESS,
  payload: payload
})

export const fetchRatesError = (error: Error) => ({
  type: FETCH_RATES_ERROR,
  payload: error
})

export const fetchRatesData = (payload: []) => ({
  type: FETCH_RATES_DATA,
  payload: payload
})

export const fetchRatesQuotes = (payload: []) => ({
  type: FETCH_RATES_QUOTES,
  payload
})

export const fetchGoogleFirebase = () => {
  return async (dispatch: Redux.Dispatch<any>) => {
    let apiTimeSeries = REACT_API_GOOGLE_FIREBASE + 'currency.json'
    let quotesGoogle: any = null
    try {
      await axios.get(apiTimeSeries.trim())
        .then(response => {
          quotesGoogle = response.data
          // console.log(quotesGoogle)
          dispatch(fetchRatesQuotes(quotesGoogle))
      })
    } catch(e) {
      throw(e)
    }

    return quotesGoogle
  }
}

export const fetchRates = () => {
  let quotesGoogle: any = null
  return async () => {
    quotesGoogle = fetchGoogleFirebase()
    return quotesGoogle
  }
}
