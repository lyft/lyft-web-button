// dependencies (require)
var expect = require('expect');
var rewire = require('rewire');

// dependencies (rewire)
var jsonp = rewire('../../../src/services/jsonp.js');

// tests
describe('jsonp', function () {

  it('exists', function () {
    expect(jsonp).toExist();
  });

  it('exposes some methods', function () {
    expect(typeof jsonp.request).toEqual('function');
  });

  it('hides some methods', function () {
    expect(typeof jsonp.__get__('injectScript')).toEqual('function');
    expect(typeof jsonp.__get__('serialize')).toEqual('function');
  });

  describe('request', function () {

    beforeEach(function () {
      jsonp.__set__('injectScript', expect.createSpy());
    });

    afterEach(function () {
      jsonp.__get__('injectScript').reset();
    });

    it('throws an exception if the options object is undefined', function () {
      var options = undefined;
      expect(function () {
        jsonp.request(options);
      }).toThrow(TypeError);
    });

    it('does not throw an exception if the options object is well-defined', function () {
      var options = {url: 'someUrl'};
      expect(function () {
        jsonp.request(options);
      }).toNotThrow(TypeError);
    });

    it('injects a script with the given options', function () {
      var options = {
        callback: 'someCallback',
        data: {key2: 'val2'},
        url: 'someUrl?key1=val1'
      };
      jsonp.request(options);
      expect(jsonp.__get__('injectScript')).toHaveBeenCalledWith({
        src: (
          options.url +
          '&callback=' + options.callback +
          '&key2=' + options.data.key2
        )
      });
    });

  });

});
