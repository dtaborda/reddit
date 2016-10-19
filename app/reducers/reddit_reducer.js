import Types          from 'action_types/reddit';
import matchesAction  from './utils/matches_action';
import * as ih        from './utils/immutable_helpers';

const initialState = ih.immutable({
  gettingRedditSchema: false,
  redditSchemaError: null,
  redditSchema: {}
});


export default function redditReducer(state = initialState, action) {
  if (matchesAction(action, Types.GET_REDDIT_SCHEMA.request)) {
    state = ih.set(state, 'gettingRedditSchema', true);
  }

  if (matchesAction(action, Types.GET_REDDIT_SCHEMA.done)) {
    state = ih.set(state, 'gettingRedditSchema', false);
    state = ih.set(state, 'redditSchema', action.apiResponse);
    if (action.apiResponse.data.children.length > 0) {
      state = ih.set(state, 'redditSchemaError', null);
    } else {
      state = ih.set(state, 'redditSchemaError', 'Error - no result found');
    }
  }

  if (matchesAction(action, Types.GET_REDDIT_SCHEMA.fail)) {
    state = ih.set(state, 'redditSchemaError', action.apiError);
    state = ih.set(state, 'gettingRedditSchema', false);
  }

  return state;
}
