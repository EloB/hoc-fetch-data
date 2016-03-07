var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var reload = require('./development/reload');

module.exports = {
  devtool: 'cheap-eval-module-source-map',
  entry: {
    app: [].concat(
      process.env.NODE_ENV === 'development' ? [
        'webpack-hot-middleware/client',
      ] : [],
      path.join(__dirname, 'application/index')
    ),
  },
  output: {
    path: path.join(__dirname, 'build/release/dist'),
    filename: '[name].[hash].js',
    publicPath: process.env.NODE_ENV === 'production' ? 'dist/' : '/dist/',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, include: path.join(__dirname, 'application'), loader: 'babel' },
    ],
  },
  plugins: [].concat(
    process.env.NODE_ENV === 'development' ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ] : [],
    [
      new webpack.DefinePlugin({
        process: {
          env: {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
          },
        },
      }),
      new AssetsPlugin({
        path: path.join(__dirname, 'build'),
        processOutput: reload,
      }),
    ]
  ),
};
