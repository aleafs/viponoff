/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

"use strict";

var fs = require('fs');

exports.create = function (options) {

  var _options = {
    'statusurl'  : '/status.taobao',
    'statusfile' : '',
  };
  for (var i in options) {
    _options[i] = options[i];
  }

  return function (req, res, next) {
    fs.readFile(_options.statusfile, function (error, data) {
      res.writeHead(error ? 404 : 200, {});
      res.end(data);
    });
  };

};
