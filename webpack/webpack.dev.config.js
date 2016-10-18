'use strict';

var webpack = require('webpack');
var WebpackNotifierPlugin = require("webpack-notifier");
var path = require('path');
var HappyPack = require('happypack');

function isExternal(module) {
  var userRequest = module.userRequest;

  if (typeof userRequest !== 'string') {
    return false;
  }

  return userRequest.indexOf('/bower_components/') >= 0 ||
         userRequest.indexOf('/node_modules/') >= 0 ||
         userRequest.indexOf('/libraries/') >= 0;
}

module.exports = {
  devtool: 'eval-source-map',
  context: path.resolve(__dirname, '..'),
  entry: [
    // necessary for hot reloading with IE:
    // 'eventsource-polyfill',
    // listen to code updates emitted by hot middleware:
    // 'webpack-hot-middleware/client',
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, '../app/index.jsx')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HappyPack({
      // loaders is the only required parameter:
      loaders: [ 'babel' ],
      //loaders: [ 'babel?presets[]=es2015' ],

      // customize as needed, see Configuration below
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: function(module) {
        return isExternal(module);
      }
    }),
    new WebpackNotifierPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        SERVER_PATH: JSON.stringify("/api"),
      },
      __CLIENT__: true,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    })
  ],
  module: {
    loaders: [

      // IMPORTANT: we don"t want to process EVERY single JS file with babel
      // loader. We only want to process the files inside our app structure
      // otherwise this could get very slow or even fail.
      {test: /\.jsx?$/, exclude: /node_modules/, loaders: ["happypack/loader"] },

      {test: /\.json$/, loader: "json-loader"},
      {test: /\.css$/,  loader: "style-loader!css-loader?modules"},
      {test: /\.scss$/, loader: "style-loader!css-loader?modules!sass-loader"},
      {test: /\.png/, loader: "file-loader?mimetype=image/png"},
      {test: /\.jpg/, loader: "file"},
      {test: /\.gif/, loader: "file"},
      {test: /\.mp3/, loader: "file"},
      {test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?mimetype=application/font-woff"},
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
    ]
  },
  resolve: {
    alias: {
      "react": path.resolve(__dirname, '..') + '/node_modules/react',
      "react-dom": path.resolve(__dirname, '..') + '/node_modules/react-dom'
    },
    modulesDirectories: [
      'app',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx','.css','.scss']
  }
};
