// dependencies
var api = require('../../services/api.js');
var selector = require('../../services/selector.js');

// styles
require('./index.css');

/* ========== */
/* Properties */
/* ========== */

var closeElement;
var frameAfter;
var frameAfterTextHeaderElement;
var frameBefore;
var mapElement;
var mapLabelDescriptionElement;
var mapLabelNameElement;
var messageFormElement;
var messageFormInputElement;
var openAppCtaElement;
var parentElement;
var rootElement;

/* ======================== */
/* DOM Manipulation Methods */
/* ======================== */

/**
 * Creates elements from a template and stores some useful references.
 * @memberOf lyftWebModal
 * @category lyftWebModal
 * @returns {Object} Template's root element.
 */
function createElements() {
  // create tree from template
  var template = document.createElement('div');
  template.innerHTML = require('./index.html');
  // store references to important elements
  rootElement =
    template.childNodes[0];
  closeElement =
    selector.selectChildElement(rootElement, ['.footer', '.close']);
  mapElement =
    selector.selectChildElement(rootElement, ['.content', '.map-container']);
  mapLabelNameElement =
    selector.selectChildElement(mapElement, ['.map-label', '.map-label-name']);
  mapLabelDescriptionElement =
    selector.selectChildElement(mapElement, ['.map-label', '.map-label-description']);
  frameBefore =
    selector.selectChildElement(rootElement, ['.content', '.frame-container', '.frame-before on']);
  messageFormElement =
    selector.selectChildElement(frameBefore, ['.message-form-container', '.message-form']);
  messageFormInputElement =
    selector.selectChildElement(messageFormElement, ['.message-form-input']);
  openAppCtaElement =
    selector.selectChildElement(frameBefore, ['.open-app-container', '.open-app-cta']);
  frameAfter =
    selector.selectChildElement(rootElement, ['.content', '.frame-container', '.frame-after']);
  frameAfterTextHeaderElement =
    selector.selectChildElement(frameAfter, ['.text-container', '.text-header']);
  // return reference to root element
  return rootElement;
}

/**
 * Binds events to some elements.
 * @memberOf lyftWebModal
 * @category lyftWebModal
 * @param {Object} location Location of the intended destination.
 * @param {string} location.address
 * @param {string} location.latitude
 * @param {string} location.longitude
 * @param {string} location.name
 * @param {string} objectName This instance's name in the global namespace.
 * @returns {void} Void.
 */
function bindEvents(location, objectName) {
  location = location || {};
  // root element: close modal window on click
  if (rootElement) {
    rootElement.onclick = function (event) {
      if (event && event.target === rootElement) {
        close();
        return false;
      }
      return true;
    };
  }
  // close element: close modal window on click
  if (closeElement) {
    closeElement.onclick = function (event) {
      if (event && event.target === closeElement) {
        close();
        return false;
      }
      return true;
    };
  }
  // message form element: request JSONP on submit
  if (messageFormElement) {
    messageFormElement.onsubmit = function () {
      api.postMessages({
        phone_number: messageFormInputElement.value,
        end_lat: location.latitude,
        end_lng: location.longitude
      }, (objectName + '.onPostMessagesSuccess'));
      return false;
    };
  }
}

/**
 * Updates the contents of some elements.
 * @memberOf lyftWebModal
 * @category lyftWebModal
 * @param {string} googleApiKey API key for Google Static Maps.
 * @param {Object} location Location of the intended destination.
 * @param {string} location.address
 * @param {string} location.latitude
 * @param {string} location.longitude
 * @param {string} location.name
 * @returns {void} Void.
 */
function updateContents(googleApiKey, location) {
  location = location || {};
  // map-container: set background-image
  if (mapElement) {
    var mapSrc = 'https://maps.googleapis.com/maps/api/staticmap' +
      '?center=' + location.latitude + ',' + location.longitude +
      '&maptype=roadmap&size=640x300&zoom=15' +
      (googleApiKey ? ('&key=' + googleApiKey) : '');
    mapElement.style = 'background-image:url(\'' + mapSrc + '\');';
  }
  // map-label-name: set text
  if (mapLabelNameElement) {
    mapLabelNameElement.textContent = location.name;
  }
  // map-label-description: set text
  if (mapLabelDescriptionElement) {
    mapLabelDescriptionElement.textContent = location.address;
  }
  // open-app-cta: set href
  if (openAppCtaElement) {
    openAppCtaElement.href = 'https://lyft.com/ride?id=lyft' +
      '&destination%5Blatitude%5D=' + location.latitude +
      '&destination%5Blongitude%5D=' + location.longitude;
  }
}

/* ================ */
/* Workflow Methods */
/* ================ */

/**
 * Success callback for postMessages request.
 * @memberOf lyftWebModal
 * @category lyftWebModal
 * @param {Object} data Response data.
 * @returns {void} Void.
 */
function onPostMessagesSuccess(data) {
  if (data && data.messages) {
    frameAfterTextHeaderElement.textContent = 'Ride link sent to ' + messageFormInputElement.value + '.';
    selector.removeClass(frameBefore, 'on');
    selector.addClass(frameAfter, 'on');
    // remove extra whitespace
    setTimeout(function () {
      frameBefore.style = 'display:none;';
      frameAfter.style = 'position:relative;';
    }, 400);
  }
}

/**
 * Attaches the modal window to the DOM and makes it visible.
 * @memberOf lyftWebModal
 * @category lyftWebModal
 * @returns {void} Void.
 */
function open() {
  parentElement.insertBefore(rootElement, parentElement.childNodes[0]);
  setTimeout(function () {
    selector.addClass(rootElement, 'on');
  }, 10);
}

/**
 * Makes the modal window invisible and detaches it from the DOM.
 * @memberOf lyftWebModal
 * @category lyftWebModal
 * @returns {void} Void.
 */
function close() {
  selector.removeClass(rootElement, 'on');
  setTimeout(function () {
    rootElement.parentElement.removeChild(rootElement);
  }, 400);
}

/**
 * Initialize.
 * @memberOf lyftWebModal
 * @category lyftWebModal
 * @param {Object} options
 * @param {string} options.clientId
 * @param {string} options.clientToken
 * @param {string} options.googleApiKey
 * @param {Object} options.location
 * @param {string} options.location.address
 * @param {string} options.location.latitude
 * @param {string} options.location.longitude
 * @param {string} options.location.name
 * @param {string} options.objectName
 * @param {Object} options.parentElement
 * @returns {void} Void.
 */
function initialize(options) {
  // parse arguments
  parentElement = options.parentElement;
  api.setClientId(options.clientId);
  api.setClientToken(options.clientToken);
  // create element tree
  createElements();
  bindEvents(options.location, options.objectName);
  updateContents(options.googleApiKey, options.location);
}

/* ===================================== */
/* Publicly-Exposed Properties & Methods */
/* ===================================== */

module.exports = {
  close,
  initialize,
  onPostMessagesSuccess,
  open
};
