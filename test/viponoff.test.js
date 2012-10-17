/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

var should  = require('should');
var urllib  = require('urllib');

var filter  = require(__dirname + '/../').create({
  'statusurl' : '/are_you_ok',
    'statusfile' : __dirname + '/status.tmp',
}, function (req, res) {
  res.end('hello world');
});

describe('viponoff test', function () {

  /* {{{ should_work_with_http_server_works_fine() */
  it ('should_work_with_http_server_works_fine', function (done) {

    var s = require('http').createServer(filter).listen(8124);
    urllib.request('http:/' + '/localhost:8124/aa', function (error, data, res) {
      data.toString().should.eql('hello world');
      done();
    });

  });
  /* }}} */

});
