// dependencies
var lyftWebApi = require('../lyftWebApi/index.js');

// styles
require('../lyftWebModal/index.css');
require('./index.css');

/**
 * lyftWebButton
 */
var lyftWebButton = (function(lyftWebApi) {

  /* ========== */
  /* Properties */
  /* ========== */

  var buttonElement;
  var modalElement;

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

  /* ======================== */
  /* DOM Manipulation Methods */
  /* ======================== */

  function createButton(theme) {
    var template = document.createElement('div');
    template.innerHTML = require('html!./index.html');
    var element = template.childNodes[0];
    element.type = 'button';
    element.onclick = function () {
      addClass(modalElement, 'on');
      return false;
    };
    addClass(element, theme);
    return element;
  }

  function createModal(location) {
    var template = document.createElement('div');
    template.innerHTML = require('html!../lyftWebModal/index.html');
    // modal root (bind event)
    var element = template.childNodes[0];
    if (element) {
      element.onclick = function (event) {
        if (event && event.target === element) {
          removeClass(element, 'on');
          return false;
        }
        return true;
      };
    }
    // close-window (bind event)
    var closeElement = selectChildElement(element, ['.footer', '.close']);
    if (closeElement) {
      closeElement.onclick = function (event) {
        if (event && event.target === closeElement) {
          removeClass(element, 'on');
          return false;
        }
        return true;
      };
    }
    // map-container (set background-image)
    var mapElement = selectChildElement(element, ['.content', '.map-container']);
    if (mapElement && typeof location !== 'undefined') {
      var mapSrc = 'https://maps.googleapis.com/maps/api/staticmap' +
                   '?center=' + location.latitude + ',' + location.longitude +
                   '&maptype=roadmap' +
                   '&size=640x300' +
                   '&zoom=15';
      mapElement.style = 'background-image:url(\''+mapSrc+'\');';
    }
    // map-label-name (set text)
    var mapLabelNameElement = selectChildElement(mapElement, ['.map-label', '.map-label-name']);
    if (mapLabelNameElement) {mapLabelNameElement.textContent = location.name;}
    // map-label-description (set text)
    var mapLabelDescriptionElement = selectChildElement(mapElement, ['.map-label', '.map-label-description']);
    if (mapLabelDescriptionElement) {mapLabelDescriptionElement.textContent = location.address;}
    // message-form (bind event)
    var messageFormElement = selectChildElement(element, ['.content', '.message-form-container', '.message-form']);
    var messageFormInput = selectChildElement(messageFormElement, ['.message-form-input']);
    messageFormElement.onsubmit = function (event) {
      lyftWebApi.postMessages({
        phone_number: messageFormInput.value,
        // client_id: 'TODO',
        destination_latitude: location.latitude,
        destination_longitude: location.longitude
      }, 'lyftWebButton.onPostMessagesSuccess');
      return false;
    };
    // open-app-cta (set href)
    var openAppCtaElement = selectChildElement(element, ['.content', '.open-app-container', '.open-app-cta']);
    if (openAppCtaElement) {
      openAppCtaElement.href = 'lyft://ridetype' +
                               '?id=lyft' +
                               '&destination%5Blatitude%5D=' + location.latitude +
                               '&destination%5Blongitude%5D=' + location.longitude;
    }
    return element;
  }

  /* ================ */
  /* Workflow Methods */
  /* ================ */

  function onGetCostsSuccess(data) {
    if (data.cost_estimates && data.cost_estimates.length) {
      for (var i = 0, l = data.cost_estimates.length; i < l; i++) {
        if (data.cost_estimates[i].ride_type === 'lyft') {
          var min = Math.ceil(data.cost_estimates[i].estimated_cost_cents_min / 100);
          var max = Math.ceil(data.cost_estimates[i].estimated_cost_cents_max / 100);
          if (!isNaN(parseFloat(min)) && isFinite(min) && min > 0 &&
              !isNaN(parseFloat(max)) && isFinite(max) && max > 0) {
            var element = selectChildElement(buttonElement, ['.price-range']);
            if (element) {element.textContent = '$'+min+((min !== max) ? ('-'+max) : '');}
          }
        }
      }
    }
  }

  function onGetEtasSuccess(data) {
    if (data.eta_estimates && data.eta_estimates.length) {
      for (var i = 0, l = data.eta_estimates.length; i < l; i++) {
        if (data.eta_estimates[i].ride_type === 'lyft') {
          var eta = Math.ceil(data.eta_estimates[i].eta_seconds / 60);
          if (!isNaN(parseFloat(eta)) && isFinite(eta) && eta > 0) {
            var element = selectChildElement(buttonElement, ['.cta-eta', '.eta']);
            if (element) {element.textContent = 'Lyft in '+eta+' min';}
          }
        }
      }
    }
  }

  function onPostMessagesSuccess(data) {
    if (data.messages) {
      var element = selectChildElement(modalElement, ['.content', '.message-form-container', '.message-form']);
      element.style = 'display:none;';
    }
  }

  /**
   * Initialize.
   * @param {Object} options
   * @param {string} options.clientToken
   * @param {Object} options.location
   * @param {string} options.location.address
   * @param {string} options.location.latitude
   * @param {string} options.location.longitude
   * @param {string} options.location.name
   * @param {Object} options.rootElement
   * @param {string} options.theme
   */
  function initialize(options) {
    /* parse arguments */
    lyftWebApi.setClientToken(options.clientToken);
    /* insert modal */
    modalElement = createModal(options.location);
    options.rootElement.insertBefore(modalElement, options.rootElement.childNodes[0]);
    /* insert button */
    buttonElement = createButton(options.theme);
    options.rootElement.insertBefore(buttonElement, options.rootElement.childNodes[0]);
    /* get device location */
    if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition(function(position) {
        /* request costs */
        lyftWebApi.getCosts({
          start_lat: position.coords.latitude,
          start_lng: position.coords.longitude,
          end_lat: options.location.latitude,
          end_lng: options.location.longitude
        }, 'lyftWebButton.onGetCostsSuccess');
        /* request etas */
        lyftWebApi.getEtas({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }, 'lyftWebButton.onGetEtasSuccess');
      });
    }
  }

  /* ===================================== */
  /* Publicly-Exposed Properties & Methods */
  /* ===================================== */

  return {
    initialize: initialize,
    onGetCostsSuccess: onGetCostsSuccess,
    onGetEtasSuccess: onGetEtasSuccess,
    onPostMessagesSuccess: onPostMessagesSuccess
  };

})(lyftWebApi);

module.exports = window.lyftWebButton = lyftWebButton;
