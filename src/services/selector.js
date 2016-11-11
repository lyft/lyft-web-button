/* =================== */
/* Convenience Methods */
/* =================== */

function addClass(element, className) {
    var classList = element.className.split(' ');
    if (classList.indexOf(className) === -1) {classList.push(className);}
    element.className = classList.join(' ');
}

function removeClass(element, className) {
    var classList = element.className.split(' ');
    var classIndex = classList.indexOf(className);
    if (classIndex !== -1) {classList.splice(classIndex, 1);}
    element.className = classList.join(' ');
}

function selectChildElementByAttribute(element, attributeName, attributeValue) {
  var childNodes = element.childNodes || [];
  for (var i = 0, l = childNodes.length; i < l; i++) {
    if (childNodes[i][attributeName] === attributeValue) {
      return childNodes[i];
    }
  }
}

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

/* ===================================== */
/* Publicly-Exposed Properties & Methods */
/* ===================================== */

module.exports = {
  addClass: addClass,
  removeClass: removeClass,
  selectChildElement: selectChildElement
};
