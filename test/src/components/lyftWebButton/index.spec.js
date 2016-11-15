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

  describe('createElements', function () {

    var rootElementBefore;
    var priceRangeElementBefore;
    var etaElementBefore;

    beforeEach(function () {
      // before
      rootElementBefore = 'rootElementBefore';
      priceRangeElementBefore = 'priceRangeElementBefore';
      etaElementBefore = 'etaElementBefore';
      // spies
      lyftWebButton.__set__('rootElement', rootElementBefore);
      lyftWebButton.__set__('priceRangeElement', priceRangeElementBefore);
      lyftWebButton.__set__('etaElement', etaElementBefore);
      expect.spyOn(lyftWebButton.__get__('selector'), 'selectChildElement');
    });

    afterEach(function () {
      rootElementBefore = undefined;
      priceRangeElementBefore = undefined;
      etaElementBefore = undefined;
    });

    it('selects some elements from the template', function () {
      lyftWebButton.__get__('createElements')();
      expect(lyftWebButton.__get__('selector').selectChildElement)
        .toHaveBeenCalled();
    });

    it('sets some references to elements in the template', function () {
      lyftWebButton.__get__('createElements')();
      expect(lyftWebButton.__get__('rootElement'))
        .toNotEqual(rootElementBefore);
      expect(lyftWebButton.__get__('priceRangeElement'))
        .toNotEqual(priceRangeElementBefore);
      expect(lyftWebButton.__get__('etaElement'))
        .toNotEqual(etaElementBefore);
    });

    it('returns the root element from the template', function () {
      var result = lyftWebButton.__get__('createElements')();
      expect(Object.prototype.toString.call(result))
        .toEqual('[object HTMLButtonElement]');
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
        onClick: expect.createSpy(),
        parentElement: {
          childNodes: ['someChildNode'],
          insertBefore: expect.createSpy()
        },
        theme: 'someTheme'
      };
      // spies
      expect.spyOn(lyftWebButton.__get__('api'), 'getCosts');
      expect.spyOn(lyftWebButton.__get__('api'), 'getEtas');
      expect.spyOn(lyftWebButton.__get__('api'), 'setClientId');
      expect.spyOn(lyftWebButton.__get__('api'), 'setClientToken');
      lyftWebButton.__set__('createElements', expect.createSpy());
      lyftWebButton.__set__('bindEvents', expect.createSpy());
      lyftWebButton.__set__('updateContents', expect.createSpy());
      // navigator
      position = {
        coords: {
          latitude: 'someStartLatitude',
          longitude: 'someStartLongitude'
        }
      };
      navigator = navigator || {};
      navigator.geolocation = navigator.geolocation || {};
      navigator.geolocation.getCurrentPosition = function (callback) {
        return callback(position);
      }
      expect.spyOn(navigator.geolocation, 'getCurrentPosition').andCallThrough();
    });

    afterEach(function () {
      options = undefined;
      position = undefined;
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
        }, 'lyftWebButton.onGetCostsSuccess');
    });

    it('successfully queries current position and requests etas', function () {
      lyftWebButton.initialize(options);
      expect(lyftWebButton.__get__('api').getEtas)
        .toHaveBeenCalledWith({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }, 'lyftWebButton.onGetEtasSuccess');
    });

  });

});
