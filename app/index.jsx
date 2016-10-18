import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import renderRoutes from 'routes';
import configureStore from 'store';
import ApiClient from './api/api_facade';

// Apply the base styles for ALL the app
import 'assets/stylesheets/index.scss';

// Make sure the static_content gets added to the bundle
import 'assets/static_content';

// API Facade to access services
const apiClient = new ApiClient(null);
const store = configureStore({}, apiClient);

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        {renderRoutes(store, browserHistory, window.__router)}
      </Provider>
    );
  }
}

ReactDOM.render(<Root/>, document.getElementById('application'));
