// globals (mocha >> karma >> window)
var afterEach = window.afterEach;
var beforeEach = window.beforeEach;
var describe = window.describe;
var it = window.it;

// dependencies (require)
var expect = require('expect');
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

  describe('createElements', function () {
    var rootElement = {};
    var priceRangeElement = {};
    var etaElement = {};

    beforeEach(function () {
      lyftWebButton.__set__('rootElement', rootElement);
      lyftWebButton.__set__('priceRangeElement', priceRangeElement);
      lyftWebButton.__set__('etaElement', etaElement);
      expect.spyOn(lyftWebButton.__get__('selector'), 'selectChildElement');
    });

    afterEach(function () {
      lyftWebButton.__get__('selector').selectChildElement.reset();
    });

    it('selects some elements from the template', function () {
      lyftWebButton.__get__('createElements')();
      expect(lyftWebButton.__get__('selector').selectChildElement)
        .toHaveBeenCalled();
    });

    it('sets some references to elements in the template', function () {
      lyftWebButton.__get__('createElements')();
      expect(lyftWebButton.__get__('rootElement'))
        .toNotEqual(rootElement);
      expect(lyftWebButton.__get__('priceRangeElement'))
        .toNotEqual(priceRangeElement);
      expect(lyftWebButton.__get__('etaElement'))
        .toNotEqual(etaElement);
    });

    it('returns the root element from the template', function () {
      var result = lyftWebButton.__get__('createElements')();
      expect(Object.prototype.toString.call(result))
        .toEqual('[object HTMLButtonElement]');
    });
  });

  describe('bindEvents', function () {
    var onClick = expect.createSpy();

    it('binds events if element references are defined', function () {
      lyftWebButton.__set__('rootElement', {});
      lyftWebButton.__get__('bindEvents')(onClick);
      expect(lyftWebButton.__get__('rootElement').onclick)
        .toEqual(onClick);
    });

    it('does not bind events if element references are undefined', function () {
      lyftWebButton.__set__('rootElement', undefined);
      lyftWebButton.__get__('bindEvents')(onClick);
      expect(lyftWebButton.__get__('rootElement'))
        .toEqual(undefined);
    });
  });

  describe('updateContents', function () {
    var theme = 'someTheme';

    beforeEach(function () {
      expect.spyOn(lyftWebButton.__get__('selector'), 'addClass');
    });

    afterEach(function () {
      lyftWebButton.__get__('selector').addClass.reset();
    });

    it('updates contents if element references and theme are defined', function () {
      lyftWebButton.__set__('rootElement', {});
      lyftWebButton.__get__('updateContents')(theme);
      expect(lyftWebButton.__get__('selector').addClass)
        .toHaveBeenCalledWith(lyftWebButton.__get__('rootElement'), theme);
    });

    it('does not update contents if element references are undefined', function () {
      lyftWebButton.__set__('rootElement', undefined);
      lyftWebButton.__get__('updateContents')(theme);
      expect(lyftWebButton.__get__('selector').addClass)
        .toNotHaveBeenCalled();
    });

    it('does not update contents if theme is undefined', function () {
      lyftWebButton.__set__('rootElement', {});
      lyftWebButton.__get__('updateContents')(undefined);
      expect(lyftWebButton.__get__('selector').addClass)
        .toNotHaveBeenCalled();
    });
  });

  describe('onGetCostsSuccess', function () {
    it('updates price range if element references and data are defined', function () {
      lyftWebButton.__set__('priceRangeElement', {});
      lyftWebButton.onGetCostsSuccess({
        cost_estimates: [{
          ride_type: 'lyft',
          estimated_cost_cents_min: 100,
          estimated_cost_cents_max: 1000
        }]
      });
      expect(lyftWebButton.__get__('priceRangeElement').textContent)
        .toEqual('$1-10');
    });

    it('ceilings cents to the next whole dollar', function () {
      lyftWebButton.__set__('priceRangeElement', {});
      lyftWebButton.onGetCostsSuccess({
        cost_estimates: [{
          ride_type: 'lyft',
          estimated_cost_cents_min: 101,
          estimated_cost_cents_max: 1099
        }]
      });
      expect(lyftWebButton.__get__('priceRangeElement').textContent)
        .toEqual('$2-11');
    });

    it('does not update price range if element references are undefined', function () {
      lyftWebButton.__set__('priceRangeElement', undefined);
      lyftWebButton.onGetCostsSuccess({
        cost_estimates: [{
          ride_type: 'lyft',
          estimated_cost_cents_min: 100,
          estimated_cost_cents_max: 1000
        }]
      });
      expect(lyftWebButton.__get__('priceRangeElement'))
        .toEqual(undefined);
    });

    it('does not update price range if data is undefined', function () {
      lyftWebButton.__set__('priceRangeElement', {});
      lyftWebButton.onGetCostsSuccess(undefined);
      expect(lyftWebButton.__get__('priceRangeElement'))
        .toEqual({});
    });
  });

  describe('onGetEtasSuccess', function () {
    it('updates eta if element references and data are defined', function () {
      lyftWebButton.__set__('etaElement', {});
      lyftWebButton.__set__('themeSize', '');
      lyftWebButton.onGetEtasSuccess({
        eta_estimates: [{
          ride_type: 'lyft',
          eta_seconds: 60
        }]
      });
      expect(lyftWebButton.__get__('etaElement').textContent)
        .toEqual('Lyft in 1 min');
    });

    it('excludes some text if theme size is "small"', function () {
      lyftWebButton.__set__('etaElement', {});
      lyftWebButton.__set__('themeSize', 'small');
      lyftWebButton.onGetEtasSuccess({
        eta_estimates: [{
          ride_type: 'lyft',
          eta_seconds: 60
        }]
      });
      expect(lyftWebButton.__get__('etaElement').textContent)
        .toEqual('1 min');
    });

    it('ceilings seconds to the next whole minute', function () {
      lyftWebButton.__set__('etaElement', {});
      lyftWebButton.__set__('themeSize', '');
      lyftWebButton.onGetEtasSuccess({
        eta_estimates: [{
          ride_type: 'lyft',
          eta_seconds: 61
        }]
      });
      expect(lyftWebButton.__get__('etaElement').textContent)
        .toEqual('Lyft in 2 min');
    });

    it('does not update eta if element references are undefined', function () {
      lyftWebButton.__set__('etaElement', undefined);
      lyftWebButton.__set__('themeSize', '');
      lyftWebButton.onGetEtasSuccess({
        eta_estimates: [{
          ride_type: 'lyft',
          eta_seconds: 60
        }]
      });
      expect(lyftWebButton.__get__('etaElement'))
        .toEqual(undefined);
    });

    it('does not update eta if data is undefined', function () {
      lyftWebButton.__set__('etaElement', {});
      lyftWebButton.__set__('themeSize', '');
      lyftWebButton.onGetEtasSuccess(undefined);
      expect(lyftWebButton.__get__('etaElement'))
        .toEqual({});
    });
  });

  describe('initialize', function () {
    var options;
    var position;

    beforeEach(function () {
      // options
      options = {
        clientId: 'someClientId',
        clientToken: 'someClientToken',
        location: {
          latitude: 'someEndLatitude',
          longitude: 'someEndLongitude'
        },
        objectName: 'someObjectName',
        onClick: expect.createSpy(),
        parentElement: {
          childNodes: ['someChildNode'],
          insertBefore: expect.createSpy()
        },
        theme: 'themeColor themeSize'
      };
      // navigator
      position = {
        coords: {
          latitude: 'someStartLatitude',
          longitude: 'someStartLongitude'
        }
      };
      // eslint-disable-next-line no-native-reassign
      navigator = navigator || {};
      navigator.geolocation = navigator.geolocation || {};
      navigator.geolocation.getCurrentPosition = function (callback) {
        return callback(position);
      };
      expect.spyOn(navigator.geolocation, 'getCurrentPosition').andCallThrough();
      // spies
      expect.spyOn(lyftWebButton.__get__('api'), 'getCosts');
      expect.spyOn(lyftWebButton.__get__('api'), 'getEtas');
      expect.spyOn(lyftWebButton.__get__('api'), 'setClientId');
      expect.spyOn(lyftWebButton.__get__('api'), 'setClientToken');
      lyftWebButton.__set__('createElements', expect.createSpy());
      lyftWebButton.__set__('bindEvents', expect.createSpy());
      lyftWebButton.__set__('updateContents', expect.createSpy());
    });

    afterEach(function () {
      // options
      options = undefined;
      // navigator
      position = undefined;
      navigator.geolocation.getCurrentPosition.reset();
      // spies
      lyftWebButton.__get__('api').getCosts.reset();
      lyftWebButton.__get__('api').getEtas.reset();
      lyftWebButton.__get__('api').setClientId.reset();
      lyftWebButton.__get__('api').setClientToken.reset();
      lyftWebButton.__get__('createElements').reset();
      lyftWebButton.__get__('bindEvents').reset();
      lyftWebButton.__get__('updateContents').reset();
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

    it('sets themeSize', function () {
      lyftWebButton.initialize(options);
      expect(lyftWebButton.__get__('themeSize'))
        .toEqual('themeSize');
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

    it('inserts an element tree into the DOM', function () {
      lyftWebButton.initialize(options);
      expect(options.parentElement.insertBefore)
        .toHaveBeenCalledWith(
          lyftWebButton.__get__('rootElement'),
          options.parentElement.childNodes[0]
        );
    });

    it('queries current position', function () {
      lyftWebButton.initialize(options);
      expect(navigator.geolocation.getCurrentPosition)
        .toHaveBeenCalled();
    });

    it('successfully queries current position and requests costs', function () {
      lyftWebButton.initialize(options);
      expect(lyftWebButton.__get__('api').getCosts)
        .toHaveBeenCalledWith({
          start_lat: position.coords.latitude,
          start_lng: position.coords.longitude,
          end_lat: options.location.latitude,
          end_lng: options.location.longitude
        }, (options.objectName + '.onGetCostsSuccess'));
    });

    it('does not request costs when themeSize is "small"', function () {
      options.theme = 'themeColor small';
      lyftWebButton.initialize(options);
      expect(lyftWebButton.__get__('api').getCosts)
        .toNotHaveBeenCalled();
    });

    it('successfully queries current position and requests etas', function () {
      lyftWebButton.initialize(options);
      expect(lyftWebButton.__get__('api').getEtas)
        .toHaveBeenCalledWith({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }, (options.objectName + '.onGetEtasSuccess'));
    });
  });
});
