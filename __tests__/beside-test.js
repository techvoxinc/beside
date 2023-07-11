'use strict';

jest
  .dontMock('../src/beside');

describe('beside', () => {
  var beside = require('../src/beside');
  var instance = require('../src/instance');

  it('init in instance should called', () => {
    document.body.innerHTML = '<div id="me">ME</div><div id="you">YOU</div>';

    beside.init({
      me: document.getElementById('me'),
      you: document.getElementById('you'),
      where: 'top center'
    });

    expect(instance.init).toBeCalledWith({
      me: document.getElementById('me'),
      you: document.getElementById('you'),
      where: 'top center'
    });
  });
});
