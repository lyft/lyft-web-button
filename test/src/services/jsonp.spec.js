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

  describe('serialize', function () {

    it('returns an empty string when the given object is ill-defined', function () {
      var inputs = [undefined, null, {}, []];
      for (var i = 0, l = inputs.length; i < l; i++) {
        expect(jsonp.__get__('serialize')(inputs[i])).toEqual('');
      }
    });

    it('serializes a simple object to a query parameter string', function () {
      var someObj = {key: 'val'};
      var result = jsonp.__get__('serialize')(someObj);
      expect(result).toEqual('key=val');
    });

    it('serializes a complex object to a query parameter string', function () {
      var someObj = {key1: 'val1', key2: {key3: 'val3'}};
      var result = jsonp.__get__('serialize')(someObj);
      expect(result).toEqual('key1=val1&key2%5Bkey3%5D=val3');
    });

    it('serializes an array to a query parameter string', function () {
      var someObj = {key1: ['val0', 'val1']};
      var result = jsonp.__get__('serialize')(someObj);
      expect(result).toEqual('key1%5B0%5D=val0&key1%5B1%5D=val1');
    });

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
