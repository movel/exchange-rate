import { combineReducers } from 'redux'
import { History } from 'history'
import { RouterState, connectRouter } from 'connected-react-router'
import selectedReducer from './selected'
import authReducer from './auth'
import ratesReducer from './rates'
import configReducer from './config'

export const rootReducer = (history: History) => combineReducers({
  selected: selectedReducer,
  router: connectRouter(history),
  auth: authReducer,
  rates: ratesReducer,
  config: configReducer,
})

export interface State {
  selected: [],
  router: RouterState,
  auth: {
    token: string
  },
  rates: [],
  config: [],
}

export default rootReducer
