import { combineReducers } from 'redux'
import { History } from 'history'
import { RouterState, connectRouter } from 'connected-react-router'
import { InitialStateConfigType } from './config'
import selectedReducer from './selected'
import authReducer from './auth'
import ratesReducer from './rates'
import configReducer from './config'

export const rootReducer = (history: History) => combineReducers({
  auth: authReducer,
  rates: ratesReducer,
  config: configReducer,
  selected: selectedReducer,
  router: connectRouter(history),
})

export interface State {
  selected: [],
  router: RouterState,
  auth: {
    token: string,
    userId: string,
  },
  rates: {
    dataCurrency: [],
    actualData: boolean,
  }
  config: InitialStateConfigType,
}

export default rootReducer
