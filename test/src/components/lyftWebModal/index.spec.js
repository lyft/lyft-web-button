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

});
