// dependencies (require)
var expect = require('expect');
var rewire = require('rewire');

// dependencies (rewire)
var lyftWebModal = rewire('../../../../src/components/lyftWebModal/index.js');

// tests
describe('lyftWebModal', function () {

  it('exists', function () {
    expect(lyftWebModal).toExist();
  });

  it('exposes some methods', function () {
    expect(typeof lyftWebModal.close).toEqual('function');
    expect(typeof lyftWebModal.initialize).toEqual('function');
    expect(typeof lyftWebModal.onPostMessagesSuccess).toEqual('function');
    expect(typeof lyftWebModal.open).toEqual('function');
  });

  it('hides some methods', function () {
    expect(typeof lyftWebModal.__get__('createElements')).toEqual('function');
    expect(typeof lyftWebModal.__get__('bindEvents')).toEqual('function');
    expect(typeof lyftWebModal.__get__('updateContents')).toEqual('function');
  });

});
