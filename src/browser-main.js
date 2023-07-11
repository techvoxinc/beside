'use strict';

var beside = require('./beside');

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof window === 'object') {
    window.beside = factory();
  }
}(function() {

  return beside;
}));
