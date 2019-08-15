import { REACT_API_GOOGLE_WEB_API_KEY } from '../../env.local'
import { AUTH_SUCCESS, AUTH_LOGOUT } from './types'
import * as Redux from 'redux'
import axios from 'axios'

export const fetchData = () => {
  return async (dispatch: Redux.Dispatch<any>) => {
    
    let apiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + REACT_API_GOOGLE_WEB_API_KEY
    
      apiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + REACT_API_GOOGLE_WEB_API_KEY
    
    return axios.post(apiUrl)
      .then(response => {
        const data = response.data

        const expirationDate = new Date(new Date().getTime() + data.expiresIn + 1000)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate.toString())

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))
      })
      .catch(error => {
        throw(error)
      })
  }
}

export const autoLogin = () => {
  return (dispatch: Redux.Dispatch<any>) => {
    const token = localStorage.getItem('token')
    if(!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate')!)
      if(expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}

export const authSuccess = (token: string) => {
  return {
    type: AUTH_SUCCESS,
    token
  }
}

export const autoLogout = (time: any) => {
  return (dispatch: Redux.Dispatch<any>) => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}