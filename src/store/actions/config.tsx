import * as Redux from 'redux'
import axios from 'axios'
import { REACT_API_GOOGLE_FIREBASE } from '../../env.local'
import { FETCH_CONFIG_ERROR, FETCH_CONFIG_SUCCESS, FETCH_CONFIG_DATA, FETCH_CONFIG_QUOTES, POST_CONFIG_DATA, PATCH_CONFIG_DATA, CLEAR_CONFIG_DATA } from './types'

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

export const fetchConfigQuotes = async (payload: []) => ({
  type: FETCH_CONFIG_QUOTES,
  payload
})

export const postConfigData = (payload: string) => {
  return {
    type: POST_CONFIG_DATA,
    payload
  }
}

export const patchConfigData = () => {
  return {
    type: PATCH_CONFIG_DATA
  }
}

export const clearConfigData = () => {
  return {
    type: CLEAR_CONFIG_DATA
  }
}

export const fetchConfigFromFirebase = (userId: string) => {
  return async (dispatch: Redux.Dispatch<any>) => {
    let api = REACT_API_GOOGLE_FIREBASE + 'config.json'
    let config_data: any = []
    try {
      await axios.get(api.trim())
        .then(response => {
          config_data = response.data
          if(config_data) {
            let config_user: any = []
            let key_name: string = ''
            Object.keys(config_data).forEach(key => {
              if(config_data[key].userId === userId) {
                config_user.push(config_data[key].selected)
                key_name = key
                console.log('key_name', key_name)                
              }
            })

            localStorage.setItem('dataConfig', JSON.stringify({ userId: userId, selected: config_user[0] }))

            dispatch(fetchConfigData(config_user))
            dispatch(postConfigData(key_name))
          }
      })
    } catch(e) {
      throw(e)
    }
  }
}

export const clearAllConfigs = () => {
  return async (dispatch: Redux.Dispatch<any>) => {    
    dispatch(clearConfigData())
  }
}

export const postGoogleFirebase = (dataConfig: any) => {
  return async (dispatch: Redux.Dispatch<any>) => {
    let api = REACT_API_GOOGLE_FIREBASE + 'config.json'
    try {
      await axios.post(api.trim(), dataConfig)
        .then((response) => {
          dispatch(postConfigData(response.data))
          localStorage.setItem('dataConfig', JSON.stringify(response.data))
        })
    } catch (e) {
      console.log(e)
    }
  }
}

export const patchGoogleFirebase = (key: string, dataConfig: any) => {
  return async (dispatch: Redux.Dispatch<any>) => {
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
    } catch (e) {
      console.log(e)
    }
  }
}