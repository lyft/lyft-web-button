// globals (mocha >> karma >> window)
var afterEach = window.afterEach;
var beforeEach = window.beforeEach;
var describe = window.describe;
var it = window.it;

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

  describe('injectScript', function () {
    var mockDocument;
    var mockHead;
    var mockScript;

    beforeEach(function () {
      mockHead = {
        childNodes: ['someChildNode'],
        insertBefore: expect.createSpy(),
        removeChild: expect.createSpy()
      };
      mockScript = {
        parentNode: 'someParentNode'
      };
      mockDocument = {
        createElement: expect.createSpy().andReturn(mockScript),
        getElementsByTagName: expect.createSpy().andReturn([mockHead])
      };
      jsonp.__set__('document', mockDocument);
    });

    afterEach(function () {
      mockHead = undefined;
      mockScript = undefined;
      mockDocument = undefined;
    });

    it('throws an exception if the options object is undefined', function () {
      // eslint-disable-next-line no-undef-init
      var options = undefined;
      expect(function () {
        jsonp.__get__('injectScript')(options);
      }).toThrow(TypeError);
    });

    it('throws an exception if the src is undefined', function () {
      var options = {src: undefined};
      expect(function () {
        jsonp.__get__('injectScript')(options);
      }).toThrow(TypeError);
    });

    it('sets some script attributes from the given options', function () {
      var options = {
        async: 'someAsync',
        callback: expect.createSpy(),
        defer: 'someDefer',
        src: 'someSrc'
      };
      jsonp.__get__('injectScript')(options);
      expect(mockScript.async)
        .toEqual(options.async);
      expect(mockScript.defer)
        .toEqual(options.defer);
      expect(mockScript.src)
        .toEqual(options.src);
    });

    it('sets some script attributes from default values', function () {
      var options = {
        callback: expect.createSpy(),
        src: 'someSrc'
      };
      jsonp.__get__('injectScript')(options);
      expect(mockScript.async)
        .toNotEqual(undefined);
      expect(mockScript.defer)
        .toNotEqual(undefined);
    });

    it('assigns an onload event handler to the script', function () {
      var options = {
        callback: expect.createSpy(),
        src: 'someSrc'
      };
      jsonp.__get__('injectScript')(options);
      expect(typeof mockScript.onload)
        .toEqual('function');
    });

    it('invokes the given callback during the onload event handler', function () {
      var options = {
        callback: expect.createSpy(),
        src: 'someSrc'
      };
      jsonp.__get__('injectScript')(options);
      var event = 'someEvent';
      mockScript.onload(event);
      expect(options.callback)
        .toHaveBeenCalledWith(event);
    });

    it('nullifies the onload event handler after invoking the callback', function () {
      var options = {
        callback: expect.createSpy(),
        src: 'someSrc'
      };
      jsonp.__get__('injectScript')(options);
      mockScript.onload();
      expect(mockScript.onload)
        .toEqual(null);
    });

    it('removes the script element from the document head after nullifying the onload event handler', function () {
      var options = {
        callback: expect.createSpy(),
        src: 'someSrc'
      };
      jsonp.__get__('injectScript')(options);
      mockScript.onload();
      expect(mockHead.removeChild)
        .toHaveBeenCalledWith(mockScript);
    });

    it('inserts the script element into the document head', function () {
      var options = {
        callback: expect.createSpy(),
        src: 'someSrc'
      };
      jsonp.__get__('injectScript')(options);
      expect(mockHead.insertBefore)
        .toHaveBeenCalledWith(mockScript, mockHead.childNodes[0]);
    });
  });

  describe('serialize', function () {
    it('returns an empty string when the given object is ill-defined', function () {
      var inputs = [undefined, null, {}, []];
      for (var i = 0, l = inputs.length; i < l; i++) {
        expect(jsonp.__get__('serialize')(inputs[i]))
          .toEqual('');
      }
    });

    it('serializes a simple object to a query parameter string', function () {
      var someObj = {key: 'val'};
      var result = jsonp.__get__('serialize')(someObj);
      expect(result)
        .toEqual('key=val');
    });

    it('serializes a complex object to a query parameter string', function () {
      var someObj = {key1: 'val1', key2: {key3: 'val3'}};
      var result = jsonp.__get__('serialize')(someObj);
      expect(result)
        .toEqual('key1=val1&key2%5Bkey3%5D=val3');
    });

    it('serializes an array to a query parameter string', function () {
      var someObj = {key1: ['val0', 'val1']};
      var result = jsonp.__get__('serialize')(someObj);
      expect(result)
        .toEqual('key1%5B0%5D=val0&key1%5B1%5D=val1');
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
      // eslint-disable-next-line no-undef-init
      var options = undefined;
      expect(function () {
        jsonp.request(options);
      }).toThrow(TypeError);
    });

    it('throws an exception if the src is undefined', function () {
      var options = {src: undefined};
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
