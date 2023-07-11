'use strict';

jest.dontMock('../src/check');

describe('event', () => {
  var check = require('../src/check');

  it('check offset', () => {
    expect(() => check.offset('10px -10px')).not.toThrow();
    expect(() => check.offset('10px')).toThrow();
    expect(() => check.offset('10px 10px 0')).toThrow();
    expect(() => check.offset('abcpx 10px')).toThrow();
  });

  it('check where', () => {
    expect(() => check.where('top center')).not.toThrow();
    expect(check.where).toThrow();
    expect(() => check.where('')).toThrow();
    expect(() => check.where('top')).toThrow();
    expect(() => check.where('top left hello world')).toThrow();
  });
});
