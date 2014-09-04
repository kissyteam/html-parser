# html-parser

parse html into dom tree

[![modulex-json](https://nodei.co/npm/modulex-json.png)](https://npmjs.org/package/modulex-json)
[![NPM downloads](http://img.shields.io/npm/dm/modulex-json.svg)](https://npmjs.org/package/modulex-json)
[![Build Status](https://secure.travis-ci.org/kissyteam/json.png?branch=master)](https://travis-ci.org/kissyteam/json)
[![Coverage Status](https://img.shields.io/coveralls/kissyteam/json.svg)](https://coveralls.io/r/kissyteam/json?branch=master)
[![Dependency Status](https://gemnasium.com/kissyteam/json.png)](https://gemnasium.com/kissyteam/modulex-json)
[![Bower version](https://badge.fury.io/bo/modulex-json.svg)](http://badge.fury.io/bo/modulex-json)

[![browser support](https://ci.testling.com/kissyteam/json.png)](https://ci.testling.com/kissyteam/json)

## use on node

```javascript
var HtmlParser = require('../../');

console.log(HtmlParser.parse('<html><div>1</div><img src="http://g.cn"/></html>'));
```