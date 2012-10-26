[![Build Status](https://secure.travis-ci.org/aleafs/viponoff.png?branch=master)](http://travis-ci.org/aleafs/viponoff)

## About

## Install

```bash
$ npm install viponoff
```

## Usage


* 在node原生的http服务中使用（`dispatch.js`）：

```javascript
var viponoff = require('viponoff').create({
  'statusurl' : '/status',
  'statusfile' : '/var/www/status.taobao',
  'setonline' : true // [optional] default true
}, function (req, res) {
  res.end('Hello world!');
});

require('http').createServer(viponoff.filter).listen(8124);

// soft enable
viponoff.online();
// soft disable
viponoff.offline();

```

服务启动，用`/var/www/status.taobao`文件来控制服务的上线下线：
```bash
$ node dispatch.js &
$ touch /var/www/status.taobao
$ curl http://localhost:8124/status -v

* About to connect() to localhost port 8124 (#0)
*   Trying 127.0.0.1...
* connected
* Connected to localhost (127.0.0.1) port 8124 (#0)
> GET /status HTTP/1.1
> User-Agent: curl/7.24.0 (x86_64-apple-darwin12.0) libcurl/7.24.0 OpenSSL/0.9.8r zlib/1.2.5
> Host: localhost:8124
> Accept: */*
> 
< HTTP/1.1 200 OK
< Connection: keep-alive
< Transfer-Encoding: chunked
< content-type: text/plain
< x-powered-by: node.js 0.6.11, with viponoff 0.1.2
< 
* Connection #0 to host localhost left intact
* Closing connection #0

$ rm -f /var/www/status.taobao
$ curl http://localhost:8124/status -v

* About to connect() to localhost port 8124 (#0)
*   Trying 127.0.0.1...
* connected
* Connected to localhost (127.0.0.1) port 8124 (#0)
> GET /status HTTP/1.1
> User-Agent: curl/7.24.0 (x86_64-apple-darwin12.0) libcurl/7.24.0 OpenSSL/0.9.8r zlib/1.2.5
> Host: localhost:8124
> Accept: */*
> 
< HTTP/1.1 404 Not Found
< Connection: keep-alive
< Transfer-Encoding: chunked
< content-type: text/plain
< x-powered-by: node.js 0.6.11, with viponoff 0.1.2
< 
* Connection #0 to host localhost left intact
* Closing connection #0
```

## License

(The MIT License)

Copyright (c) 2012 aleafs and other viponoff contributors

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
