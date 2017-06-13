// dependencies
// require('babel-polyfill');

var api = require('../../services/api.js');
var selector = require('../../services/selector.js');
var serialize = require('../../services/serialize.js');
var helpers = require('../../services/helpers.js');
var stringify = require('qs').stringify;

// styles
require('./index.css');

/* ========== */
/* Properties */
/* ========== */

var etaElement;
var priceRangeElement;
var rootElement;
var themeSize = ''; // possible values include 'small', 'large'

/* ======================== */
/* DOM Manipulation Methods */
/* ======================== */

/**
 * Creates elements from a template and stores some useful references.
 * @memberOf lyftWebButton
 * @category lyftWebButton
 * @returns {Object} Template's root element.
 */
function createElements() {
  // create tree from template
  var template = document.createElement('div');
  template.innerHTML = require('./index.html');
  // store references to important elements
  rootElement = template.childNodes[0];
  priceRangeElement = selector.selectChildElement(rootElement, ['.price-range']);
  etaElement = selector.selectChildElement(rootElement, ['.cta-eta', '.eta']);
  // return reference to root element
  return rootElement;
}

/**
 * Binds events to some elements.
 * @memberOf lyftWebButton
 * @category lyftWebButton
 * @param {function} onClick Handler for button's onclick event.
 * @returns {void} Void.
 */
function bindEvents(rootEl, options) {
  var redirectURI = 'https://lyft.com/ride?id=lyft';

  const {
    clientId,
    queryParams,
    location: {
      pickup,
      destination
    }
  } = options;

  if (rootEl) {
    var query = queryParams || {};

    query.partner = clientId;

    if (!helpers.isEmpty(pickup)) {
      query.pickup = {
        latitude: pickup.latitude,
        longitude: pickup.longitude
      };
    }

    query.destination = {
      latitude: destination.latitude,
      longitude: destination.longitude
    };

    // if we have any parameters, redirect to the full query string
    redirectURI = redirectURI + '&' + stringify(query);

    rootEl.onclick = function (e) {
      e.preventDefault();
      helpers.logger(decodeURI(redirectURI));
      window.open(redirectURI);
    };
  }
}

/**
 * Updates the contents of some elements.
 * @memberOf lyftWebButton
 * @category lyftWebButton
 * @param {string} theme Name of the user's chosen theme.
 * @returns {void} Void.
 */
function updateContents(theme) {
  // root element: apply user-specified theme
  if (rootElement && theme) {
    selector.addClass(rootElement, theme);
  }
}

/* ================ */
/* Workflow Methods */
/* ================ */

/**
 * Success callback for getCosts request.
 * @memberOf lyftWebButton
 * @category lyftWebButton
 * @param {Object} data Response data.
 * @returns {void} Void.
 */
function onGetCostsSuccess(data) {
  if (data && data.cost_estimates && data.cost_estimates.length) {
    for (var i = 0, l = data.cost_estimates.length; i < l; i++) {
      if (data.cost_estimates[i].ride_type === 'lyft') {
        var min = Math.ceil(data.cost_estimates[i].estimated_cost_cents_min / 100);
        var max = Math.ceil(data.cost_estimates[i].estimated_cost_cents_max / 100);
        if (!isNaN(parseFloat(min)) && isFinite(min) && min > 0 &&
          !isNaN(parseFloat(max)) && isFinite(max) && max > 0) {
          if (priceRangeElement) {
            priceRangeElement.textContent = '$' + min + ((min !== max) ? ('-' + max) : '');
          }
        }
      }
    }
  }
}

/**
 * Success callback for getEtas request.
 * @memberOf lyftWebButton
 * @category lyftWebButton
 * @param {Object} data Response data.
 * @returns {void} Void.
 */
function onGetEtasSuccess(data) {
  if (data && data.eta_estimates && data.eta_estimates.length) {
    for (var i = 0, l = data.eta_estimates.length; i < l; i++) {
      if (data.eta_estimates[i].ride_type === 'lyft') {
        var eta = Math.ceil(data.eta_estimates[i].eta_seconds / 60);
        if (!isNaN(parseFloat(eta)) && isFinite(eta) && eta > 0) {
          if (etaElement) {
            etaElement.textContent = (themeSize !== 'small' ? 'Lyft in ' : '') + eta + ' min';
          }
        }
      }
    }
  }
}

function checkRequiredOptions(options) {
  // check at least one level deep for options
  // does not validate deeper
  const required = [
    'clientId',
    'clientToken',
    'location',
    'location.pickup',
    'parentElement',
    'scriptSrc'
  ];
  required.forEach((option) => {
    let optionPresent = options[option];

    if (option.indexOf('.') > -1) {
      let opt = option.split('.');
      optionPresent = options[opt[0]][opt[1]];
    }

    if (!optionPresent) {
      throw new Error(`Missing or invalid options; did you provide a value for ${option} in your options?`);
    }
  });
}

function getCostsAndEtas(location, options) {
  // request costs
  if (themeSize !== 'small') {
    api.getCosts({
      start_lat: location.latitude,
      start_lng: location.longitude,
      end_lat: options.location.destination.latitude,
      end_lng: options.location.destination.longitude
    }, (options.objectName + '.onGetCostsSuccess'));
  }
  // request etas
  api.getEtas({
    lat: location.latitude,
    lng: location.longitude
  }, (options.objectName + '.onGetEtasSuccess'));
}

/**
 * Initialize.
 * @memberOf lyftWebButton
 * @category lyftWebButton
 * @param {Object} options
 * @param {string} options.clientId
 * @param {string} options.clientToken
 * @param {Object} options.location
 * @param {Object} options.location.pickup
 * @param {Object} options.location.destination
 * @param {string} options.namespace
 * @param {string} options.objectName
 * @param {Object} options.parentElement
 * @param {string} options.theme
 * @returns {void} Void.
 */
function initialize(options) {
  checkRequiredOptions(options);

  api.setClientId(options.clientId);
  api.setClientToken(options.clientToken);
  // assume themeSize is last chunk of options.theme (example: 'someColor someSize')
  if (options.theme && options.theme.split) {
    var themeSplit = options.theme.split(' ');
    themeSize = themeSplit[themeSplit.length - 1];
  }
  // create element tree
  createElements();
  updateContents(options.theme);
  // insert element into DOM
  options.parentElement.insertBefore(rootElement, options.parentElement.childNodes[0]);

  const {
    location,
    location: {
      pickup
    }
  } = options;
  // get device location
  // consider moving to Promise

  // bind events regardless; will re-bind on location success
  bindEvents(rootElement, options);

  if (
    helpers.hasLocationService() && helpers.isEmpty(location.pickup)
  ) {
    navigator.geolocation.getCurrentPosition(function (position) {
      getCostsAndEtas({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, options);

      options.location.pickup = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      bindEvents(rootElement, options);
    }, function (error) {
      helpers.logger('Error in location promise', error);
    });
  } else {
    getCostsAndEtas({
      latitude: pickup.latitude,
      longitude: pickup.longitude
    }, options);
  }
}

/* ===================================== */
/* Publicly-Exposed Properties & Methods */
/* ===================================== */

module.exports = {
  initialize: initialize,
  onGetCostsSuccess: onGetCostsSuccess,
  onGetEtasSuccess: onGetEtasSuccess
};
