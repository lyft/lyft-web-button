window['lyftWebButton'] = require('../../../../src/components/lyftWebButton/index.js');

describe('lyftWebButton', function () {

  it('exists', function () {
    expect(window.lyftWebButton).toExist();
  });

  it('exposes methods', function () {
    expect(typeof window.lyftWebButton.initialize).toEqual('function');
    expect(typeof window.lyftWebButton.onGetCostsSuccess).toEqual('function');
    expect(typeof window.lyftWebButton.onGetEtasSuccess).toEqual('function');
  });

});
