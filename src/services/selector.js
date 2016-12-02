/**
 * Adds a class to an element.
 * @memberOf selector
 * @category selector
 * @param {Object} element Required.
 * @param {string} className Required.
 * @returns {void} Void.
 */
function addClass(element, className) {
  var classList = element.className.split(' ');
  if (classList.indexOf(className) === -1) {classList.push(className);}
  element.className = classList.join(' ');
}

/**
 * Removes a class from an element.
 * @memberOf selector
 * @category selector
 * @param {Object} element Required.
 * @param {string} className Required.
 * @returns {void} Void.
 */
function removeClass(element, className) {
  var classList = element.className.split(' ');
  var classIndex = classList.indexOf(className);
  if (classIndex !== -1) {classList.splice(classIndex, 1);}
  element.className = classList.join(' ');
}

/**
 * Selects a single child element from a given element according to some criteria.
 * @memberOf selector
 * @category selector
 * @param {Object} element The parent element from which the child will be selected.
 * @param {string} attributeName Name of the attribute for selection.
 * @param {string} attributeValue Value of the named attribute for selection.
 * @returns {Object} The selected element.
 */
function selectChildElementByAttribute(element, attributeName, attributeValue) {
  var childNodes = element.childNodes || [];
  for (var i = 0, l = childNodes.length; i < l; i++) {
    if (childNodes[i][attributeName] === attributeValue) {
      return childNodes[i];
    }
  }
}

/**
 * Selects a single child element from an element tree according to some criteria.
 * @memberOf selector
 * @category selector
 * @param {Object} element The top level of the element tree.
 * @param {Array} attributes Strings describing the selection criteria.
 * @returns {Object} The selected element.
 */
function selectChildElement(element, attributes) {
  var currentElement = element;
  for (var i = 0, l = attributes.length; i < l; i++) {
    if (!currentElement || !attributes[i].length) {return;}  /* short-circuit on failure */
    var attributeName = (attributes[i][0] === '.') ? 'className' : 'id';
    var attributeValue = attributes[i].slice(1);
    currentElement = selectChildElementByAttribute(currentElement, attributeName, attributeValue);
  }
  return currentElement;
}

// exports
module.exports = {
  addClass: addClass,
  removeClass: removeClass,
  selectChildElement: selectChildElement
};
