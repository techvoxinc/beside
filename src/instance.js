'use strict';

var event = require('./event');
var check = require('./check');
var setPosition = require('./set-position');

module.exports = {
  init: function (options) {
    options.offset = options.offset || '0 0'; // default value

    check.offset(options.offset);
    check.where(options.where);

    var $you = options.you;
    var $body = document.body;

    $body.appendChild($you);

    setPosition(options, $you);

    function onResize () {
      setPosition(options, $you);
    }

    var destroy = function () {
      event.unbind(window, 'resize', onResize);
      $you.remove();
    };

    event.bind(window, 'resize', onResize);

    return destroy;
  }
};
