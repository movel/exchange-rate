import { combineReducers } from 'redux'
import { History } from 'history'
import { RouterState, connectRouter } from 'connected-react-router'
import selectedReducer from './selected'
import authReducer from './auth'
import dataReducer from './data'

export const rootReducer = (history: History) => combineReducers({
  selected: selectedReducer,
  router: connectRouter(history),
  auth: authReducer,
  data: dataReducer
})

export interface State {
  selected: [],
  router: RouterState
}

export default rootReducer
