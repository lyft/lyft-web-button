// globals (mocha >> karma >> window)
var describe = window.describe;
var it = window.it;

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

  describe('selectChildElementByAttribute', function () {
    var attributeName = 'someAttributeName';
    var attributeValue = 'someAttributeValue';

    it('selects a child element by attribute if a matching child is present', function () {
      var element = {childNodes: [{}]};
      element.childNodes[0][attributeName] = attributeValue;
      var result = selector.__get__('selectChildElementByAttribute')(element, attributeName, attributeValue);
      expect(result).toEqual(element.childNodes[0]);
    });

    it('selects the first matching child element if multiple matches are present', function () {
      var element = {childNodes: [{key1: 'val1'}, {key2: 'val2'}]};
      element.childNodes[0][attributeName] = attributeValue;
      element.childNodes[1][attributeName] = attributeValue;
      var result = selector.__get__('selectChildElementByAttribute')(element, attributeName, attributeValue);
      expect(result).toEqual(element.childNodes[0]);
      expect(result).toNotEqual(element.childNodes[1]);
    });

    it('does not select a non-matching child element', function () {
      var element = {childNodes: [{}, {}]};
      element.childNodes[1][attributeName] = attributeValue;
      var result = selector.__get__('selectChildElementByAttribute')(element, attributeName, attributeValue);
      expect(result).toNotEqual(element.childNodes[0]);
      expect(result).toEqual(element.childNodes[1]);
    });

    it('selects nothing if the element has no child nodes', function () {
      var element = {childNodes: []};
      var result = selector.__get__('selectChildElementByAttribute')(element, attributeName, attributeValue);
      expect(result).toEqual(undefined);
    });

    it('selects nothing if the element has no matching child nodes', function () {
      var element = {childNodes: [{}]};
      element.childNodes[0][attributeName] = 'wrongAttributeValue';
      var result = selector.__get__('selectChildElementByAttribute')(element, attributeName, attributeValue);
      expect(result).toEqual(undefined);
    });
  });

  describe('selectChildElement', function () {
    it('selects a child element by className if the "." prefix is given', function () {
      var element = {
        childNodes: [{
          className: 'some-class',
          id: 'some-id'
        }]
      };
      var result = selector.selectChildElement(element, ['.some-class']);
      expect(result).toEqual(element.childNodes[0]);
    });

    it('selects a child element by id if the "." prefix is not given', function () {
      var element = {
        childNodes: [{
          className: 'some-class',
          id: 'some-id'
        }]
      };
      var result = selector.selectChildElement(element, ['#some-id']);
      expect(result).toEqual(element.childNodes[0]);
    });

    it('selects a nested child element by attribute if a matching child is present', function () {
      var element = {
        childNodes: [{
          className: 'some-class-1',
          childNodes: [{
            className: 'some-class-2',
            childNodes: [{
              id: 'some-id-3'
            }]
          }]
        }]
      };
      var result = selector.selectChildElement(element, ['.some-class-1', '.some-class-2', '#some-id-3']);
      expect(result).toEqual(element.childNodes[0].childNodes[0].childNodes[0]);
    });

    it('selects nothing if a matching child is not present', function () {
      var element = {
        childNodes: [{
          className: 'wrong-class'
        }]
      };
      var result = selector.selectChildElement(element, ['.some-class']);
      expect(result).toEqual(undefined);
    });

    it('selects nothing if the parent has no child nodes', function () {
      var element = {
        childNodes: []
      };
      var result = selector.selectChildElement(element, ['.some-class']);
      expect(result).toEqual(undefined);
    });
  });
});
