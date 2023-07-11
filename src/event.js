'use strict';

var event = {
  bind(element, name, listener) {
    element.addEventListener(name, listener, false);
  },

  unbind(element, name, listener) {
    element.removeEventListener(name, listener, false);
  },

  once(element, name, listener) {
    var that = this;
    var once = function(e) {
      that.unbind(element, name, once);
      listener(e);
    };

    that.bind(element, name, once);
  }
};

module.exports = event;
