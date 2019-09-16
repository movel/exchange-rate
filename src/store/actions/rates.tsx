import * as Redux from 'redux'
import axios from 'axios'
import { REACT_API_GOOGLE_WEB_API_KEY } from '../../env.local'
import { FETCH_RATES_ERROR, FETCH_RATES_SUCCESS } from './types'

export const fetchRatesSuccess = (payload: []) => ({
  type: FETCH_RATES_SUCCESS,
  payload: payload
})

export const fetchRatesError = (error: Error) => ({
  type: FETCH_RATES_ERROR,
  payload: error
})

export const fetchRates = () => {
  return async () => {
    
    return null
  }
}

