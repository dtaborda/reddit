const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const StatsPlugin = require('stats-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const ROOT = path.resolve(__dirname, '..');

module.exports = {
  devtool: 'eval-source-map',
  context: path.resolve(__dirname, '..'),
  entry: [
    path.join(__dirname, '../app/index.jsx')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      // IMPORTANT: we don't want to process EVERY single JS file with babel
      // loader. We only want to process the files inside our app structure
      // otherwise this could get very slow or even fail.
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules!sass-loader')  },
      { test: /\.png/, loader: 'file-loader?mimetype=image/png' },
      { test: /\.jpg/, loader: 'file' },
      { test: /\.gif/, loader: 'file' },
      { test: /\.mp3/, loader: 'file' },
      { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  resolve: {
    // Needed so you can require('a') instead of require('a.jsx')
    extensions: ['', '.json', '.js', '.jsx', '.css', '.scss'],
    // Let us do things like require('app/reducers/application')
    root: ROOT,
    modulesDirectories: [
      'app',
      'node_modules'
    ],
    alias: {
      react: path.join(ROOT, 'node_modules/react')
    }
  },
  plugins: [
    new AssetsPlugin({
      path: path.join(__dirname, 'config'),
      filename: 'webpack-prod-assets-manifest.json'
    }),
    new WebpackNotifierPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    /*
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    */
    /*
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    */
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        SERVER_PATH: JSON.stringify('/api')
      },
      __CLIENT__: true,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
    })
  ],
  postcss: [
    require('autoprefixer')
  ]
};
