require('../../dist/lyftWebButton.js');  // binds itself to window

describe('dist/lyftWebButton', function () {

  it('binds itself to window', function () {
    expect(window.lyftWebButton).toExist();
  });

  it('exposes methods', function () {
    expect(typeof window.lyftWebButton.initialize).toEqual('function');
    expect(typeof window.lyftWebButton.onGetCostsSuccess).toEqual('function');
    expect(typeof window.lyftWebButton.onGetEtasSuccess).toEqual('function');
  });

});
