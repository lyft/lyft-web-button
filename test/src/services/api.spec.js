// globals (mocha >> karma >> window)
var afterEach = window.afterEach;
var beforeEach = window.beforeEach;
var describe = window.describe;
var it = window.it;

// dependencies (require)
var expect = require('expect');
var rewire = require('rewire');

// dependencies (rewire)
var api = rewire('../../../src/services/api.js');

// tests
describe('api', function () {
  it('exists', function () {
    expect(api).toExist();
  });

  it('exposes some methods', function () {
    expect(typeof api.getCosts).toEqual('function');
    expect(typeof api.getDrivers).toEqual('function');
    expect(typeof api.getEtas).toEqual('function');
    expect(typeof api.getRideTypes).toEqual('function');
    expect(typeof api.postMessages).toEqual('function');
    expect(typeof api.setClientId).toEqual('function');
    expect(typeof api.setClientToken).toEqual('function');
  });

  it('hides some methods', function () {
    expect(typeof api.__get__('requestWithCredentials')).toEqual('function');
  });

  describe('setClientId', function () {
    it('sets client_id', function () {
      api.__set__('client_id', 'before');
      api.setClientId('after');
      expect(api.__get__('client_id'))
        .toEqual('after');
    });
  });

  describe('setClientToken', function () {
    it('sets client_token', function () {
      api.__set__('client_token', 'before');
      api.setClientToken('after');
      expect(api.__get__('client_token'))
        .toEqual('after');
    });
  });

  describe('requestWithCredentials', function () {
    var callback = 'someCallback';
    var clientId = 'someClientId';
    var clientToken = 'someClientToken';
    var data = {key: 'val'};
    var url = 'someUrl';

    beforeEach(function () {
      api.__set__('client_id', clientId);
      api.__set__('client_token', clientToken);
      expect.spyOn(api.__get__('jsonp'), 'request');
    });

    afterEach(function () {
      api.__get__('jsonp').request.reset();
    });

    it('requests jsonp with injected credentials', function () {
      api.__get__('requestWithCredentials')(url, data, callback);
      expect(api.__get__('jsonp').request)
        .toHaveBeenCalledWith({
          url: url,
          data: {
            key: 'val',
            client_id: clientId,
            client_token: clientToken
          },
          callback: callback
        });
    });
  });

  describe('getCosts', function () {
    var GET_COSTS_URL = 'SOME_GET_COSTS_URL';
    var callback = 'someCallback';
    var data = 'someData';

    beforeEach(function () {
      api.__set__('GET_COSTS_URL', GET_COSTS_URL);
      api.__set__('requestWithCredentials', expect.createSpy());
    });

    afterEach(function () {
      api.__get__('requestWithCredentials').reset();
    });

    it('gets costs with credentials', function () {
      api.getCosts(data, callback);
      expect(api.__get__('requestWithCredentials'))
        .toHaveBeenCalledWith(GET_COSTS_URL, data, callback);
    });
  });

  describe('getDrivers', function () {
    var GET_DRIVERS_URL = 'SOME_GET_DRIVERS_URL';
    var callback = 'someCallback';
    var data = 'someData';

    beforeEach(function () {
      api.__set__('GET_DRIVERS_URL', GET_DRIVERS_URL);
      api.__set__('requestWithCredentials', expect.createSpy());
    });

    afterEach(function () {
      api.__get__('requestWithCredentials').reset();
    });

    it('gets drivers with credentials', function () {
      api.getDrivers(data, callback);
      expect(api.__get__('requestWithCredentials'))
        .toHaveBeenCalledWith(GET_DRIVERS_URL, data, callback);
    });
  });

  describe('getEtas', function () {
    var GET_ETAS_URL = 'SOME_GET_ETAS_URL';
    var callback = 'someCallback';
    var data = 'someData';

    beforeEach(function () {
      api.__set__('GET_ETAS_URL', GET_ETAS_URL);
      api.__set__('requestWithCredentials', expect.createSpy());
    });

    afterEach(function () {
      api.__get__('requestWithCredentials').reset();
    });

    it('gets etas with credentials', function () {
      api.getEtas(data, callback);
      expect(api.__get__('requestWithCredentials'))
        .toHaveBeenCalledWith(GET_ETAS_URL, data, callback);
    });
  });

  describe('getRideTypes', function () {
    var GET_RIDE_TYPES_URL = 'SOME_GET_RIDE_TYPES_URL';
    var callback = 'someCallback';
    var data = 'someData';

    beforeEach(function () {
      api.__set__('GET_RIDE_TYPES_URL', GET_RIDE_TYPES_URL);
      api.__set__('requestWithCredentials', expect.createSpy());
    });

    afterEach(function () {
      api.__get__('requestWithCredentials').reset();
    });

    it('gets ride_types with credentials', function () {
      api.getRideTypes(data, callback);
      expect(api.__get__('requestWithCredentials'))
        .toHaveBeenCalledWith(GET_RIDE_TYPES_URL, data, callback);
    });
  });

  describe('postMessages', function () {
    var POST_MESSAGES_URL = 'SOME_POST_MESSAGES_URL';
    var callback = 'someCallback';
    var data = 'someData';

    beforeEach(function () {
      api.__set__('POST_MESSAGES_URL', POST_MESSAGES_URL);
      api.__set__('requestWithCredentials', expect.createSpy());
    });

    afterEach(function () {
      api.__get__('requestWithCredentials').reset();
    });

    it('posts messages with credentials', function () {
      api.postMessages(data, callback);
      expect(api.__get__('requestWithCredentials'))
        .toHaveBeenCalledWith(POST_MESSAGES_URL, data, callback);
    });
  });
});
