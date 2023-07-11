(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var instance = require('./instance');

module.exports = { init: init };

function init(options) {
  var i = Object.create(instance);
  return i.init(options);
}

},{"./instance":6}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var beside = require('./beside');

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
    window.beside = factory();
  }
})(function () {

  return beside;
});

},{"./beside":1}],3:[function(require,module,exports){
'use strict';

module.exports = {
  offset: function offset(_offset) {
    var regex = /^[0-9\-]/;
    var arr = _offset.split(' ');
    if (arr.length !== 2 || !regex.test(arr[0]) || !regex.test(arr[1])) {
      throw new Error('value offset invalid, you should set something like "-10px 0"');
    }
  },

  where: function where(_where) {
    if (!_where || _where === '') {
      throw new Error('value where invalid, you should set something like "top left"');
    }

    var arr = _where.split(' ');
    if (arr.length < 2 || arr.length > 3) {
      throw new Error('value where invalid, you should set something like "top left"');
    }
  }
};

},{}],4:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function getCss(element, styleName) {
  var styleValue = window.getComputedStyle(element)[styleName];
  if (parseInt(styleValue, 10) || parseInt(styleValue, 10) === 0) {
    styleValue = parseInt(styleValue, 10);
  }

  return styleValue;
}

function setSingleCss(element, styleName, styleValue) {
  if (typeof styleValue === 'number' && styleName !== 'opacity') {
    styleValue = styleValue.toString() + 'px';
  }

  element.style[styleName] = styleValue;
  return element;
}

function setMultiCss(element, obj) {
  for (var key in obj) {
    var styleValue = obj[key];
    if (typeof styleValue === 'number' && key !== 'opacity') {
      styleValue = styleValue.toString() + 'px';
    }

    element.style[key] = styleValue;
  }

  return element;
}

var dom = {
  createElement: function createElement(string) {
    var element = document.createElement('div');
    element.innerHTML = string;
    return element.firstElementChild;
  },
  appendTo: function appendTo(child, parent) {
    parent.appendChild(child);
  },
  addClass: function addClass(element, className) {
    var classes = element.className.split(' ');
    if (classes.indexOf(className) < 0) {
      classes.push(className);
    }

    element.className = classes.join(' ');
    return element;
  },
  removeClass: function removeClass(element, className) {
    var classes = element.className.split(' ');
    var index = classes.indexOf(className);
    if (index > -1) {
      classes.splice(index, 1);
    }

    element.className = classes.join(' ');
    return element;
  },
  css: function css(element, styleNameOrObject, styleValue) {
    if ((typeof styleNameOrObject === 'undefined' ? 'undefined' : _typeof(styleNameOrObject)) === 'object') {
      return setMultiCss(element, styleNameOrObject);
    } else {
      if (typeof styleValue === 'undefined') {
        return getCss(element, styleNameOrObject);
      } else {
        return setSingleCss(element, styleNameOrObject, styleValue);
      }
    }
  }
};

module.exports = dom;

},{}],5:[function(require,module,exports){
'use strict';

var event = {
  bind: function bind(element, name, listener) {
    element.addEventListener(name, listener, false);
  },
  unbind: function unbind(element, name, listener) {
    element.removeEventListener(name, listener, false);
  },
  once: function once(element, name, listener) {
    var that = this;
    var once = function once(e) {
      that.unbind(element, name, once);
      listener(e);
    };

    that.bind(element, name, once);
  }
};

module.exports = event;

},{}],6:[function(require,module,exports){
'use strict';

var event = require('./event');
var check = require('./check');
var setPosition = require('./set-position');

module.exports = {
  init: function init(options) {
    options.offset = options.offset || '0 0'; // default value

    check.offset(options.offset);
    check.where(options.where);

    var $you = options.you;
    var $body = document.body;

    $body.appendChild($you);

    setPosition(options, $you);

    function onResize() {
      setPosition(options, $you);
    }

    var destroy = function destroy() {
      event.unbind(window, 'resize', onResize);
      $you.remove();
    };

    event.bind(window, 'resize', onResize);

    return destroy;
  }
};

},{"./check":3,"./event":5,"./set-position":7}],7:[function(require,module,exports){
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

},{"./dom":4,"./event":5,"./you":8}],8:[function(require,module,exports){
'use strict';

// var bodyPosition = require('./body-position');

var supportPageOffset = window.pageXOffset !== undefined;
var isCSS1Compat = (document.compatMode || '') === 'CSS1Compat';
var event = require('./event');

var bodyPosition = {
  x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
  y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
};

event.bind(window, 'scroll', function () {
  bodyPosition = {
    x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
    y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
  };
});

function init(options) {
  var $me = options.me;
  var $you = options.you;

  var rectYou = $you.getBoundingClientRect();
  var rectMe = $me.getBoundingClientRect();

  var left = rectMe.left + bodyPosition.x;
  var top = rectMe.top + bodyPosition.y;

  switch (options.where) {
    case 'top center':
      top = top - rectYou.height;
      left = left - rectYou.width / 2 + rectMe.width / 2;
      break;
    case 'top left':
      top = top - rectYou.height;
      break;
    case 'top right':
      top = top - rectYou.height;
      left = left - rectYou.width + rectMe.width;
      break;

    case 'top left diagonal':
      top = top - rectYou.height;
      left = left - rectYou.width;
      break;

    case 'top right diagonal':
      top = top - rectYou.height;
      left = left + rectMe.width;
      break;

    case 'bottom center':
      top = top + rectMe.height;
      left = left - rectYou.width / 2 + rectMe.width / 2;
      break;
    case 'bottom left':
      top = top + rectMe.height;
      break;
    case 'bottom right':
      top = top + rectMe.height;
      left = left - rectYou.width + rectMe.width;
      break;
    case 'bottom left diagonal':
      top = top + rectMe.height;
      left = left - rectYou.width;
      break;
    case 'bottom right diagonal':
      top = top + rectMe.height;
      left = left + rectMe.width;
      break;

    case 'left center':
      top = top - rectYou.height / 2 + rectMe.height / 2;
      left = left - rectYou.width;
      break;
    case 'left top':
      left = left - rectYou.width;
      break;
    case 'left bottom':
      top = top - rectYou.height + rectMe.height;
      left = left - rectYou.width;
      break;

    case 'right center':
      top = top - rectYou.height / 2 + rectMe.height / 2;
      left = left + rectMe.width;
      break;
    case 'right top':
      left = left + rectMe.width;
      break;
    case 'right bottom':
      top = top - rectYou.height + rectMe.height;
      left = left + rectMe.width;
      break;

    case 'top left inner':

      // nothing
      break;
    case 'top center inner':
      left = left - rectYou.width / 2 + rectMe.width / 2;
      break;
    case 'top right inner':
      left = left - rectYou.width + rectMe.width;
      break;
    case 'left center inner':
      top = top - rectYou.height / 2 + rectMe.height / 2;
      break;
    case 'left center inner':
      top = top - rectYou.height / 2 + rectMe.height / 2;
      break;
    case 'center center inner':
      top = top - rectYou.height / 2 + rectMe.height / 2;
      left = left - rectYou.width / 2 + rectMe.width / 2;
      break;
    case 'right center inner':
      top = top - rectYou.height / 2 + rectMe.height / 2;
      left = left - rectYou.width + rectMe.width;
      break;
    case 'bottom left inner':
      top = top - rectYou.height + rectMe.height;
      break;
    case 'bottom center inner':
      top = top - rectYou.height + rectMe.height;
      left = left - rectYou.width / 2 + rectMe.width / 2;
      break;
    case 'bottom right inner':
      top = top - rectYou.height + rectMe.height;
      left = left - rectYou.width + rectMe.width;
      break;

    default:
      break;
  }

  var offsetX = parseInt(options.offset.split(' ')[0], 10);
  var offsetY = parseInt(options.offset.split(' ')[1], 10);

  this.top = top + offsetY;
  this.left = left + offsetX;
}

module.exports = { init: init, left: 0, top: 0 };

},{"./event":5}]},{},[2]);
