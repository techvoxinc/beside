'use strict';

var dom = require('./dom');
var you = require('./you');
var event = require('./event');

module.exports = function (options, $you) {
  var boxYou = Object.create(you);
  boxYou.init(options);

  dom.css($you, {
    position: 'absolute',
    top: boxYou.top + 'px',
    left: boxYou.left + 'px',
    opacity: 1
  });
};
