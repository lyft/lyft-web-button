// dependencies (require)
var expect = require('expect');
var rewire = require('rewire');

// dependencies (rewire)
var selector = rewire('../../../src/services/selector.js');

// tests
describe('selector', function () {

  it('exists', function () {
    expect(selector).toExist();
  });

  it('exposes some methods', function () {
    expect(typeof selector.addClass).toEqual('function');
    expect(typeof selector.removeClass).toEqual('function');
    expect(typeof selector.selectChildElement).toEqual('function');
  });

  it('hides some methods', function () {
    expect(typeof selector.__get__('selectChildElementByAttribute')).toEqual('function');
  });

  describe('addClass', function () {

    it('adds a class to an element with existing classes', function () {
      var className = 'new-class';
      var element = {className: 'existing-class'};
      selector.addClass(element, className);
      expect(element.className.indexOf(className))
        .toNotEqual(-1);
    });

    it('adds a class to an element without existing classes', function () {
      var className = 'new-class';
      var element = {className: ''};
      selector.addClass(element, className);
      expect(element.className.indexOf(className))
        .toNotEqual(-1);
    });

  });

  describe('removeClass', function () {

    it('removes a class from an element with multiple existing classes', function () {
      var className = 'remove-class';
      var element = {className: 'remove-class keep-class'};
      selector.removeClass(element, className);
      expect(element.className.indexOf(className))
        .toEqual(-1);
    });

    it('removes a class from an element with a single existing class', function () {
      var className = 'remove-class';
      var element = {className: 'remove-class'};
      selector.removeClass(element, className);
      expect(element.className.indexOf(className))
        .toEqual(-1);
    });

    it('does not remove anything if the class is not present on the element', function () {
      var className = 'remove-class';
      var element = {className: 'keep-class'};
      selector.removeClass(element, className);
      expect(element.className)
        .toEqual('keep-class');
    });

  });

});
