import { REACT_API_GOOGLE_WEB_API_KEY } from '../../env.local'
import { AUTH_GOOGLE_FIREBASE } from './types'
import auth from '../../components/Auth/Auth'
import axios from 'axios'

// export function loginAuth(email: string, password: string, isLogin: boolean) {
//   return async (dispatch: any) => {
//     const authData = { email, password, returnSecureToken: true}
//     let api = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + REACT_API_GOOGLE_WEB_API_KEY
//     if(isLogin) {
//       api = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + REACT_API_GOOGLE_WEB_API_KEY
//     }

//     try {
//       await axios.post(api, authData)
//       .then(response => console.log(response.data))
//     } catch (e) {
//       console.log(e)
//     }
//     // if(response.data.registered) {
//     //   auth.login(() => {
//     //     props.history.push('/tickers')
//     //   })
//     // }  
//   }
// }


// const apiUrl = 'https://api.github.com/users/KrunalLathiya';

export const postData = (data: any) => {
  return {
    type: AUTH_GOOGLE_FIREBASE,
    data
  }
};

export const loginAuth = (email: string, password: string, isLogin: boolean) => {
  return async (dispatch: any) => {
    const authData = { email, password, returnSecureToken: true}
    let apiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + REACT_API_GOOGLE_WEB_API_KEY
    if(isLogin) {
      apiUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + REACT_API_GOOGLE_WEB_API_KEY
    }
    return axios.post(apiUrl, authData)
      .then(response => {
        dispatch(postData(response.data))
        if(response.data.registered) {
          auth.login(() => {})
        }
      })
      .catch(error => {
        throw(error);
      });
  };
};