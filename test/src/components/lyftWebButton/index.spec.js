var lyftWebButton = require('../../../../src/components/lyftWebButton/index.js');

describe('lyftWebButton', function () {

  it('exists', function () {
    expect(lyftWebButton).toExist();
  });

  it('exposes some methods', function () {
    expect(typeof lyftWebButton.initialize).toEqual('function');
    expect(typeof lyftWebButton.onGetCostsSuccess).toEqual('function');
    expect(typeof lyftWebButton.onGetEtasSuccess).toEqual('function');
  });

  describe('initialize', function () {

    it('is callable', function () {
      expect.spyOn(lyftWebButton, 'initialize');
      lyftWebButton.initialize();
      expect(lyftWebButton.initialize).toHaveBeenCalled();
    });

  });

});
