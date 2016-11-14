/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// webpack begins its journey here
	window['lyftWebModal'] = __webpack_require__(1);
	window['lyftWebButton'] = __webpack_require__(10);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// dependencies
	var api = __webpack_require__(2);
	var selector = __webpack_require__(4);

	// styles
	__webpack_require__(5);

	/**
	 * lyftWebModal is a DOM manipulation widget.
	 * @param {Object} api Api service.
	 * @param {Object} selector Selector service.
	 * @returns {Object} Singleton of lyftWebModal.
	 */
	var lyftWebModal = (function(api, selector) {

	  /* ========== */
	  /* Properties */
	  /* ========== */

	  var closeElement;
	  var mapElement;
	  var mapLabelDescriptionElement;
	  var mapLabelNameElement;
	  var messageFormElement;
	  var messageFormInputElement;
	  var openAppCtaElement;
	  var rootElement;

	  /* ======================== */
	  /* DOM Manipulation Methods */
	  /* ======================== */

	  function createElements() {
	    // create tree from template
	    var template = document.createElement('div');
	    template.innerHTML = __webpack_require__(9);
	    // store references to important elements
	    rootElement                 = template.childNodes[0];
	    closeElement                = selector.selectChildElement(rootElement, ['.footer', '.close']);
	    mapElement                  = selector.selectChildElement(rootElement, ['.content', '.map-container']);
	    mapLabelNameElement         = selector.selectChildElement(mapElement, ['.map-label', '.map-label-name']);
	    mapLabelDescriptionElement  = selector.selectChildElement(mapElement, ['.map-label', '.map-label-description']);
	    frameBefore                 = selector.selectChildElement(rootElement, ['.content', '.frame-container', '.frame-before on']);
	    messageFormElement          = selector.selectChildElement(frameBefore, ['.message-form-container', '.message-form']);
	    messageFormInputElement     = selector.selectChildElement(messageFormElement, ['.message-form-input']);
	    openAppCtaElement           = selector.selectChildElement(frameBefore, ['.open-app-container', '.open-app-cta']);
	    frameAfter                  = selector.selectChildElement(rootElement, ['.content', '.frame-container', '.frame-after']);
	    frameAfterTextHeaderElement = selector.selectChildElement(frameAfter, ['.text-container', '.text-header']);
	    // return reference to root element
	    return rootElement;
	  }

	  function bindEvents(location) {
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
	    if (messageFormElement && messageFormInputElement) {
	      messageFormElement.onsubmit = function (event) {
	        api.postMessages({
	          phone_number: messageFormInputElement.value,
	          // client_id: 'TODO',
	          end_lat: location.latitude,
	          end_lng: location.longitude
	        }, 'lyftWebModal.onPostMessagesSuccess');
	        return false;
	      };
	    }
	    return rootElement;
	  }

	  function updateContents(location) {
	    location = location || {};
	    // map-container: set background-image
	    if (mapElement) {
	      var mapSrc = 'https://maps.googleapis.com/maps/api/staticmap' +
	        '?center=' + location.latitude + ',' + location.longitude +
	        '&maptype=roadmap&size=640x300&zoom=15';
	      mapElement.style = 'background-image:url(\''+mapSrc+'\');';
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
	      openAppCtaElement.href = 'lyft://ridetype?id=lyft' +
	        '&destination%5Blatitude%5D=' + location.latitude +
	        '&destination%5Blongitude%5D=' + location.longitude;
	    }
	  }

	  /* ================ */
	  /* Workflow Methods */
	  /* ================ */

	  function onPostMessagesSuccess(data) {
	    if (data.messages) {
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

	  function open() {
	    document.body.insertBefore(rootElement, document.body.childNodes[0]);
	    setTimeout(function () {
	      selector.addClass(rootElement, 'on');
	    }, 10);
	  }

	  function close() {
	    selector.removeClass(rootElement, 'on');
	    setTimeout(function () {
	      rootElement.parentElement.removeChild(rootElement);
	    }, 400);
	  }

	  /**
	   * Initialize.
	   * @param {Object} options
	   * @param {string} options.clientId
	   * @param {string} options.clientToken
	   * @param {Object} options.location
	   * @param {string} options.location.address
	   * @param {string} options.location.latitude
	   * @param {string} options.location.longitude
	   * @param {string} options.location.name
	   */
	  function initialize(options) {
	    // parse arguments
	    api.setClientId(options.clientId);
	    api.setClientToken(options.clientToken);
	    // create element tree
	    createElements();
	    bindEvents(options.location);
	    updateContents(options.location);
	  }

	  /* ===================================== */
	  /* Publicly-Exposed Properties & Methods */
	  /* ===================================== */

	  return {
	    close: close,
	    initialize: initialize,
	    onPostMessagesSuccess: onPostMessagesSuccess,
	    open: open
	  };

	})(api, selector);

	module.exports = lyftWebModal;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// dependencies
	var jsonp = __webpack_require__(3);

	// constants
	var SERVER_URL         = 'http://www.lyft.com/api/jsonp';
	var GET_COSTS_URL      = SERVER_URL + '/get_costs';
	var GET_DRIVERS_URL    = SERVER_URL + '/get_drivers';
	var GET_ETAS_URL       = SERVER_URL + '/get_etas';
	var GET_RIDE_TYPES_URL = SERVER_URL + '/get_ride_types';
	var POST_MESSAGES_URL  = SERVER_URL + '/post_messages';

	// configuration
	var client_id;
	function setClientId(value) {client_id = value;}
	var client_token;
	function setClientToken(value) {client_token = value;}

	/**
	 * Requests JSONP with injected credentials.
	 * @param {Object} data Required.
	 * @param {function} callback Optional.
	 * @param {string} url Required.
	 */
	function requestWithCredentials(data, callback, url) {
	  /* build data payload */
	  data = data || {};
	  data.client_id = client_id;
	  data.client_token = client_token;
	  /* perform request */
	  return jsonp.request({
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
	  return requestWithCredentials(data, callback, GET_COSTS_URL);
	}

	/**
	 * Gets `drivers`.
	 * @param {Object} data Required.
	 * @param {string} data.lat Required.
	 * @param {string} data.lng Required.
	 * @param {function} callback Optional.
	 */
	function getDrivers(data, callback) {
	  return requestWithCredentials(data, callback, GET_DRIVERS_URL);
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
	  return requestWithCredentials(data, callback, GET_ETAS_URL);
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
	  return requestWithCredentials(data, callback, GET_RIDE_TYPES_URL);
	}

	/**
	 * POSTs `messages`.
	 * @param {Object} data Required.
	 * @param {string} data.phone_number Required.
	 * @param {string} data.client_id Optional.
	 * @param {string} data.end_lat Optional.
	 * @param {string} data.end_lng Optional.
	 * @param {function} callback Optional.
	 */
	function postMessages(data, callback) {
	  return requestWithCredentials(data, callback, POST_MESSAGES_URL);
	}

	// exports
	module.exports = {
	  getCosts: getCosts,
	  getDrivers: getDrivers,
	  getEtas: getEtas,
	  getRideTypes: getRideTypes,
	  postMessages: postMessages,
	  setClientId: setClientId,
	  setClientToken: setClientToken
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports) {

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

	// exports
	module.exports = {
	  addClass: addClass,
	  removeClass: removeClass,
	  selectChildElement: selectChildElement
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./index.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "/* small styles */\n.lyft-web-modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 1;\n  display: block;\n  visibility: hidden;\n  opacity: 0;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  overflow: auto;\n  background-color: rgb(0,0,0);\n  background-color: rgba(0,0,0,0.4);\n  -webkit-transition: visibility 0.4s, opacity 0.4s;\n     -moz-transition: visibility 0.4s, opacity 0.4s;\n       -o-transition: visibility 0.4s, opacity 0.4s;\n          transition: visibility 0.4s, opacity 0.4s;\n}\n.lyft-web-modal.on {\n  visibility: visible;\n  opacity: 1;\n}\n.lyft-web-modal > .content {\n  position: relative;\n  top: -300px;\n  left: 0;\n  right: 0;\n  opacity: 0;\n  width: 100%;\n  max-width: 320px;\n  margin: 20px auto 0 auto;\n  padding: 0;\n  color: #000000;\n  font-family: sans-serif;\n  text-align: center;\n  background-color: #FFFFFF;\n  border: none;\n  -webkit-border-radius: 8px;\n     -moz-border-radius: 8px;\n          border-radius: 8px;\n  -webkit-box-shadow: 0 0 5px rgba(0,0,0,0.3);\n     -moz-box-shadow: 0 0 5px rgba(0,0,0,0.3);\n          box-shadow: 0 0 5px rgba(0,0,0,0.3);\n  -webkit-transition: top 0.4s, opacity 0.4s;\n     -moz-transition: top 0.4s, opacity 0.4s;\n       -o-transition: top 0.4s, opacity 0.4s;\n          transition: top 0.4s, opacity 0.4s;\n}\n.lyft-web-modal.on > .content {\n  top: 0;\n  opacity: 1;\n}\n.lyft-web-modal > .content > .map-container {\n  width: 100%;\n  height: 150px; /* background-image src will be 300px */\n  background-color: #EEEEEE;\n  background-position: center top; /* bump the marker down by 150px */\n  background-repeat: no-repeat;\n  background-size: 167% 167%;\n  -webkit-border-radius: 8px 8px 0 0;\n     -moz-border-radius: 8px 8px 0 0;\n          border-radius: 8px 8px 0 0;\n}\n.lyft-web-modal > .content > .map-container > .map-label {\n  display: inline-block;\n  max-width: 300px;\n  margin: 10px auto 0 auto;\n  padding: 5px;\n  background-color: #FFFFFF;\n  -webkit-border-radius: 5px;\n     -moz-border-radius: 5px;\n          border-radius: 5px;\n  -webkit-box-shadow: 0 0 5px rgba(0,0,0,0.3);\n     -moz-box-shadow: 0 0 5px rgba(0,0,0,0.3);\n          box-shadow: 0 0 5px rgba(0,0,0,0.3);\n}\n.lyft-web-modal > .content > .map-container > .map-label > .map-label-name {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n}\n.lyft-web-modal > .content > .map-container > .map-label > .map-label-description {\n  display: block;\n  margin-top: 5px;\n  font-size: 10px;\n  font-weight: 300;\n}\n.lyft-web-modal > .content > .map-container > .map-marker {\n  margin-top: 13px;\n}\n.lyft-web-modal > .content > .map-container > .map-marker > svg {\n  display: inline-block;\n}\n.lyft-web-modal > .content > .frame-container {\n  position: relative;\n}\n.lyft-web-modal > .content > .frame-container > .frame-before {\n  position: static;\n  z-index: 1;\n  padding: 10px;\n  visibility: hidden;\n  opacity: 0;\n  -webkit-transition: visibility 0.4s, opacity 0.4s;\n     -moz-transition: visibility 0.4s, opacity 0.4s;\n       -o-transition: visibility 0.4s, opacity 0.4s;\n          transition: visibility 0.4s, opacity 0.4s;\n}\n.lyft-web-modal > .content > .frame-container > .frame-before.on {\n  visibility: visible;\n  opacity: 1;\n}\n.lyft-web-modal > .content > .frame-container > .frame-after {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 2;\n  padding: 10px;\n  visibility: hidden;\n  opacity: 0;\n  -webkit-transition: visibility 0.4s, opacity 0.4s;\n     -moz-transition: visibility 0.4s, opacity 0.4s;\n       -o-transition: visibility 0.4s, opacity 0.4s;\n          transition: visibility 0.4s, opacity 0.4s;\n}\n.lyft-web-modal > .content > .frame-container > .frame-after.on {\n  visibility: visible;\n  opacity: 1;\n}\n.lyft-web-modal > .content .lyft-logo-tile-container > .lyft-logo-tile {\n  display: inline-block;\n  width: 64px;\n  height: 64px;\n  vertical-align: middle;\n  background-color: #FF00BF;\n  background-image: -webkit-linear-gradient(top left, #FF00BF, #B80B8C);\n  background-image: -moz-linear-gradient(top left, #FF00BF, #B80B8C);\n  background-image: -o-linear-gradient(top left, #FF00BF, #B80B8C);\n  background-image: linear-gradient(to bottom right, #FF00BF, #B80B8C);\n  border: none;\n  -webkit-border-radius: 15px;\n     -moz-border-radius: 15px;\n          border-radius: 15px;\n}\n.lyft-web-modal > .content .lyft-logo-tile-container > .lyft-logo-tile > svg {\n  display: inline-block;\n  width: 45px;\n  height: 32px;\n  margin: 17px 0 0 0;\n  fill: #FFFFFF;\n}\n.lyft-web-modal > .content .circle-check-icon-container > .circle-check-icon {\n  display: inline-block;\n  width: 64px;\n  height: 64px;\n  vertical-align: middle;\n  background-color: #FF00BF;\n  background-image: -webkit-linear-gradient(top left, #FF00BF, #B80B8C);\n  background-image: -moz-linear-gradient(top left, #FF00BF, #B80B8C);\n  background-image: -o-linear-gradient(top left, #FF00BF, #B80B8C);\n  background-image: linear-gradient(to bottom right, #FF00BF, #B80B8C);\n  border: none;\n  -webkit-border-radius: 50%;\n     -moz-border-radius: 50%;\n          border-radius: 50%;\n}\n.lyft-web-modal > .content .circle-check-icon-container > .circle-check-icon > svg {\n  display: inline-block;\n  width: 42px;\n  height: 42px;\n  margin: 10px 0 0 0;\n  fill: #FFFFFF;\n}\n.lyft-web-modal > .content .text-container {\n  margin-top: 10px;\n}\n.lyft-web-modal > .content .text-container > h1 {\n  margin: 0 0 0 0;\n  color: #352384;\n  font-size: 20px;\n  font-weight: 500;\n}\n.lyft-web-modal > .content .text-container > p {\n  width: 100%;\n  max-width: 320px;\n  margin: 5px auto 0 auto;\n  color: #000000;\n  font-size: 14px;\n  font-weight: 300;\n}\n.lyft-web-modal > .content .message-form-container {\n  margin-top: 10px;\n}\n.lyft-web-modal > .content .message-form-container > form > .message-form-input {\n  /* lyft style attributes */\n  -webkit-appearance: none;\n  height: 36px;\n  color: #333447;\n  font-size: 16px;\n  font-weight: lighter;\n  text-align: center;\n  text-transform: none;\n  line-height: 1.428571429;\n  vertical-align: middle;\n  background-color: #FFFFFF;\n  background-image: none;\n  border: 1px solid #CCCCCC;\n  -webkit-border-radius: 5px;\n     -moz-border-radius: 5px;\n          border-radius: 5px;\n  -webkit-box-shadow: none;\n     -moz-box-shadow: none;\n          box-shadow: none;\n  /* element-specific attributes */\n  width: 100%;\n  max-width: 320px;\n  margin: 0 0 0 0;\n}\n.lyft-web-modal > .content .message-form-container > form > .message-form-button {\n  /* lyft style attributes */\n  -webkit-appearance: button;\n  cursor: pointer;\n  height: 40px;\n  color: #FFFFFF;\n  font-size: 16px;\n  font-weight: 500;\n  text-align: center;\n  text-transform: none;\n  line-height: 1.428571429;\n  vertical-align: middle;\n  background-color: #FF00BF;\n  background-image: -webkit-linear-gradient(top left, #FF00BF, #B80B8C);\n  background-image: -moz-linear-gradient(top left, #FF00BF, #B80B8C);\n  background-image: -o-linear-gradient(top left, #FF00BF, #B80B8C);\n  background-image: linear-gradient(to bottom right, #FF00BF, #B80B8C);\n  border: none;\n  -webkit-border-radius: 5px;\n     -moz-border-radius: 5px;\n          border-radius: 5px;\n  /* element-specific attributes */\n  width: 100%;\n  max-width: 320px;\n  margin: 5px 0 0 0;\n}\n.lyft-web-modal > .content .open-app-container {\n  margin-top: 10px;\n}\n.lyft-web-modal > .content .open-app-container > .open-app-separator {\n  display: block;\n  margin: 0 0 0 0;\n  color: #000000;\n  font-weight: 300;\n}\n.lyft-web-modal > .content .open-app-container > .open-app-cta {\n  display: inline-block;\n  margin-top: 10px;\n  color: #FF00BF;\n  text-decoration: none;\n}\n.lyft-web-modal > .footer {\n  text-align: center;\n}\n.lyft-web-modal > .footer > .close {\n  display: inline-block;\n  margin-top: 20px;\n  color: #FFFFFF;\n  font-family: Arial, sans-serif;\n  font-size: 36px;\n  text-decoration: none;\n}\n\n/* large styles */\n@media(min-width:768px) {\n  .lyft-web-modal > .content {\n    max-width: 640px;\n    margin: 40px auto 0 auto;\n  }\n  .lyft-web-modal > .content > .map-container {\n    height: 200px;\n    background-size: auto;\n  }\n  .lyft-web-modal > .content > .map-container > .map-label {\n    margin: 20px auto 0 auto;\n    padding: 10px;\n  }\n  .lyft-web-modal > .content > .map-container > .map-label > .map-label-name {\n    font-size: 16px;\n  }\n  .lyft-web-modal > .content > .map-container > .map-label > .map-label-description {\n    font-size: 12px;\n  }\n  .lyft-web-modal > .content > .frame-container > .frame-before {\n    padding: 20px;\n  }\n  .lyft-web-modal > .content > .frame-container > .frame-after {\n    padding: 20px;\n  }\n  .lyft-web-modal > .content .text-container {\n    margin-top: 20px;\n  }\n  .lyft-web-modal > .content .text-container > h1 {\n    font-size: 24px;\n  }\n  .lyft-web-modal > .content .text-container > p {\n    margin: 10px auto 0 auto;\n    font-size: 16px;\n  }\n  .lyft-web-modal > .content .message-form-container {\n    margin-top: 20px;\n  }\n  .lyft-web-modal > .content .message-form-container > form > .message-form-button {\n    margin: 10px 0 0 0;\n  }\n  .lyft-web-modal > .content .open-app-container {\n    margin-top: 20px;\n  }\n  .lyft-web-modal > .content .open-app-container > .open-app-cta {\n    margin-top: 20px;\n  }\n  .lyft-web-modal > .footer > .close {\n    font-size: 48px;\n  }\n}\n", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = "<div class=\"lyft-web-modal\" title=\"Lyft web modal\">\n  <div class=\"content\">\n    <div class=\"map-container\" title=\"map\">\n      <div class=\"map-label\">\n        <span class=\"map-label-name\" title=\"location name\"></span>\n        <span class=\"map-label-description\" title=\"location description\"></span>\n      </div>\n      <div class=\"map-marker\">\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"40px\" height=\"64px\" viewBox=\"0 0 76 121\">\n          <defs>\n            <filter x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\" filterUnits=\"objectBoundingBox\" id=\"filter-1\">\n              <feOffset dx=\"0\" dy=\"0\" in=\"SourceAlpha\" result=\"shadowOffsetOuter1\"></feOffset>\n              <feGaussianBlur stdDeviation=\"1.5\" in=\"shadowOffsetOuter1\" result=\"shadowBlurOuter1\"></feGaussianBlur>\n              <feComposite in=\"shadowBlurOuter1\" in2=\"SourceAlpha\" operator=\"out\" result=\"shadowBlurOuter1\"></feComposite>\n              <feColorMatrix values=\"0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0\" type=\"matrix\" in=\"shadowBlurOuter1\"></feColorMatrix>\n            </filter>\n            <filter x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\" filterUnits=\"objectBoundingBox\" id=\"filter-2\">\n              <feGaussianBlur stdDeviation=\"3\" in=\"SourceGraphic\"></feGaussianBlur>\n            </filter>\n            <filter x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\" filterUnits=\"objectBoundingBox\" id=\"filter-3\">\n              <feOffset dx=\"0\" dy=\"0\" in=\"SourceAlpha\" result=\"shadowOffsetOuter1\"></feOffset>\n              <feGaussianBlur stdDeviation=\"1.5\" in=\"shadowOffsetOuter1\" result=\"shadowBlurOuter1\"></feGaussianBlur>\n              <feColorMatrix values=\"0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0\" type=\"matrix\" in=\"shadowBlurOuter1\"></feColorMatrix>\n            </filter>\n            <linearGradient x1=\"50%\" y1=\"0%\" x2=\"50%\" y2=\"97.7032156%\" id=\"linearGradient-1\">\n              <stop stop-color=\"#000000\" stop-opacity=\"0\" offset=\"0%\"></stop>\n              <stop stop-color=\"#000000\" stop-opacity=\"0.68115942\" offset=\"100%\"></stop>\n            </linearGradient>\n            <mask id=\"mask-1\" maskContentUnits=\"userSpaceOnUse\" maskUnits=\"objectBoundingBox\" x=\"0\" y=\"0\" width=\"70\" height=\"70\" fill=\"#FFFFFF\">\n              <rect x=\"0\" y=\"0\" width=\"70\" height=\"70\" rx=\"35\"></rect>\n            </mask>\n          </defs>\n          <g fill=\"none\" fill-rule=\"evenodd\" stroke=\"none\" stroke-width=\"1\" transform=\"translate(3.000000, 3.000000)\">\n            <rect x=\"0\" y=\"0\" width=\"70\" height=\"70\" rx=\"35\" fill=\"#000000\" fill-opacity=\"1\" filter=\"url(#filter-1)\"></rect>\n            <rect x=\"0\" y=\"0\" width=\"70\" height=\"70\" rx=\"35\" fill=\"#FF00BF\" fill-rule=\"evenodd\" stroke=\"#FFFFFF\" stroke-width=\"8\" mask=\"url(#mask-1)\"></rect>\n            <g stroke-width=\"1\" fill-rule=\"evenodd\" transform=\"translate(27.000000, 65.000000)\">\n              <polyline fill=\"url(#linearGradient-1)\" opacity=\"0.6\" filter=\"url(#filter-2)\" transform=\"translate(23.618189, 29.706625) rotate(49.000000) translate(-23.618189, -29.706625) \" points=\"21.6181893 4.70662517 21.6181893 54.7066252 25.6181893 54.7066252 25.6181893 4.70662517 21.6181893 4.70662517\"></polyline>\n              <circle fill=\"#000000\" cx=\"8\" cy=\"43\" r=\"5\"></circle>\n              <g transform=\"translate(0.000000, 0.500000)\">\n                <mask id=\"mask-7\" fill=\"#FFFFFF\">\n                  <rect x=\"0\" y=\"0.5\" width=\"16\" height=\"47\"></rect>\n                </mask>\n                <g mask=\"url(#mask-7)\">\n                  <path d=\"M10,13.4999809 L10,42.5 C10,43.6045695 9.1045695,44.5 8,44.5 C6.8954305,44.5 6,43.6045695 6,42.5 L6,13.5 C6,10.5 6,5.1000061 3.63797881e-12,3.54998779 L3.63797881e-12,0.5 L16,0.5 L16,3.54998779 C10.0000127,5.10000282 10,10.4999771 10,13.4999809 Z\" fill=\"#000000\" fill-opacity=\"1\" filter=\"url(#filter-3)\"></path>\n                  <path d=\"M10,13.4999809 L10,42.5 C10,43.6045695 9.1045695,44.5 8,44.5 C6.8954305,44.5 6,43.6045695 6,42.5 L6,13.5 C6,10.5 6,5.1000061 3.63797881e-12,3.54998779 L3.63797881e-12,0.5 L16,0.5 L16,3.54998779 C10.0000127,5.10000282 10,10.4999771 10,13.4999809 Z\" fill=\"#FFFFFF\" fill-rule=\"evenodd\"></path>\n                </g>\n              </g>\n            </g>\n            <rect fill=\"#FFFFFF\" fill-rule=\"evenodd\" x=\"27\" y=\"27\" width=\"16\" height=\"16\" rx=\"8\"></rect>\n          </g>\n        </svg>\n      </div>\n    </div>\n    <div class=\"frame-container\">\n      <div class=\"frame-before on\">\n        <div class=\"lyft-logo-tile-container\">\n          <span class=\"lyft-logo-tile\" title=\"Lyft logo tile\">\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"45px\" height=\"32px\" viewBox=\"0 0 62 45\">\n              <path d=\"M2.88906093,33.1952924 C1.08064111,31.678543 0,29.0557213 0,26.1796707 L0,0.868209803 L8.50060387,0.868209803 L8.50060387,26.2675792 C8.50060387,30.6236413 10.7571142,32.9263187 11.8221878,33.8421413 C10.9646803,34.4076422 9.47150151,34.9285327 7.76427017,34.9285327 C6.48254938,34.9285327 4.59629227,34.6280694 2.88906093,33.1952924 Z M34.8430121,34.2580666 L34.8430121,12.3268685 C34.8430121,5.53036195 39.971356,-7.10542736e-15 46.6913091,-7.10542736e-15 C52.392891,-7.10542736e-15 57.149521,4.08315217 58.3534045,9.709295 L58.4195662,10.1887545 L61.1135896,10.1887545 L61.1135896,18.6881472 L58.6310242,18.6881472 L58.6310242,21.8852758 C58.6310242,23.7510349 60.2032558,25.2914014 62,25.4882114 L62,34.2055839 C55.4551808,33.9982773 50.1946769,28.5518876 50.1946769,21.8852758 L50.1946769,12.3268685 C50.1946769,10.3285906 48.670971,8.70293969 46.6913091,8.70293969 C44.8465653,8.70293969 43.4934119,10.1186599 43.2988186,11.9332484 L43.2663864,12.3268685 L43.2663864,15.3470698 L47.5178452,15.3470698 L47.5178452,23.7615567 L43.2663864,23.7615567 L43.2663864,25.5708717 C43.2663864,28.4456102 41.9322481,31.0684319 40.1238283,32.5851813 C38.7837295,33.7083105 37.1167141,34.3039889 35.3044024,34.3039889 C35.0125126,34.3039889 35.1400911,34.2882441 34.8430121,34.2580666 Z M14.4982482,43.2461032 L14.4982482,35.4782888 C15.6722941,35.9007743 16.8634499,36.2917702 18.3644125,36.2917702 C18.6329511,36.2917702 18.8975979,36.2799616 19.1531637,36.2524082 C21.7801724,35.9781862 23.5120522,34.6753038 23.78578,32.7701827 L23.9466438,31.6536138 L23.1332441,32.4290453 C23.1176766,32.443478 21.4908771,33.9602274 18.6705725,33.9602274 C17.9181453,33.9602274 17.1371778,33.8526379 16.3510211,33.640083 C12.0323485,32.4749676 11.0419098,28.893025 11.0419098,26.0930743 L11.0419098,10.1887545 L19.5262567,10.1887545 L19.5262567,23.6277006 C19.5262567,24.63668 20.6100184,25.459346 21.6270924,25.459346 C22.6441664,25.459346 23.8128596,24.63668 23.8128596,23.6277006 L23.8128596,10.1887545 L32.2972065,10.1887545 L32.2972065,31.7126568 C32.2972065,37.9869607 28.5559089,42.7432031 23.0281637,43.8282825 C21.935847,44.0434614 20.7981252,44.1510509 19.6487278,44.1510509 C17.8039839,44.1510509 16.4117484,43.790611 14.4982482,43.2461032 Z\" fill=\"#FFFFFF\" fill-rule=\"evenodd\"></path>\n            </svg>\n          </span>\n        </div>\n        <div class=\"text-container\">\n          <h1>Ride with the Lyft mobile app.</h1>\n          <p>Enter your phone number below. We'll text you a link to request your Lyft ride.</p>\n        </div>\n        <div class=\"message-form-container\">\n          <form name=\"lyftMessageForm\" method=\"get\" action=\"#\" class=\"message-form\" onsubmit=\"window.open('http://www.lyft.com/signup/SDKSIGNUP','_blank');return false;\">\n            <input type=\"text\" class=\"message-form-input\" name=\"phoneNumber\" placeholder=\"Phone number\" required title=\"phone number\" />\n            <input type=\"submit\" class=\"message-form-button\" name=\"submitButton\" title=\"text me a link\" value=\"Text me a link\" />\n          </form>\n        </div>\n        <div class=\"open-app-container\">\n          <p class=\"open-app-separator\">—&nbsp;or&nbsp;—</p>\n          <a href=\"#\" class=\"open-app-cta\" title=\"Open in Lyft app\">Open in Lyft app</a>\n        </div>\n      </div>\n      <div class=\"frame-after\">\n        <div class=\"circle-check-icon-container\">\n          <span class=\"circle-check-icon\" title=\"circle check icon\">\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"42px\" height=\"42px\" viewBox=\"0 0 20 19\">\n              <path d=\"M7.364,13.789l-4.243,-4.243l-2.121,2.121l6.364,6.364l11.667,-11.667l-2.121,-2.121l-9.546,9.546Z\" fill=\"#FFFFFF\" fill-rule=\"evenodd\"></path>\n            </svg>\n          </span>\n        </div>\n        <div class=\"text-container\">\n          <h1 class=\"text-header\">Ride link sent.</h1>\n          <p>Tap the link to get going.</p>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"footer\">\n    <a href=\"#\" class=\"close\" title=\"close Lyft web modal\">&#10005;</a>\n  </div>\n</div>\n";

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// dependencies
	var api = __webpack_require__(2);
	var selector = __webpack_require__(4);

	// styles
	__webpack_require__(11);

	/**
	 * lyftWebButton is a DOM manipulation widget.
	 * @param {Object} api Api service.
	 * @param {Object} selector Selector service.
	 * @returns {Object} Singleton of lyftWebButton.
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
	    template.innerHTML = __webpack_require__(13);
	    // store references to important elements
	    rootElement       = template.childNodes[0];
	    priceRangeElement = selector.selectChildElement(rootElement, ['.price-range']);
	    etaElement        = selector.selectChildElement(rootElement, ['.cta-eta', '.eta']);
	    // return reference to root element
	    return rootElement;
	  }

	  function bindEvents(onClick) {
	    // root element: bind user-specified event handler
	    if (rootElement) {
	      rootElement.onclick = onClick;
	    }
	  }

	  function updateContents(theme) {
	    // root element: apply user-specified theme
	    if (rootElement && theme) {
	      selector.addClass(rootElement, theme);
	    }
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
	   * @param {string} options.clientId
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
	    api.setClientId(options.clientId);
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

	module.exports = lyftWebButton;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./index.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, "/* small styles */\n.lyft-web-button {\n  padding: 5px 10px;\n  color: #000000;\n  font-family: sans-serif;\n  background-color: #FFFFFF;\n  border: none;\n  -webkit-border-radius: 8px;\n     -moz-border-radius: 8px;\n          border-radius: 8px;\n}\n.lyft-web-button > .lyft-logo {\n  display: inline-block;\n  width: 48px;\n  height: auto;\n  margin-top: 4px;\n  vertical-align: middle;\n}\n.lyft-web-button > .cta-eta {\n  display: inline-block;\n  margin-left: 10px;\n  text-align: left;\n  vertical-align: middle;\n}\n.lyft-web-button > .cta-eta > .cta {\n  display: block;\n  font-size: 24px;\n  font-weight: 300;\n}\n.lyft-web-button > .cta-eta > .eta {\n  display: block;\n  font-size: 14px;\n  font-weight: 300;\n}\n.lyft-web-button > .arrow-icon {\n  display: inline-block;\n  width: 18px;\n  height: auto;\n  margin-left: 10px;\n  vertical-align: middle;\n}\n.lyft-web-button > .price-range {\n  display: inline-block;\n  margin-left: 4px;\n  vertical-align: middle;\n  font-size: 14px;\n  font-weight: 300;\n}\n\n/* large styles */\n@media(min-width:768px) {\n  .lyft-web-button {\n    padding: 18px 20px;\n  }\n  .lyft-web-button > .lyft-logo {\n    width: 55px;\n  }\n  .lyft-web-button > .cta-eta {\n    margin-left: 20px;\n  }\n  .lyft-web-button > .cta-eta > .cta {\n    font-size: 30px;\n  }\n  .lyft-web-button > .cta-eta > .eta {\n    font-size: 20px;\n  }\n  .lyft-web-button > .arrow-icon {\n    margin-left: 20px;\n  }\n  .lyft-web-button > .price-range {\n    font-size: 20px;\n  }\n}\n\n/* hot-pink */\n.lyft-web-button.hot-pink {\n  color: #FFFFFF;\n  background-color: #FF00BF;\n}\n.lyft-web-button.hot-pink > .lyft-logo > svg > path {\n  fill: #FFFFFF;\n}\n.lyft-web-button.hot-pink > .arrow-icon > svg > path {\n  fill: #FFFFFF;\n}\n\n/* mulberry-dark */\n.lyft-web-button.mulberry-dark {\n  color: #FFFFFF;\n  background-color: #352384;\n}\n.lyft-web-button.mulberry-dark > .lyft-logo > svg > path {\n  fill: #FFFFFF;\n}\n.lyft-web-button.mulberry-dark > .arrow-icon > svg > path {\n  fill: #FFFFFF;\n}\n\n/* mulberry-light */\n.lyft-web-button.mulberry-light {\n  color: #352384;\n  background-color: #FFFFFF;\n}\n.lyft-web-button.mulberry-light > .lyft-logo > svg > path {\n  fill: #352384;\n}\n.lyft-web-button.mulberry-light > .arrow-icon > svg > path {\n  fill: #352384;\n}\n\n/* multicolor */\n.lyft-web-button.multicolor {\n  color: #000000;\n  background-color: #FFFFFF;\n}\n.lyft-web-button.multicolor > .lyft-logo > svg > path {\n  fill: #FF00BF;\n}\n.lyft-web-button.multicolor > .arrow-icon > svg > path {\n  fill: #000000;\n}\n", ""]);

	// exports


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "<button type=\"button\" class=\"lyft-web-button\" title=\"Lyft web button\">\n  <span class=\"lyft-logo\" title=\"Lyft logo\">\n    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"100%\" height=\"100%\" viewBox=\"0 0 62 45\">\n      <path d=\"M2.88906093,33.1952924 C1.08064111,31.678543 0,29.0557213 0,26.1796707 L0,0.868209803 L8.50060387,0.868209803 L8.50060387,26.2675792 C8.50060387,30.6236413 10.7571142,32.9263187 11.8221878,33.8421413 C10.9646803,34.4076422 9.47150151,34.9285327 7.76427017,34.9285327 C6.48254938,34.9285327 4.59629227,34.6280694 2.88906093,33.1952924 Z M34.8430121,34.2580666 L34.8430121,12.3268685 C34.8430121,5.53036195 39.971356,-7.10542736e-15 46.6913091,-7.10542736e-15 C52.392891,-7.10542736e-15 57.149521,4.08315217 58.3534045,9.709295 L58.4195662,10.1887545 L61.1135896,10.1887545 L61.1135896,18.6881472 L58.6310242,18.6881472 L58.6310242,21.8852758 C58.6310242,23.7510349 60.2032558,25.2914014 62,25.4882114 L62,34.2055839 C55.4551808,33.9982773 50.1946769,28.5518876 50.1946769,21.8852758 L50.1946769,12.3268685 C50.1946769,10.3285906 48.670971,8.70293969 46.6913091,8.70293969 C44.8465653,8.70293969 43.4934119,10.1186599 43.2988186,11.9332484 L43.2663864,12.3268685 L43.2663864,15.3470698 L47.5178452,15.3470698 L47.5178452,23.7615567 L43.2663864,23.7615567 L43.2663864,25.5708717 C43.2663864,28.4456102 41.9322481,31.0684319 40.1238283,32.5851813 C38.7837295,33.7083105 37.1167141,34.3039889 35.3044024,34.3039889 C35.0125126,34.3039889 35.1400911,34.2882441 34.8430121,34.2580666 Z M14.4982482,43.2461032 L14.4982482,35.4782888 C15.6722941,35.9007743 16.8634499,36.2917702 18.3644125,36.2917702 C18.6329511,36.2917702 18.8975979,36.2799616 19.1531637,36.2524082 C21.7801724,35.9781862 23.5120522,34.6753038 23.78578,32.7701827 L23.9466438,31.6536138 L23.1332441,32.4290453 C23.1176766,32.443478 21.4908771,33.9602274 18.6705725,33.9602274 C17.9181453,33.9602274 17.1371778,33.8526379 16.3510211,33.640083 C12.0323485,32.4749676 11.0419098,28.893025 11.0419098,26.0930743 L11.0419098,10.1887545 L19.5262567,10.1887545 L19.5262567,23.6277006 C19.5262567,24.63668 20.6100184,25.459346 21.6270924,25.459346 C22.6441664,25.459346 23.8128596,24.63668 23.8128596,23.6277006 L23.8128596,10.1887545 L32.2972065,10.1887545 L32.2972065,31.7126568 C32.2972065,37.9869607 28.5559089,42.7432031 23.0281637,43.8282825 C21.935847,44.0434614 20.7981252,44.1510509 19.6487278,44.1510509 C17.8039839,44.1510509 16.4117484,43.790611 14.4982482,43.2461032 Z\" fill=\"#FF00BF\" fill-rule=\"evenodd\"></path>\n    </svg>\n  </span>\n  <div class=\"cta-eta\">\n    <span class=\"cta\">Get a ride</span>\n    <span class=\"eta\" title=\"estimated time of arrival\"></span>\n  </div>\n  <span class=\"arrow-icon\" title=\"arrow icon\">\n    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"100%\" height=\"100%\" viewBox=\"0 0 20 20\">\n      <path d=\"M14,13.7506336 L14,6 L6.24936644,6 L8.93723605,8.68786953 L3,17 L11.3121305,11.062764 L14,13.7506336 Z M0,10 C0,15.5228475 4.4771525,20 10,20 C15.5228475,20 20,15.5228475 20,10 C20,4.4771525 15.5228475,0 10,0 C4.4771525,1.70234197e-14 1.48029737e-14,4.4771525 0,10 L0,10 Z\" fill=\"#000000\" fill-rule=\"evenodd\"></path>\n    </svg>\n  </span>\n  <span class=\"price-range\" title=\"price range\"></span>\n</button>\n";

/***/ }
/******/ ]);