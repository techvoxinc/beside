'use strict';

jest
  .dontMock('jquery')
  .dontMock('../src/instance');

describe('beside', () => {
  var instance = require('../src/instance');
  var check = require('../src/check');
  var setPosition = require('../src/set-position');
  var options;

  beforeEach(() => {
    document.body.innerHTML = '<div id="me">ME</div><div id="you">YOU</div>';
    options = {
      me: document.getElementById('me'),
      you: document.getElementById('you'),
      where: 'top center',
      offset: '10px 0'
    };

    var i = Object.create(instance);
    i.init(options);
  });

  it('check.offset should called', () => {
    expect(check.offset).toBeCalledWith(options.offset);
  });

  it('check.where should called', () => {
    expect(check.where).toBeCalledWith(options.where);
  });

  it('setPosition should be called', () => {
    expect(setPosition).toBeCalledWith(options, document.getElementById('you'));
  });

});
