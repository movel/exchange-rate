import { AppStateType } from './AppStateType';
import { combineReducers } from 'redux'
import { History } from 'history'
import { connectRouter } from 'connected-react-router'
import selectedReducer from './selected'
import authReducer from './auth'
import ratesReducer from './rates'
import configReducer from './config'

export const rootReducer = (history: History) => combineReducers<AppStateType>({
  router: connectRouter(history),
  config: configReducer,
  auth: authReducer,
  rates: ratesReducer,
  selected: selectedReducer,
})

export default rootReducer