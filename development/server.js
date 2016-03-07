var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config');

module.exports = exports = express();

exports.set('view engine', 'jade');
exports.set('views', __dirname);

var compiler = webpack(config);

exports.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

exports.use(webpackHotMiddleware(compiler));

exports.get('*', (req, res) => {
  var assets = require('../build/webpack-assets');
  res.render('index', assets);
});

if (module === require.main) {
  var port = process.env.PORT || 3000;
  exports.listen(port, e => console[e ? 'error' : 'log'](e || 'Started webserver'));
}
