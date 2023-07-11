'use strict';

var instance = require('./instance');

module.exports = { init: init };

function init(options) {
  var i = Object.create(instance);
  return i.init(options);
}
