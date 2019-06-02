import { combineReducers } from 'redux'
import { History } from 'history'
import { RouterState, connectRouter } from 'connected-react-router'

import { newsReducer } from './news'

export const rootReducers = (history: History) => combineReducers({
  router: connectRouter(history),
  news: newsReducer,
});

export interface State {
  news: [],
  router: RouterState
}