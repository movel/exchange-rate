import * as Redux from 'redux'
import axios from 'axios'
import { addSelected } from '../actions/selected'
import { REACT_API_GOOGLE_FIREBASE } from '../../env.local'
import { actionTypes } from './types'

export type FetchConfigSuccessActionType = {
  type: typeof actionTypes.FETCH_CONFIG_SUCCESS,
  payload: boolean
}

export const fetchConfigSuccess = (payload: boolean):FetchConfigSuccessActionType => ({
  type: actionTypes.FETCH_CONFIG_SUCCESS,
  payload
})

export type FetchConfigErrorsActionType = {
  type: typeof actionTypes.FETCH_CONFIG_ERROR,
  payload: Error
}

export const fetchConfigError = (error: Error):FetchConfigErrorsActionType => ({
  type: actionTypes.FETCH_CONFIG_ERROR,
  payload: error
})

export type FetchConfigDataActionType = {
  type: typeof actionTypes.FETCH_CONFIG_DATA,
  payload: []
}

export const fetchConfigData = (payload: []):FetchConfigDataActionType => ({
  type: actionTypes.FETCH_CONFIG_DATA,
  payload
})

export type FetchConfigQuotesActionType = {
  type: typeof actionTypes.FETCH_CONFIG_QUOTES,
  payload: []
}

export const fetchConfigQuotes = (payload: []):FetchConfigQuotesActionType => ({
  type: actionTypes.FETCH_CONFIG_QUOTES,
  payload
})

export type PostConfigDataActionType = {
  type: typeof actionTypes.POST_CONFIG_DATA,
  payload: string
}

export const postConfigData = (payload: string):PostConfigDataActionType => {
  return {
    type: actionTypes.POST_CONFIG_DATA,
    payload
  }
}

export type PatchConfigDataActionType = {
  type: typeof actionTypes.PATCH_CONFIG_DATA
}

export const patchConfigData = ():PatchConfigDataActionType => {
  return {
    type: actionTypes.PATCH_CONFIG_DATA
  }
}

export type ClearConfigDataActionType = {
  type: typeof actionTypes.CLEAR_CONFIG_DATA
}

export const clearConfigData = ():ClearConfigDataActionType => {
  return {
    type: actionTypes.CLEAR_CONFIG_DATA
  }
}

export const fetchConfigFromFirebase = (userId: string) => async (dispatch: Redux.Dispatch<any>) => {
  let api = REACT_API_GOOGLE_FIREBASE + 'config.json'
  let config_data: any = []
  try {
    await axios.get(api.trim())
      .then(response => {
        config_data = response.data
        if (config_data) {
          let config_user: any = []
          let key_name: string = ''
          Object.keys(config_data).forEach(key => {
            if (config_data[key].userId === userId) {
              config_user.push(config_data[key].selected)
              key_name = key
            }
          })
          localStorage.setItem('dataConfig', JSON.stringify({ userId: userId, selected: config_user[0] }))
          dispatch(fetchConfigData(config_user))
          dispatch(postConfigData(key_name))
          dispatch(addSelected(config_user[0]))
        }
      })
  }
  catch (e) {
    throw (e)
  }
}

export const clearAllConfigs = () => {
  return async (dispatch: Redux.Dispatch<any>) => {    
    dispatch(clearConfigData())
  }
}

export const postGoogleFirebase = (dataConfig: []) => async (dispatch: Redux.Dispatch<any>) => {
  let api = REACT_API_GOOGLE_FIREBASE + 'config.json'
  try {
    await axios.post(api.trim(), dataConfig)
      .then((response) => {
        dispatch(postConfigData(response.data))
        localStorage.setItem('dataConfig', JSON.stringify(response.data))
      })
  }
  catch (e) {
    console.log(e)
  }
}

export const patchGoogleFirebase = (key: string, dataConfig: []) => async (dispatch: Redux.Dispatch<any>) => {
  let api = REACT_API_GOOGLE_FIREBASE + 'config/' + key + '.json'
  console.log('apiTimeSeries', api)
  console.log('key from patch', key)
  let config = dataConfig
  try {
    await axios.patch(api.trim(), JSON.stringify(config))
      .then(() => {
        dispatch(patchConfigData())
        localStorage.removeItem('dataConfig')
        localStorage.setItem('dataConfig', JSON.stringify(config))
      })
  }
  catch (e) {
    console.log(e)
  }
}