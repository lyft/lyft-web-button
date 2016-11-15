// dependencies (require)
var rewire = require('rewire');

// dependencies (rewire)
var lyftWebButton = rewire('../../../../src/components/lyftWebButton/index.js');

// tests
describe('lyftWebButton', function () {

  it('exists', function () {
    expect(lyftWebButton).toExist();
  });

  it('exposes some methods', function () {
    expect(typeof lyftWebButton.initialize).toEqual('function');
    expect(typeof lyftWebButton.onGetCostsSuccess).toEqual('function');
    expect(typeof lyftWebButton.onGetEtasSuccess).toEqual('function');
  });

  it('hides some methods', function () {
    expect(typeof lyftWebButton.__get__('createElements')).toEqual('function');
    expect(typeof lyftWebButton.__get__('bindEvents')).toEqual('function');
    expect(typeof lyftWebButton.__get__('updateContents')).toEqual('function');
  });

  describe('initialize', function () {

    it('sets client_id', function () {
      var clientId = 'someClientId';

      expect.spyOn(lyftWebButton.__get__('api'), 'setClientId');
      lyftWebButton.__set__('createElements', expect.createSpy());
      lyftWebButton.__set__('bindEvents', expect.createSpy());
      lyftWebButton.__set__('updateContents', expect.createSpy());

      lyftWebButton.initialize({
        clientId: clientId,
        parentElement: {
          childNodes: [],
          insertBefore: expect.createSpy()
        }
      });
      expect(lyftWebButton.__get__('api').setClientId).toHaveBeenCalledWith(clientId);
    });

  });

});
