'use strict';

var event = require('./event');

var supportPageOffset = window.pageXOffset !== undefined;
var isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');

var offset = {
  x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
  y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
};

event.bind(window, 'scroll', function () {
  offset = {
    x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
    y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
  };
});

module.exports = offset;
