/**
 * lyftWebLibrary
 */
var lyftWebLibrary = (function() {

  /* ========== */
  /* Properties */
  /* ========== */

  var SERVER_URL = 'http://www.lyft.com/api/jsonp';

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
   * @param {string} path Required.
   */
  function requestJsonpWithClientToken(data, callback, path) {
    /* build data payload */
    data = data || {};
    data.client_token = client_token;
    /* perform request */
    return requestJsonp({
      url: SERVER_URL + path,
      data: data,
      callback: callback
    });
  }

  /**
   * GETs `costs`.
   * @param {Object} data Required.
   * @param {string} data.start_lat Required.
   * @param {string} data.start_lng Required.
   * @param {string} data.end_lat Required.
   * @param {string} data.end_lng Required.
   * @param {string} data.ride_type Optional.
   * @param {function} callback Optional.
   */
  function getCosts(data, callback) {
    return requestJsonpWithClientToken(data, callback, '/costs');
  }

  /**
   * GETs `drivers`.
   * @param {Object} data Required.
   * @param {string} data.lat Required.
   * @param {string} data.lng Required.
   * @param {function} callback Optional.
   */
  function getDrivers(data, callback) {
    return requestJsonpWithClientToken(data, callback, '/drivers');
  }

  /**
   * GETs `etas`.
   * @param {Object} data Required.
   * @param {string} data.lat Required.
   * @param {string} data.lng Required.
   * @param {string} data.ride_type Optional.
   * @param {function} callback Optional.
   */
  function getEtas(data, callback) {
    return requestJsonpWithClientToken(data, callback, '/etas');
  }

  /**
   * GETs `ride_types`.
   * @param {Object} data Required.
   * @param {string} data.lat Required.
   * @param {string} data.lng Required.
   * @param {string} data.ride_type Optional.
   * @param {function} callback Optional.
   */
  function getRideTypes(data, callback) {
    return requestJsonpWithClientToken(data, callback, '/ride_types');
  }

  /* ===================================== */
  /* Publicly-Exposed Properties & Methods */
  /* ===================================== */

  return {
    getCosts: getCosts,
    getDrivers: getDrivers,
    getEtas: getEtas,
    getRideTypes: getRideTypes,
    setClientToken: setClientToken
  };

})();

module.exports = window.lyftWebLibrary = lyftWebLibrary;
