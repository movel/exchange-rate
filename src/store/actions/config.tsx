import * as Redux from 'redux'
import axios from 'axios'
import { REACT_API_GOOGLE_FIREBASE } from '../../env.local'
import { FETCH_CONFIG_ERROR, FETCH_CONFIG_SUCCESS, FETCH_CONFIG_DATA, FETCH_CONFIG_QUOTES, POST_CONFIG_DATA } from './types'

export const fetchConfigSuccess = (payload: boolean) => ({
  type: FETCH_CONFIG_SUCCESS,
  payload
})

export const fetchConfigError = (error: Error) => ({
  type: FETCH_CONFIG_ERROR,
  payload: error
})

export const fetchConfigData = (payload: []) => ({
  type: FETCH_CONFIG_DATA,
  payload
})

export const fetchConfigQuotes = (payload: []) => ({
  type: FETCH_CONFIG_QUOTES,
  payload
})

export const postConfigData = () => {
  return {
    type: POST_CONFIG_DATA
  }
}

export const fetchConfigFromFirebase = () => {
  return async (dispatch: Redux.Dispatch<any>) => {
    let api = REACT_API_GOOGLE_FIREBASE + 'config.json'
    try {
      await axios.get(api.trim())
        .then(response => {
          dispatch(fetchConfigData(response.data))
      })
    } catch(e) {
      throw(e)
    }

    // return userConfigs
  }
}

export const fetchConfigs = () => {
  let quotesGoogle: any = null
  return async (dispatch: Redux.Dispatch<any>) => {
    quotesGoogle = fetchConfigFromFirebase()
    
    dispatch(fetchConfigData(quotesGoogle))
  }
}

export const postGoogleFirebase = (dataConfig: any) => {
  return async (dispatch: Redux.Dispatch<any>) => {
    let apiTimeSeries = REACT_API_GOOGLE_FIREBASE + 'config.json'
    try {
      await axios.post(apiTimeSeries.trim(), dataConfig)
        .then((response) => {
          let config_user_id = response.data
          console.log('config_user_id', config_user_id)
          dispatch(postConfigData())
        })
    } catch (e) {
      console.log(e)
    }
  }
}

export const patchGoogleFirebase = (dataConfig: any) => {
  return async (dispatch: Redux.Dispatch<any>) => {
    let apiTimeSeries = REACT_API_GOOGLE_FIREBASE + 'config.json'
    
    let config = dataConfig
    try {
      await axios.post(apiTimeSeries.trim(), config)
        .then(() => {
          dispatch(postConfigData())
        })
    } catch (e) {
      console.log(e)
    }
  }
}