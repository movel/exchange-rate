import * as Redux from 'redux'
import axios from 'axios'
import { REACT_API_GOOGLE_FIREBASE } from '../../env.local'
import { FETCH_RATES_ERROR, FETCH_RATES_SUCCESS, FETCH_RATES_DATA, FETCH_RATES_QUOTES, IS_ACTUAL_DATA } from './types'

export const fetchRatesSuccess = (payload: boolean) => ({
  type: FETCH_RATES_SUCCESS,
  payload
})

export const fetchRatesError = (error: Error) => ({
  type: FETCH_RATES_ERROR,
  payload: error
})

export const fetchRatesData = (payload: []) => ({
  type: FETCH_RATES_DATA,
  payload
})

export const fetchRatesQuotes = (payload: []) => ({
  type: FETCH_RATES_QUOTES,
  payload
})

export const actualData = (payload: boolean) => ({
  type: IS_ACTUAL_DATA,
  payload
})

export const fetchGoogleFirebase = () => {
  return async (dispatch: Redux.Dispatch<any>) => {
    let api = REACT_API_GOOGLE_FIREBASE + 'currency.json'
    let quotesGoogle: any = null
    console.log('fetchGoogleFireBase - response', 'response.data')
    try {
      await axios.get(api.trim())
        .then(response => {
          console.log('fetchGoogleFireBase - response', response.data)
          quotesGoogle = response.data
          dispatch(fetchRatesQuotes(quotesGoogle))
          return quotesGoogle
      })
    } catch(e) {
      throw(e)
    }

    return quotesGoogle
  }
}

export const checkActualData = () => {
  return async (dispatch: Redux.Dispatch<any>) => {

    let api = REACT_API_GOOGLE_FIREBASE + 'currency.json'
    let quotesGoogle: any = null
    let quotesKeys: any = []
    let isActualData = false

    // Get current data from FireBase
    try {
      await axios.get(api.trim())
        .then(response => {
          quotesGoogle = response.data
          Object.keys(quotesGoogle).forEach(key => {
            quotesKeys.push({
              id: key
            })
          })
      })
    } catch(e) {
      throw(e)
    }

    // Check last data on FireBase
    let apiTimeSeries = REACT_API_GOOGLE_FIREBASE + 'currency/' + quotesKeys[quotesKeys.length - 1].id + '.json'
    let lastData: any = null
    let date: string = new Date().toISOString().split('T')[0]

    try {
      await axios.get(apiTimeSeries.trim())
      .then(response => {
        lastData = response.data
        if(lastData.date === date) {
          isActualData = true
        }
        dispatch(actualData(isActualData))
      })
    } catch(e) {
      throw(e)
    }
  }
}

export const fetchRates = () => {
  let quotesGoogle: any = null
  return async () => {
    quotesGoogle = fetchGoogleFirebase()
    return quotesGoogle
  }
}
