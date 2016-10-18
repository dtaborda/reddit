import RedditApi from './reddit_api';
import Api from './api';

export default class ApiFacade {

  constructor(req) {
    const api = new Api(req);
    this.redditApi = new RedditApi(api);
  }

  get reddit() {
    return this.redditApi;
  }
}
