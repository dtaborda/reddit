import React from 'react';
import {
  Router,
  Route,
  Redirect,
  browserHistory
} from 'react-router';
import ApplicationContainer from 'views/application/application_container';
import RedditSearchContainer from 'views/reddit/search_container';
import DamianContainer from 'views/damian';

if (module.hot) {
  // Don't hot reload the routes, do a refresh instead
  module.hot.decline();
}

export default function renderRoutes(store) {
  return (
    <Router history={browserHistory}>
      {/* <Redirect from="/" to="/reddit" /> */}
      <Route path="/" component={ApplicationContainer}>
        <Route path="/reddit" component={RedditSearchContainer} />
        <Route path="/damian" component={DamianContainer} />
      </Route>
    </Router>
  );
}
