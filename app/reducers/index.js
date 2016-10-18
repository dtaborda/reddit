import { combineReducers } from 'redux';

import reddit from './reddit_reducer';

const rootReducer = combineReducers({
  reddit
});

export default rootReducer;
