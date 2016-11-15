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

    var options;

    beforeEach(function() {
      options = {
        clientId: 'someClientId',
        clientToken: 'someClientToken',
        onClick: expect.createSpy(),
        parentElement: {
          childNodes: [],
          insertBefore: expect.createSpy()
        },
        theme: 'someTheme'
      };
      expect.spyOn(lyftWebButton.__get__('api'), 'setClientId');
      expect.spyOn(lyftWebButton.__get__('api'), 'setClientToken');
      lyftWebButton.__set__('createElements', expect.createSpy());
      lyftWebButton.__set__('bindEvents', expect.createSpy());
      lyftWebButton.__set__('updateContents', expect.createSpy());
    });

    afterEach(function() {
      options = undefined;
    });

    it('sets client_id', function () {
      lyftWebButton.initialize(options);
      expect(lyftWebButton.__get__('api').setClientId)
        .toHaveBeenCalledWith(options.clientId);
    });

    it('sets client_token', function () {
      lyftWebButton.initialize(options);
      expect(lyftWebButton.__get__('api').setClientToken)
        .toHaveBeenCalledWith(options.clientToken);
    });

    it('creates elements', function () {
      lyftWebButton.initialize(options);
      expect(lyftWebButton.__get__('createElements'))
        .toHaveBeenCalled();
    });

    it('binds events', function () {
      lyftWebButton.initialize(options);
      expect(lyftWebButton.__get__('bindEvents'))
        .toHaveBeenCalledWith(options.onClick);
    });

    it('updates contents', function () {
      lyftWebButton.initialize(options);
      expect(lyftWebButton.__get__('updateContents'))
        .toHaveBeenCalledWith(options.theme);
    });

  });

});
