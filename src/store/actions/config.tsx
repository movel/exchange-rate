import * as Redux from 'redux'
import axios from 'axios'
import { REACT_API_GOOGLE_FIREBASE } from '../../env.local'
import { FETCH_CONFIG_ERROR, FETCH_CONFIG_SUCCESS, FETCH_CONFIG_DATA, FETCH_CONFIG_QUOTES, POST_CONFIG_DATA, PATCH_CONFIG_DATA } from './types'

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
            Object.keys(config_data).forEach(key => {
              console.log('key', key)
              if(config_data[key].userId === userId) {
                config_user.push(config_data[key].selected)
              }
            })
            
            dispatch(fetchConfigData(config_user))
          }
      })
    } catch(e) {
      throw(e)
    }
  }
}

// export const fetchConfigs = () => {
//   let configUser: any = null
//   return async (dispatch: Redux.Dispatch<any>) => {
//     configUser = fetchConfigFromFirebase()
    
//     dispatch(fetchConfigData(configUser))
//   }
// }

export const postGoogleFirebase = (dataConfig: any) => {
  return async (dispatch: Redux.Dispatch<any>) => {
    let apiTimeSeries = REACT_API_GOOGLE_FIREBASE + 'config.json'
    try {
      await axios.post(apiTimeSeries.trim(), dataConfig)
        .then((response) => {
          dispatch(postConfigData(response.data))
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
      await axios.patch(apiTimeSeries.trim(), config)
        .then(() => {
          dispatch(patchConfigData())
        })
    } catch (e) {
      console.log(e)
    }
  }
}