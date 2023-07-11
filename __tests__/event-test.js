'use strict';

jest
  .dontMock('jquery')
  .dontMock('../src/event');

describe('event', () => {
  var $ = require('jquery');
  var event = require('../src/event');

  var buttonStr = '<button id="button" class="button" style="position: absolute;">';
  var $button;

  beforeEach(() => {
    document.body.innerHTML = buttonStr;
    $button = document.getElementById('button');
  });

  it('can bind event to element', () => {
    var count = 0;
    event.bind($button, 'click', e => {
      count++;
    });

    $('#button').click();
    expect(count).toBe(1);
  });

  it('can unbind event to element', () => {
    var count = 0;
    event.bind($button, 'click', e => {
      count++;
    });

    $('#button').click();
    expect(count).toBe(1);

    event.unbind($button, 'click', e => {
      count++;
      $('#button').click();
      expect(count).toBe(1);
    });

  });

  it('can bind once event to element', () => {
    var count = 0;
    event.once($button, 'click', e => {
      count++;
    });

    $('#button').click();
    expect(count).toBe(1);

    $('#button').click();
    expect(count).toBe(1);
  });

});
