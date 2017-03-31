// dependencies
var api = require('../../services/api.js');
var selector = require('../../services/selector.js');
var serialize = require('../../services/serialize.js');

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
  template.innerHTML = require('html!./index.html');
  // store references to important elements
  rootElement       = template.childNodes[0];
  priceRangeElement = selector.selectChildElement(rootElement, ['.price-range']);
  etaElement        = selector.selectChildElement(rootElement, ['.cta-eta', '.eta']);
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
  let redirectURI = 'https://ride.lyft.com';

  if (rootEl) {
    let queryParams;

    if (options.queryParams) {
      // assign the query parameters from the options
      queryParams = options.queryParams;
    }

    if (options.clientId !== '' || undefined) {
      // if we have a clientId, let's assign it to the `partner` on the query string
      queryParams.partner = options.clientId;
    }

    if (queryParams) {
      // if we have any parameters, redirect to the full query string
      redirectURI = `${redirectURI}/?${serialize(queryParams)}`;
    }

    if (redirectURI) {
      rootEl.onclick = (e) => {
        e.preventDefault();
        window.open(redirectURI);
      };
    }
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

/**
 * Initialize.
 * @memberOf lyftWebButton
 * @category lyftWebButton
 * @param {Object} options
 * @param {string} options.clientId
 * @param {string} options.clientToken
 * @param {Object} options.location
 * @param {string} options.location.address
 * @param {string} options.location.latitude
 * @param {string} options.location.longitude
 * @param {string} options.location.name
 * @param {string} options.objectName
 * @param {Object} options.parentElement
 * @param {string} options.theme
 * @returns {void} Void.
 */
function initialize(options) {
  // parse arguments
  api.setClientId(options.clientId);
  api.setClientToken(options.clientToken);
  // assume themeSize is last chunk of options.theme (example: 'someColor someSize')
  if (options.theme && options.theme.split) {
    var themeSplit = options.theme.split(' ');
    themeSize = themeSplit[themeSplit.length - 1];
  }
  // create element tree
  createElements();
  bindEvents(rootElement, options);
  updateContents(options.theme);
  // insert element into DOM
  options.parentElement.insertBefore(rootElement, options.parentElement.childNodes[0]);
  // get device location
  if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
    navigator.geolocation.getCurrentPosition(function (position) {
      // request costs
      if (themeSize !== 'small') {
        api.getCosts({
          start_lat: position.coords.latitude,
          start_lng: position.coords.longitude,
          end_lat: options.location.latitude,
          end_lng: options.location.longitude
        }, (options.objectName + '.onGetCostsSuccess'));
      }
      // request etas
      api.getEtas({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }, (options.objectName + '.onGetEtasSuccess'));
    });
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
