import Types from 'action_types/reddit';

export function getRedditSchema(name) {
  return {
    type: Types.GET_REDDIT_SCHEMA,
    callAPI: (api) => api.reddit.getRedditSchema(name)
  };
}
