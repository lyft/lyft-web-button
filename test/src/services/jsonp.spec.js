// dependencies (require)
var expect = require('expect');
var rewire = require('rewire');

// dependencies (rewire)
var jsonp = rewire('../../../src/services/jsonp.js');

// tests
describe('jsonp', function () {

  it('exists', function () {
    expect(jsonp).toExist();
  });

  it('exposes some methods', function () {
    expect(typeof jsonp.request).toEqual('function');
  });

  it('hides some methods', function () {
    expect(typeof jsonp.__get__('injectScript')).toEqual('function');
    expect(typeof jsonp.__get__('serialize')).toEqual('function');
  });

});
