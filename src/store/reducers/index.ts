import { combineReducers } from 'redux'
import { History } from 'history'
import { RouterState, connectRouter } from 'connected-react-router'
import { selectedReducer } from './selected'

export const rootReducer = (history: History) => combineReducers({
  selected: selectedReducer,
  router: connectRouter(history)
})

export interface State {
  selected: [],
  router: RouterState
}

export default rootReducer
