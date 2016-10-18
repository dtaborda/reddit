import renderIndexRouter from './index_router';

if (module.hot) {
  // Don't hot reload the routes, do a refresh instead
  module.hot.decline();
}

export default function renderRoutes(store, browserHistory, routerGroup) {
  let router = null;
  switch (routerGroup) {
  case 'index':
    router = renderIndexRouter;
    break;
  default:
    router = renderIndexRouter;
    break;
  }
  return router(store, browserHistory);
}
