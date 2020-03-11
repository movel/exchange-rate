import { Action } from '../../actions/news'

export const initialState = {
  news:
    [
      {
        id: 0,
        title: 'news title',
        text: 'news text',
        link: 'news link',
        timestamp: new Date(),
      },
      {
        id: 1,
        title: 'news title 1',
        text: 'news text 1',
        link: 'news link 1',
        timestamp: new Date(),
      }
    ]
  ,
  isLoading: true,
}

export function newsReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'fetchNewsSuccess': return {
      ...state,
      news: action.payload
    };
    case 'fetchNewsError': return {
      ...state,
    };
    default:
      return state;
  }
}