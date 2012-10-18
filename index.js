/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

"use strict";

var fs = require('fs');

exports.create = function (options, next) {

  var _options = {
    'statusurl'  : '/status.taobao',
    'statusfile' : ''
  };
  var enable = options.enable !== undefined ? options.enable : true;

  for (var i in options) {
    _options[i] = options[i];
  }

  var handler = function (req, res) {
    if (!req || !req.url || !res || !res.writeHead || !res.end) {
      return;
    }

    var u = req.url.toString().split('?').shift();
    if (_options.statusurl !== u) {
      next && next(req, res);
      return;
    }
    if (!enable){
      res.writeHead(404,{});
      res.end('');
      return ;
    }

    fs.readFile(_options.statusfile, function (error, data) {
      res.writeHead(error ? 404 : 200, {});
      res.end('HEAD' === req.method ? '' : data);
    });
  };

  handler.enable = function(bool){
    enable = bool;
  };

  return handler；
};
