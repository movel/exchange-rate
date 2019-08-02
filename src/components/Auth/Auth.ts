import { UserIdentity } from '../../models/user'
import { REACT_API_LOCAL_STORAGE_PREFIX } from '../../env.local'

type AuthResponse = {
  status: number;
  data?: any; //[1]
  errorText?: string;
}
class Auth {
  authenticated: boolean

  prefix = REACT_API_LOCAL_STORAGE_PREFIX

  constructor() {
    this.authenticated = false
  }

  login = (cb: any) => {
    this.authenticated = true
    window.localStorage.setItem(this.prefix + '.authenticated', 'true')
    cb()  
  }

  logout(cb: any) {
    this.authenticated = false
    window.localStorage.removeItem(this.prefix + '.authenticated')
    cb()
  }

  isAuthenticated() {
    const isAuthenticated = localStorage.getItem(this.prefix + '.authenticated')
    if(isAuthenticated)  this.authenticated = true
    else this.authenticated = false
    return this.authenticated
  }
}

export default new Auth()