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

  function getChildElementByClassName(parentElement, childClassName) {
    var childNodes = parentElement.childNodes || [];
    for (var i = 0, l = childNodes.length; i < l; i++) {
      if (childNodes[i].className === childClassName) {
        return childNodes[i];
      }
    }
  }

  function removeClass(element, className) {
      var classList = element.className.split(' ');
      var classIndex = classList.indexOf(className);
      if (classIndex !== -1) {classList.splice(classIndex, 1);}
      element.className = classList.join(' ');
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
    // get modal root element
    var element = template.childNodes[0];
    // bind close-window event
    if (element) {
      element.onclick = function (event) {
        if (event && event.target === element) {
          removeClass(element, 'on');
          return false;
        }
        return true;
      };
    }
    // get close-window element
    var closeElement = getChildElementByClassName(getChildElementByClassName(element, 'footer'), 'close');
    // bind close-window event
    if (closeElement) {
      closeElement.onclick = function (event) {
        if (event && event.target === closeElement) {
          removeClass(element, 'on');
          return false;
        }
        return true;
      };
    }
    // get map-container element
    var mapElement = getChildElementByClassName(getChildElementByClassName(element, 'content'), 'map-container');
    // set map background-image
    if (mapElement && typeof location !== 'undefined') {
      var mapSrc = 'https://maps.googleapis.com/maps/api/staticmap' +
                   '?center=' + location.latitude + ',' + location.longitude +
                   '&maptype=roadmap' +
                   '&markers=color:0xff00bf%7C' + location.latitude + ',' + location.longitude +
                   '&size=640x300' +
                   '&zoom=15';
      mapElement.style = 'background-image:url(\''+mapSrc+'\');';
    }
    // get map-label-name
    var mapLabelNameElement = getChildElementByClassName(getChildElementByClassName(mapElement, 'map-label'), 'map-label-name');
    // set map-label-name text
    if (mapLabelNameElement) {
      mapLabelNameElement.textContent = location.name;
    }
    // get map-label-description
    var mapLabelDescriptionElement = getChildElementByClassName(getChildElementByClassName(mapElement, 'map-label'), 'map-label-description');
    // set map-label-description text
    if (mapLabelDescriptionElement) {
      mapLabelDescriptionElement.textContent = location.address;
    }
    return element;
  }

  /* ================ */
  /* Workflow Methods */
  /* ================ */

  function onReceiveCosts(data) {
    if (data.cost_estimates && data.cost_estimates.length) {
      for (var i = 0, l = data.cost_estimates.length; i < l; i++) {
        if (data.cost_estimates[i].ride_type === 'lyft') {
          var min = Math.ceil(data.cost_estimates[i].estimated_cost_cents_min / 100);
          var max = Math.ceil(data.cost_estimates[i].estimated_cost_cents_max / 100);
          if (!isNaN(parseFloat(min)) && isFinite(min) && min > 0 &&
              !isNaN(parseFloat(max)) && isFinite(max) && max > 0) {
            var element = getChildElementByClassName(buttonElement, 'price-range');
            if (element) {element.textContent = '$'+min+((min !== max) ? ('-'+max) : '');}
          }
        }
      }
    }
  }

  function onReceiveEtas(data) {
    if (data.eta_estimates && data.eta_estimates.length) {
      for (var i = 0, l = data.eta_estimates.length; i < l; i++) {
        if (data.eta_estimates[i].ride_type === 'lyft') {
          var eta = Math.ceil(data.eta_estimates[i].eta_seconds / 60);
          if (!isNaN(parseFloat(eta)) && isFinite(eta) && eta > 0) {
            var element = getChildElementByClassName(getChildElementByClassName(buttonElement, 'cta-eta'), 'eta');
            if (element) {element.textContent = 'Lyft in '+eta+' min';}
          }
        }
      }
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
        }, 'lyftWebButton.onReceiveCosts');
        /* request etas */
        lyftWebApi.getEtas({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }, 'lyftWebButton.onReceiveEtas');
      });
    }
  }

  /* ===================================== */
  /* Publicly-Exposed Properties & Methods */
  /* ===================================== */

  return {
    initialize: initialize,
    onReceiveCosts: onReceiveCosts,
    onReceiveEtas: onReceiveEtas
  };

})(lyftWebApi);

module.exports = window.lyftWebButton = lyftWebButton;
