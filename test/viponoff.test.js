/* vim: set expandtab tabstop=2 shiftwidth=2 foldmethod=marker: */

var fs = require('fs');
var util  = require('util');
var http  = require('http');
var should  = require('should');
var urllib  = require('urllib');
var connect = require('connect');

var onoffer = require(__dirname + '/../').create({
  'statusurl' : '/are_you_ok',
    'setonline' : false,
    'statusfile' : __dirname + '/status.tmp',
}, function (req, res) {
  res.end('hello world');
});

describe('viponoff test', function () {

  /* {{{ private function runtest() */

  var _ = require(__dirname + '/../package.json');

  var x = util.format('node.js %s, with %s %s', process.versions.node, _.name, _.version);

  var runtest = function (_done) {
    var n = 2;
    var done  = function () {
      if ((--n) === 0) {
        _done();
      }
    };

    onoffer.offline();
    urllib.request('http:/' + '/localhost:8124/aa', function (error, data, res) {
      should.ok(!error);
      data.toString().should.eql('hello world');
      res.should.have.property('statusCode', 200);
      done();
    });

    fs.unlink(__dirname + '/status.tmp', function (error) {
      urllib.request('http:/' + '/localhost:8124/are_you_ok', function (error, data, res) {
        res.should.have.property('statusCode', 404);
        res.headers.should.have.property('x-powered-by', x);
        fs.writeFile(__dirname + '/status.tmp', 'ON', function (error) {
          should.ok(!error);
          urllib.request('http:/' + '/localhost:8124/are_you_ok', function (error, data, res) {
            res.should.have.property('statusCode', 404);
            res.headers.should.have.property('x-powered-by', x);

            onoffer.online();
            urllib.request('http:/' + '/localhost:8124/are_you_ok', function (error, data, res) {
              res.should.have.property('statusCode', 200);
              res.headers.should.have.property('x-powered-by', x);
              done();
            });
          });
        });
      });
    });
  };
  /* }}} */

  /* {{{ should_work_with_http_server_fine() */
  it ('should_work_with_http_server_fine', function (done) {
    var s = http.createServer(onoffer.filter).listen(8124);
    runtest(function () {
      s.close();
      done();
    });
  });
  /* }}} */

  /* {{{ should_work_with_connect_fine() */
  it ('should_work_with_connect_fine', function (done) {
    var s = http.createServer(connect().use(onoffer.filter)).listen(8124);
    runtest(function () {
      s.close();
      done();
    });
  });
  /* }}} */

});
