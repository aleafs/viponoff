/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

"use strict";

var fs = require('fs');

exports.create = function (options, next) {

  var _options = {
    'statusurl'  : '/status.taobao',
    'statusfile' : '',
  };
  for (var i in options) {
    _options[i] = options[i];
  }

  return function (req, res) {
    if (!req || !req.url || !res || !res.writeHead || !res.end) {
      return;
    }

    var u = req.url.toString().split('?').shift();
    if (_options.statusurl !== u) {
      next && next(req, res);
      return;
    }

    fs.readFile(_options.statusfile, function (error, data) {
      res.writeHead(error ? 404 : 200, {});
      res.end('HEAD' === req.method ? '' : data);
    });
  };

};
