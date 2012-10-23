/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

"use strict";

var fs = require('fs');
var util = require('util');

var HTTP_RES_HEADER = {
  'Content-Type' : 'text/plain',
  'X-Powered-By' : util.format('node.js %s, with viponoff 0.1.1', process.versions.node)
};

exports.create = function (options, next) {

  var _options = {
    'statusurl'  : '/status.taobao',
    'statusfile' : '',
    'setonline'  : true,
  };
  for (var i in options) {
    _options[i] = options[i];
  }

  var _online = _options.setonline;

  var _me = {};

  _me.online = function () {
    _online = true;
  };

  _me.offline = function () {
    _online = false;
  };

  _me.filter = function (req, res) {
    if (!req || !req.url || !res || !res.writeHead || !res.end) {
      return;
    }

    var u = req.url.toString().split('?').shift();
    if (_options.statusurl !== u) {
      next && next(req, res);
      return;
    }

    if (true === _online && !_options.statusfile) {
      res.writeHead(200, HTTP_RES_HEADER);
      res.end('');
      return;
    }

    fs.readFile(_options.statusfile, function (error, data) {
      res.writeHead((!_online || error) ? 404 : 200, HTTP_RES_HEADER);
      res.end('HEAD' === req.method ? '' : data);
    });
  };

  return _me;
};

