/**
 * lyftWebApi
 */
var lyftWebApi = (function() {

  /* ========== */
  /* Properties */
  /* ========== */

  var SERVER_URL         = 'http://www.lyft.com/api/jsonp';
  var GET_COSTS_URL      = SERVER_URL + '/get_costs';
  var GET_DRIVERS_URL    = SERVER_URL + '/get_drivers';
  var GET_ETAS_URL       = SERVER_URL + '/get_etas';
  var GET_RIDE_TYPES_URL = SERVER_URL + '/get_ride_types';
  var POST_MESSAGES_URL  = SERVER_URL + '/post_messages';

  var client_token;
  function setClientToken(value) {client_token = value;}

  /* =================== */
  /* Convenience Methods */
  /* =================== */

  /**
   * Injects a script into the DOM with given options.
   * @param {Object} options Required.
   * @param {string} options.src Required.
   * @param {boolean} options.async Optional.
   * @param {function} options.callback Optional.
   * @param {boolean} options.defer Optional.
   */
  function injectScript(options) {
    if (typeof options === 'undefined' || typeof options.src === 'undefined') {
      throw new TypeError('injectScript missing one of: options, options.src');
    }

    var headElement = document.getElementsByTagName('head')[0] || document.documentElement;
    var scriptElement = document.createElement('script');
    scriptElement.src = options.src;
    scriptElement.async = options.async || false;
    scriptElement.defer = options.defer || false;

    /* polyfill `onload` event for some older browsers */
    var isDone = false;
    scriptElement.onload = scriptElement.onreadystatechange = function(event) {
      /* if script is loaded... */
      if (!isDone && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
        isDone = true;
        /* invoke user callback */
        var callbackResult =
          (Object.prototype.toString.call(options.callback) === '[object Function]') ?
          options.callback(event) :
          undefined;
        /* unset event handler (avoid memory leak) */
        scriptElement.onload = scriptElement.onreadystatechange = null;
        /* remove DOM element */
        if (headElement && scriptElement.parentNode) {
          headElement.removeChild(scriptElement);
        }
        /* return user callback result */
        return callbackResult;
      }
    };
    /* insertBefore instead of appendChild for browser compatibility */
    headElement.insertBefore(scriptElement, headElement.firstChild);
  }

  /**
   * Recursively serializes data as a query-parameter string.
   * @param {Object} obj Data to serialize (required).
   * @param {string} pfx Key prefix for data chunk (optional).
   * @returns {string} Query-parameter string.
   */
  function serialize(obj, pfx) {
    var results = [];
    for(var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        var key = pfx ? (pfx + '[' + prop + ']') : prop;
        var val = obj[prop]
        results.push(
          (typeof val === 'object') ?
          serialize(val, key) :
          (encodeURIComponent(key) + '=' + encodeURIComponent(val))
        );
      }
    }
    return results.join('&');
  }

  /**
   * Performs a JSONP request.
   * @param {Object} options Required.
   * @param {string} options.url Required.
   * @param {string} options.callback Callback path relative to window context (optional).
   * @param {Object} options.data JSON-compatible data payload (optional).
   */
  function requestJsonp(options) {
    if (typeof options === 'undefined' || typeof options.url === 'undefined') {
      throw new TypeError('requestJsonp missing one of: options, options.url');
    }
    /* construct the request src */
    var src = options.url +
      (options.url.indexOf('?') !== -1 ? '&' : '?') + 'callback=' + options.callback +
      '&' + serialize(options.data);
    /* perform the request */
    return injectScript({src: src});
  }

  /* ================ */
  /* Workflow Methods */
  /* ================ */

  /**
   * Requests JSONP with injected `client_token`.
   * @param {Object} data Required.
   * @param {function} callback Optional.
   * @param {string} url Required.
   */
  function requestJsonpWithClientToken(data, callback, url) {
    /* build data payload */
    data = data || {};
    data.client_token = client_token;
    /* perform request */
    return requestJsonp({
      url: url,
      data: data,
      callback: callback
    });
  }

  /**
   * Gets `costs`.
   * @param {Object} data Required.
   * @param {string} data.start_lat Required.
   * @param {string} data.start_lng Required.
   * @param {string} data.end_lat Required.
   * @param {string} data.end_lng Required.
   * @param {string} data.ride_type Optional.
   * @param {function} callback Optional.
   */
  function getCosts(data, callback) {
    return requestJsonpWithClientToken(data, callback, GET_COSTS_URL);
  }

  /**
   * Gets `drivers`.
   * @param {Object} data Required.
   * @param {string} data.lat Required.
   * @param {string} data.lng Required.
   * @param {function} callback Optional.
   */
  function getDrivers(data, callback) {
    return requestJsonpWithClientToken(data, callback, GET_DRIVERS_URL);
  }

  /**
   * Gets `etas`.
   * @param {Object} data Required.
   * @param {string} data.lat Required.
   * @param {string} data.lng Required.
   * @param {string} data.ride_type Optional.
   * @param {function} callback Optional.
   */
  function getEtas(data, callback) {
    return requestJsonpWithClientToken(data, callback, GET_ETAS_URL);
  }

  /**
   * Gets `ride_types`.
   * @param {Object} data Required.
   * @param {string} data.lat Required.
   * @param {string} data.lng Required.
   * @param {string} data.ride_type Optional.
   * @param {function} callback Optional.
   */
  function getRideTypes(data, callback) {
    return requestJsonpWithClientToken(data, callback, GET_RIDE_TYPES_URL);
  }

  /**
   * POSTs `messages`.
   * @param {Object} data Required.
   * @param {string} data.phone_number Required.
   * @param {string} data.client_id Optional.
   * @param {string} data.destination_latitude Optional.
   * @param {string} data.destination_longitude Optional.
   * @param {function} callback Optional.
   */
  function postMessages(data, callback) {
    return requestJsonpWithClientToken(data, callback, POST_MESSAGES_URL);
  }

  /* ===================================== */
  /* Publicly-Exposed Properties & Methods */
  /* ===================================== */

  return {
    getCosts: getCosts,
    getDrivers: getDrivers,
    getEtas: getEtas,
    getRideTypes: getRideTypes,
    postMessages: postMessages,
    setClientToken: setClientToken
  };

})();

module.exports = window.lyftWebApi = lyftWebApi;
