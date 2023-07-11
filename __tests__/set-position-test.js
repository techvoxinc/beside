'use strict';

jest
  .dontMock('jquery')
  .dontMock('../src/set-position');

describe('beside', () => {
  var setPosition = require('../src/set-position');
  var dom = require('../src/dom');

  beforeEach(() => {
    document.body.innerHTML = '<div id="me">ME</div><div id="you">YOU</div>';
    var options = {
      me: document.getElementById('me'),
      you: document.getElementById('you'),
      where: 'top center',
      offset: '10px 0'
    };

    var $you = document.getElementById('you');
    setPosition(options, $you);
  });

  it('setPosition should be called', () => {
    expect(dom.css).toBeCalled();
  });

});
