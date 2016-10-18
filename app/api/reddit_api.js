export default class RedditApi {

  constructor(api) {
    this.api = api;
  }

  getRedditSchema(name) {
    return this.api.get({
      path: `/r/${name}/.json`,
      ignoreAuthFailure: true
    });
  }
}
