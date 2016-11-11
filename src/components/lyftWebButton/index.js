// dependencies
var api = require('../../services/api.js');
var selector = require('../../services/selector.js');
var lyftWebModal = require('../lyftWebModal/index.js');

// styles
require('./index.css');

/**
 * lyftWebButton
 */
var lyftWebButton = (function(api, selector) {

  /* ========== */
  /* Properties */
  /* ========== */

  var etaElement;
  var priceRangeElement;
  var rootElement;

  /* ======================== */
  /* DOM Manipulation Methods */
  /* ======================== */

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

  function bindEvents(onClick) {
    // root element: close modal window on click
    if (rootElement) {
      rootElement.onclick = onClick;
    }
  }

  function updateContents(theme) {
    selector.addClass(rootElement, theme);
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
            if (priceRangeElement) {
              priceRangeElement.textContent = '$'+min+((min !== max) ? ('-'+max) : '');
            }
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
            if (etaElement) {
              etaElement.textContent = 'Lyft in '+eta+' min';
            }
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
   * @param {Object} options.parentElement
   * @param {string} options.theme
   */
  function initialize(options) {
    // parse arguments
    api.setClientToken(options.clientToken);
    // create element tree
    createElements();
    bindEvents(options.onClick);
    updateContents(options.theme);
    // insert element into DOM
    options.parentElement.insertBefore(rootElement, options.parentElement.childNodes[0]);
    // get device location
    if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition(function(position) {
        // request costs
        api.getCosts({
          start_lat: position.coords.latitude,
          start_lng: position.coords.longitude,
          end_lat: options.location.latitude,
          end_lng: options.location.longitude
        }, 'lyftWebButton.onGetCostsSuccess');
        // request etas
        api.getEtas({
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
    onGetEtasSuccess: onGetEtasSuccess
  };

})(api, selector);

module.exports = window.lyftWebButton = lyftWebButton;
