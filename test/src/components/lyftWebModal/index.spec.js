// globals (mocha >> karma >> window)
var afterEach = window.afterEach;
var beforeEach = window.beforeEach;
var describe = window.describe;
var it = window.it;

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

  describe('createElements', function () {
    var rootElement = {};
    var closeElement = {};
    var mapElement = {};
    var mapLabelNameElement = {};
    var mapLabelDescriptionElement = {};
    var frameBefore = {};
    var messageFormElement = {};
    var messageFormInputElement = {};
    var openAppCtaElement = {};
    var frameAfter = {};
    var frameAfterTextHeaderElement = {};

    beforeEach(function () {
      lyftWebModal.__set__('rootElement', rootElement);
      lyftWebModal.__set__('closeElement', closeElement);
      lyftWebModal.__set__('mapElement', mapElement);
      lyftWebModal.__set__('mapLabelNameElement', mapLabelNameElement);
      lyftWebModal.__set__('mapLabelDescriptionElement', mapLabelDescriptionElement);
      lyftWebModal.__set__('frameBefore', frameBefore);
      lyftWebModal.__set__('messageFormElement', messageFormElement);
      lyftWebModal.__set__('messageFormInputElement', messageFormInputElement);
      lyftWebModal.__set__('openAppCtaElement', openAppCtaElement);
      lyftWebModal.__set__('frameAfter', frameAfter);
      lyftWebModal.__set__('frameAfterTextHeaderElement', frameAfterTextHeaderElement);
      expect.spyOn(lyftWebModal.__get__('selector'), 'selectChildElement');
    });

    afterEach(function () {
      lyftWebModal.__get__('selector').selectChildElement.reset();
    });

    it('selects some elements from the template', function () {
      lyftWebModal.__get__('createElements')();
      expect(lyftWebModal.__get__('selector').selectChildElement)
        .toHaveBeenCalled();
    });

    it('sets some references to elements in the template', function () {
      lyftWebModal.__get__('createElements')();
      expect(lyftWebModal.__get__('rootElement'))
        .toNotEqual(rootElement);
      expect(lyftWebModal.__get__('closeElement'))
        .toNotEqual(closeElement);
      expect(lyftWebModal.__get__('mapElement'))
        .toNotEqual(mapElement);
      expect(lyftWebModal.__get__('mapLabelNameElement'))
        .toNotEqual(mapLabelNameElement);
      expect(lyftWebModal.__get__('mapLabelDescriptionElement'))
        .toNotEqual(mapLabelDescriptionElement);
      expect(lyftWebModal.__get__('frameBefore'))
        .toNotEqual(frameBefore);
      expect(lyftWebModal.__get__('messageFormElement'))
        .toNotEqual(messageFormElement);
      expect(lyftWebModal.__get__('messageFormInputElement'))
        .toNotEqual(messageFormInputElement);
      expect(lyftWebModal.__get__('openAppCtaElement'))
        .toNotEqual(openAppCtaElement);
      expect(lyftWebModal.__get__('frameAfter'))
        .toNotEqual(frameAfter);
      expect(lyftWebModal.__get__('frameAfterTextHeaderElement'))
        .toNotEqual(frameAfterTextHeaderElement);
    });

    it('returns the root element from the template', function () {
      var result = lyftWebModal.__get__('createElements')();
      expect(Object.prototype.toString.call(result))
        .toEqual('[object HTMLDivElement]');
    });
  });

  describe('bindEvents', function () {
    it('binds an event to rootElement if rootElement is defined', function () {
      lyftWebModal.__set__('rootElement', {});
      lyftWebModal.__get__('bindEvents')();
      expect(typeof lyftWebModal.__get__('rootElement').onclick)
        .toEqual('function');
    });

    it('does not bind an event to rootElement if rootElement is undefined', function () {
      lyftWebModal.__set__('rootElement', undefined);
      lyftWebModal.__get__('bindEvents')();
      expect(lyftWebModal.__get__('rootElement'))
        .toEqual(undefined);
    });

    it('binds an event to closeElement if closeElement is defined', function () {
      lyftWebModal.__set__('closeElement', {});
      lyftWebModal.__get__('bindEvents')();
      expect(typeof lyftWebModal.__get__('closeElement').onclick)
        .toEqual('function');
    });

    it('does not bind an event to closeElement if closeElement is undefined', function () {
      lyftWebModal.__set__('closeElement', undefined);
      lyftWebModal.__get__('bindEvents')();
      expect(lyftWebModal.__get__('closeElement'))
        .toEqual(undefined);
    });

    it('binds an event to messageFormElement if messageFormElement is defined', function () {
      lyftWebModal.__set__('messageFormElement', {});
      lyftWebModal.__get__('bindEvents')();
      expect(typeof lyftWebModal.__get__('messageFormElement').onsubmit)
        .toEqual('function');
    });

    it('does not bind an event to messageFormElement if messageFormElement is undefined', function () {
      lyftWebModal.__set__('messageFormElement', undefined);
      lyftWebModal.__get__('bindEvents')();
      expect(lyftWebModal.__get__('messageFormElement'))
        .toEqual(undefined);
    });
  });

  describe('updateContents', function () {
    var googleApiKey = 'someGoogleApiKey';
    var mockLocation = {
      address: 'someAddress',
      latitude: 'someLatitude',
      longitude: 'someLongitude',
      name: 'someName'
    };

    it('updates mapElement contents if mapElement is defined', function () {
      lyftWebModal.__set__('mapElement', {});
      lyftWebModal.__get__('updateContents')(googleApiKey, mockLocation);
      expect(lyftWebModal.__get__('mapElement').style.indexOf(googleApiKey))
        .toNotEqual(-1);
      expect(lyftWebModal.__get__('mapElement').style.indexOf(mockLocation.latitude))
        .toNotEqual(-1);
      expect(lyftWebModal.__get__('mapElement').style.indexOf(mockLocation.longitude))
        .toNotEqual(-1);
    });

    it('does not update mapElement contents if mapElement is undefined', function () {
      lyftWebModal.__set__('mapElement', undefined);
      lyftWebModal.__get__('updateContents')(googleApiKey, mockLocation);
      expect(lyftWebModal.__get__('mapElement'))
        .toEqual(undefined);
    });

    it('updates mapLabelNameElement contents if mapLabelNameElement is defined', function () {
      lyftWebModal.__set__('mapLabelNameElement', {});
      lyftWebModal.__get__('updateContents')(googleApiKey, mockLocation);
      expect(lyftWebModal.__get__('mapLabelNameElement').textContent)
        .toEqual(mockLocation.name);
    });

    it('does not update mapLabelNameElement contents if mapLabelNameElement is undefined', function () {
      lyftWebModal.__set__('mapLabelNameElement', undefined);
      lyftWebModal.__get__('updateContents')(googleApiKey, mockLocation);
      expect(lyftWebModal.__get__('mapLabelNameElement'))
        .toEqual(undefined);
    });

    it('updates mapLabelDescriptionElement contents if mapLabelDescriptionElement is defined', function () {
      lyftWebModal.__set__('mapLabelDescriptionElement', {});
      lyftWebModal.__get__('updateContents')(googleApiKey, mockLocation);
      expect(lyftWebModal.__get__('mapLabelDescriptionElement').textContent)
        .toEqual(mockLocation.address);
    });

    it('does not update mapLabelDescriptionElement contents if mapLabelDescriptionElement is undefined', function () {
      lyftWebModal.__set__('mapLabelDescriptionElement', undefined);
      lyftWebModal.__get__('updateContents')(googleApiKey, mockLocation);
      expect(lyftWebModal.__get__('mapLabelDescriptionElement'))
        .toEqual(undefined);
    });

    it('updates openAppCtaElement contents if openAppCtaElement is defined', function () {
      lyftWebModal.__set__('openAppCtaElement', {});
      lyftWebModal.__get__('updateContents')(googleApiKey, mockLocation);
      expect(lyftWebModal.__get__('openAppCtaElement').href.indexOf(mockLocation.latitude))
        .toNotEqual(-1);
      expect(lyftWebModal.__get__('openAppCtaElement').href.indexOf(mockLocation.longitude))
        .toNotEqual(-1);
    });

    it('does not update openAppCtaElement contents if openAppCtaElement is undefined', function () {
      lyftWebModal.__set__('openAppCtaElement', undefined);
      lyftWebModal.__get__('updateContents')(googleApiKey, mockLocation);
      expect(lyftWebModal.__get__('openAppCtaElement'))
        .toEqual(undefined);
    });
  });

  describe('onPostMessagesSuccess', function () {
    var value = 'someValue';

    beforeEach(function () {
      expect.spyOn(lyftWebModal.__get__('selector'), 'removeClass');
      expect.spyOn(lyftWebModal.__get__('selector'), 'addClass');
    });

    afterEach(function () {
      lyftWebModal.__get__('selector').removeClass.reset();
      lyftWebModal.__get__('selector').addClass.reset();
    });

    it('updates the user interface if data is truthy', function () {
      lyftWebModal.__set__('messageFormInputElement', {value: value});
      lyftWebModal.__set__('frameAfterTextHeaderElement', {});
      lyftWebModal.__set__('frameBefore', {className: 'frame-before on'});
      lyftWebModal.__set__('frameAfter', {className: 'frame-after'});
      lyftWebModal.onPostMessagesSuccess({messages: true});
      expect(lyftWebModal.__get__('frameAfterTextHeaderElement').textContent.indexOf(value))
        .toNotEqual(-1);
      expect(lyftWebModal.__get__('selector').removeClass)
        .toHaveBeenCalledWith(lyftWebModal.__get__('frameBefore'), 'on');
      expect(lyftWebModal.__get__('selector').addClass)
        .toHaveBeenCalledWith(lyftWebModal.__get__('frameAfter'), 'on');
    });

    it('does not update the user interface if data is falsey', function () {
      lyftWebModal.__set__('messageFormInputElement', {value: value});
      lyftWebModal.__set__('frameAfterTextHeaderElement', {});
      lyftWebModal.__set__('frameBefore', {className: 'frame-before on'});
      lyftWebModal.__set__('frameAfter', {className: 'frame-after'});
      lyftWebModal.onPostMessagesSuccess({messages: false});
      expect(lyftWebModal.__get__('frameAfterTextHeaderElement').textContent)
        .toEqual(undefined);
      expect(lyftWebModal.__get__('selector').removeClass)
        .toNotHaveBeenCalled();
      expect(lyftWebModal.__get__('selector').addClass)
        .toNotHaveBeenCalled();
    });

    it('updates the style of the frames', function (done) {
      lyftWebModal.__set__('messageFormInputElement', {value: value});
      lyftWebModal.__set__('frameAfterTextHeaderElement', {});
      lyftWebModal.__set__('frameBefore', {className: 'frame-before on'});
      lyftWebModal.__set__('frameAfter', {className: 'frame-after'});
      lyftWebModal.onPostMessagesSuccess({messages: true});
      setTimeout(function () {
        expect(lyftWebModal.__get__('frameBefore').style)
          .toNotEqual(undefined);
        expect(lyftWebModal.__get__('frameAfter').style)
          .toNotEqual(undefined);
        done();
      }, 500);
    });
  });

  describe('open', function () {
    var parentElement;

    beforeEach(function () {
      parentElement = {
        childNodes: ['someChildNode'],
        insertBefore: expect.createSpy()
      };
      lyftWebModal.__set__('parentElement', parentElement);
      expect.spyOn(lyftWebModal.__get__('selector'), 'addClass');
    });

    afterEach(function () {
      parentElement = undefined;
      lyftWebModal.__get__('selector').addClass.reset();
    });

    it('inserts the template into the DOM', function () {
      lyftWebModal.__set__('rootElement', {className: 'rootElement'});
      lyftWebModal.open();
      expect(parentElement.insertBefore)
        .toHaveBeenCalledWith(
          lyftWebModal.__get__('rootElement'),
          parentElement.childNodes[0]
        );
    });

    it('adds a class to rootElement', function (done) {
      lyftWebModal.__set__('rootElement', {className: 'rootElement'});
      lyftWebModal.open();
      setTimeout(function () {
        expect(lyftWebModal.__get__('selector').addClass)
          .toHaveBeenCalledWith(lyftWebModal.__get__('rootElement'), 'on');
        done();
      }, 110);
    });
  });

  describe('close', function () {
    beforeEach(function () {
      expect.spyOn(lyftWebModal.__get__('selector'), 'removeClass');
    });

    afterEach(function () {
      lyftWebModal.__get__('selector').removeClass.reset();
    });

    it('removes a class from rootElement', function () {
      lyftWebModal.__set__('rootElement', {className: 'rootElement on'});
      lyftWebModal.close();
      expect(lyftWebModal.__get__('selector').removeClass)
        .toHaveBeenCalledWith(lyftWebModal.__get__('rootElement'), 'on');
    });

    it('removes rootElement from the DOM', function (done) {
      lyftWebModal.__set__('rootElement', {
        className: 'rootElement',
        parentElement: {
          removeChild: expect.createSpy()
        }
      });
      lyftWebModal.close();
      setTimeout(function () {
        expect(lyftWebModal.__get__('rootElement').parentElement.removeChild)
          .toHaveBeenCalledWith(lyftWebModal.__get__('rootElement'));
        done();
      }, 500);
    });
  });

  describe('initialize', function () {
    var options = {
      clientId: 'someClientId',
      clientToken: 'someClientToken',
      googleApiKey: 'someGoogleApiKey',
      location: {
        latitude: 'someEndLatitude',
        longitude: 'someEndLongitude'
      },
      objectName: 'someObjectName',
      parentElement: 'someParentElement'
    };

    beforeEach(function () {
      expect.spyOn(lyftWebModal.__get__('api'), 'setClientId');
      expect.spyOn(lyftWebModal.__get__('api'), 'setClientToken');
      lyftWebModal.__set__('createElements', expect.createSpy());
      lyftWebModal.__set__('bindEvents', expect.createSpy());
      lyftWebModal.__set__('updateContents', expect.createSpy());
    });

    afterEach(function () {
      lyftWebModal.__get__('api').setClientId.reset();
      lyftWebModal.__get__('api').setClientToken.reset();
      lyftWebModal.__get__('createElements').reset();
      lyftWebModal.__get__('bindEvents').reset();
      lyftWebModal.__get__('updateContents').reset();
    });

    it('sets parentElement', function () {
      lyftWebModal.initialize(options);
      expect(lyftWebModal.__get__('parentElement'))
        .toEqual(options.parentElement);
    });

    it('sets client_id', function () {
      lyftWebModal.initialize(options);
      expect(lyftWebModal.__get__('api').setClientId)
        .toHaveBeenCalledWith(options.clientId);
    });

    it('sets client_token', function () {
      lyftWebModal.initialize(options);
      expect(lyftWebModal.__get__('api').setClientToken)
        .toHaveBeenCalledWith(options.clientToken);
    });

    it('creates elements', function () {
      lyftWebModal.initialize(options);
      expect(lyftWebModal.__get__('createElements'))
        .toHaveBeenCalled();
    });

    it('binds events', function () {
      lyftWebModal.initialize(options);
      expect(lyftWebModal.__get__('bindEvents'))
        .toHaveBeenCalledWith(options.location, options.objectName);
    });

    it('updates contents', function () {
      lyftWebModal.initialize(options);
      expect(lyftWebModal.__get__('updateContents'))
        .toHaveBeenCalledWith(options.googleApiKey, options.location);
    });
  });
});
