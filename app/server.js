/* eslint no-console: 0 */
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack/webpack.dev.config.js');
import httpProxy from 'http-proxy';
import { readFileSync } from 'jsonfile';
import expressReactViews from 'express-react-views';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

// Proxy that is going to be used to access backend services
const proxy = httpProxy.createProxyServer({});

// Proxy to API server
app.use('/api', (req, res) => {
  req.headers.host  = 'www.reddit.com';
  proxy.web(req, res,
    { target: 'https://www.reddit.com/' },
    function (error) {
      console.error('ERROR: API Proxy, url: ', req.originalUrl, ', error: ', error);
    }
  );
});

// Express React View configuration
const jsxEngine = expressReactViews.createEngine({
  transformViews: false
});
app.set('views', path.join(__dirname, 'server_templates/'));
app.set('view engine', 'jsx');
app.engine('jsx', jsxEngine);

// Disable the HTTP response header x-powered-by that returns Express
app.disable('x-powered-by');

// Assets list that will be rendered in html file
const assets = {
  scripts: [],
  styleLinks: []
};

if (isDeveloping) {
  // On dev mode only is required main.js
  assets.scripts.push('/vendors.js');
  assets.scripts.push('/main.js');

  // Middleware configuration
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    quiet: false,
    noInfo: false,
    hot: true,
    inline: true,
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 2000
    },
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);

  app.use(webpackHotMiddleware(compiler));
} else {
  // Production

  // In production enviroment assets are defined in a manifest.
  const assetsManifestPath = path.resolve(__dirname, '../webpack/config/webpack-prod-assets-manifest.json');
  const assetsManifest = readFileSync(assetsManifestPath);

  // Load assets to be rendered
  assets.scripts.push(assetsManifest.main.js);
  assets.styleLinks.push(assetsManifest.main.css);

  // Add to express static content
  app.use(express.static(path.resolve(__dirname, '../webpack/dist')));
}

// Log configured assets
console.log('ASSETS: ', assets);

app.get('/*', function response(req, res) {
  res.render('index_tpl', { title: 'Reddit', router: 'index', assets: assets });
});

app.use(function (req, res) {
  res.sendStatus(404);
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
