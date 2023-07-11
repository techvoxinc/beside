'use strict';

// var bodyPosition = require('./body-position');
var supportPageOffset = window.pageXOffset !== undefined;
var isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
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
