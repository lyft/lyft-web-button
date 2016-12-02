/**
 * Injects a script into the DOM with given options.
 * @memberOf jsonp
 * @category jsonp
 * @param {Object} options Required.
 * @param {string} options.src Required.
 * @param {boolean} options.async Optional.
 * @param {function} options.callback Optional.
 * @param {boolean} options.defer Optional.
 * @returns {void} Void.
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
  scriptElement.onload = scriptElement.onreadystatechange = function (event) {
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
  headElement.insertBefore(scriptElement, headElement.childNodes[0]);
}

/**
 * Recursively serializes data as a query-parameter string.
 * @memberOf jsonp
 * @category jsonp
 * @param {Object} obj Data to serialize (required).
 * @param {string} pfx Key prefix for data chunk (optional).
 * @returns {string} Query-parameter string.
 */
function serialize(obj, pfx) {
  var results = [];
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      var key = pfx ? (pfx + '[' + prop + ']') : prop;
      var val = obj[prop];
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
 * @memberOf jsonp
 * @category jsonp
 * @param {Object} options Required.
 * @param {string} options.url Required.
 * @param {string} options.callback Callback path relative to window context (optional).
 * @param {Object} options.data JSON-compatible data payload (optional).
 * @returns {void} Result of injectScript().
 */
function request(options) {
  if (typeof options === 'undefined' || typeof options.url === 'undefined') {
    throw new TypeError('request missing one of: options, options.url');
  }
  /* construct the request src */
  var src = options.url +
    (options.url.indexOf('?') !== -1 ? '&' : '?') + 'callback=' + options.callback +
    '&' + serialize(options.data);
  /* perform the request */
  return injectScript({src: src});
}

// exports
module.exports = {
  request: request
};
