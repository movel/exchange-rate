import { REACT_API_GOOGLE_WEB_API_KEY } from '../../env.local'
import { actionTypes } from './types'
import * as Redux from 'redux'
import axios from 'axios'

export const loginAuth = (email: string, password: string, isLogin: boolean) => {
  return async (dispatch: Redux.Dispatch<any>) => {
    const authData = { email, password, returnSecureToken: true}
    let apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${REACT_API_GOOGLE_WEB_API_KEY}`
    if(isLogin) {
      apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${REACT_API_GOOGLE_WEB_API_KEY}`
    }
    return axios.post(apiUrl, authData)
      .then(response => {
        const data = response.data
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate.toString())

        if(!isLogin && data.idToken) {
          window.alert("Account created!")
        }

        dispatch(authSuccess(data.idToken))
        dispatch(authConfig(data.localId))
        dispatch(autoLogout(data.expiresIn))
      })
      .catch(err => {
        window.alert(err.response.data.error.message)
      })
  }
}

export const autoLogin = () => {
  return (dispatch: Redux.Dispatch<any>) => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    if(!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate')!)
      
      if(expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        if (typeof userId === 'string') {
          dispatch(authConfig(userId))
        }
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}

export const authSuccess = (token: string) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token
  }
}

export const authConfig = (userId: string) => {
  return {
    type: actionTypes.AUTH_CONFIG,
    userId
  }
}

export const autoLogout = (time: number) => {
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
    type: actionTypes.AUTH_LOGOUT
  }
}