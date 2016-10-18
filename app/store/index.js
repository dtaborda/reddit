import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from 'reducers';
import asyncActionsMiddleware from 'middleware/async_actions_middleware';

export default function configureStore(initialState, apiClient) {
  const createStoreFunc = applyMiddleware(
    asyncActionsMiddleware(apiClient),
    createLogger({
      predicate: (getState, action) => process.env.NODE_ENV !== 'production'
    })
  );

  let createStoreWithMiddleware = null;

  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__ && window.devToolsExtension) {
    const { persistState } = require('redux-devtools');
    createStoreWithMiddleware = compose(
      createStoreFunc,
      window.devToolsExtension(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  } else {
    createStoreWithMiddleware = createStoreFunc(createStore);
  }

  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextRootReducer = require('reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
