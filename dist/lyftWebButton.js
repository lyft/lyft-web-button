/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function RFC1738(value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function RFC3986(value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var has = Object.prototype.hasOwnProperty;

var hexTable = function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}();

exports.arrayToObject = function (source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function (target, source, options) {
    if (!source) {
        return target;
    }

    if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && _typeof(target[i]) === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (Object.prototype.hasOwnProperty.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function (str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (c === 0x2D || // -
        c === 0x2E || // .
        c === 0x5F || // _
        c === 0x7E || // ~
        c >= 0x30 && c <= 0x39 || // 0-9
        c >= 0x41 && c <= 0x5A || // a-z
        c >= 0x61 && c <= 0x7A // A-Z
        ) {
                out += string.charAt(i);
                continue;
            }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | c >> 6] + hexTable[0x80 | c & 0x3F]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | c >> 12] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F]);
            continue;
        }

        i += 1;
        c = 0x10000 + ((c & 0x3FF) << 10 | string.charCodeAt(i) & 0x3FF);
        out += hexTable[0xF0 | c >> 18] + hexTable[0x80 | c >> 12 & 0x3F] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F]; // eslint-disable-line max-len
    }

    return out;
};

exports.compact = function (obj, references) {
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) {
        return obj;
    }

    var refs = references || [];
    var lookup = refs.indexOf(obj);
    if (lookup !== -1) {
        return refs[lookup];
    }

    refs.push(obj);

    if (Array.isArray(obj)) {
        var compacted = [];

        for (var i = 0; i < obj.length; ++i) {
            if (obj[i] && _typeof(obj[i]) === 'object') {
                compacted.push(exports.compact(obj[i], refs));
            } else if (typeof obj[i] !== 'undefined') {
                compacted.push(obj[i]);
            }
        }

        return compacted;
    }

    var keys = Object.keys(obj);
    keys.forEach(function (key) {
        obj[key] = exports.compact(obj[key], refs);
    });

    return obj;
};

exports.isRegExp = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function (obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// dependencies
var jsonp = __webpack_require__(17);

// constants
var SERVER_URL = 'https://www.lyft.com/api/jsonp';
var GET_COSTS_URL = SERVER_URL + '/get_costs';
var GET_DRIVERS_URL = SERVER_URL + '/get_drivers';
var GET_ETAS_URL = SERVER_URL + '/get_etas';
var GET_RIDE_TYPES_URL = SERVER_URL + '/get_ride_types';
var POST_MESSAGES_URL = SERVER_URL + '/post_messages';

// configuration
var client_id;
function setClientId(value) {
  client_id = value;
}
var client_token;
function setClientToken(value) {
  client_token = value;
}

/**
 * Requests JSONP with injected credentials.
 * @memberOf api
 * @category api
 * @param {string} url Required.
 * @param {Object} data Required.
 * @param {function} callback Optional.
 * @returns {void} Result of jsonp.request().
 */
function requestWithCredentials(url, data, callback) {
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
 * @memberOf api
 * @category api
 * @param {Object} data Required.
 * @param {string} data.start_lat Required.
 * @param {string} data.start_lng Required.
 * @param {string} data.end_lat Required.
 * @param {string} data.end_lng Required.
 * @param {string} data.ride_type Optional.
 * @param {function} callback Optional.
 * @returns {void} Result of requestWithCredentials().
 */
function getCosts(data, callback) {
  return requestWithCredentials(GET_COSTS_URL, data, callback);
}

/**
 * Gets `drivers`.
 * @memberOf api
 * @category api
 * @param {Object} data Required.
 * @param {string} data.lat Required.
 * @param {string} data.lng Required.
 * @param {function} callback Optional.
 * @returns {void} Result of requestWithCredentials().
 */
function getDrivers(data, callback) {
  return requestWithCredentials(GET_DRIVERS_URL, data, callback);
}

/**
 * Gets `etas`.
 * @memberOf api
 * @category api
 * @param {Object} data Required.
 * @param {string} data.lat Required.
 * @param {string} data.lng Required.
 * @param {string} data.ride_type Optional.
 * @param {function} callback Optional.
 * @returns {void} Result of requestWithCredentials().
 */
function getEtas(data, callback) {
  return requestWithCredentials(GET_ETAS_URL, data, callback);
}

/**
 * Gets `ride_types`.
 * @memberOf api
 * @category api
 * @param {Object} data Required.
 * @param {string} data.lat Required.
 * @param {string} data.lng Required.
 * @param {string} data.ride_type Optional.
 * @param {function} callback Optional.
 * @returns {void} Result of requestWithCredentials().
 */
function getRideTypes(data, callback) {
  return requestWithCredentials(GET_RIDE_TYPES_URL, data, callback);
}

/**
 * POSTs `messages`.
 * @memberOf api
 * @category api
 * @param {Object} data Required.
 * @param {string} data.phone_number Required.
 * @param {string} data.end_lat Optional.
 * @param {string} data.end_lng Optional.
 * @param {function} callback Optional.
 * @returns {void} Result of requestWithCredentials().
 */
function postMessages(data, callback) {
  return requestWithCredentials(POST_MESSAGES_URL, data, callback);
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Adds a class to an element.
 * @memberOf selector
 * @category selector
 * @param {Object} element Required.
 * @param {string} className Required.
 * @returns {void} Void.
 */
function addClass(element, className) {
  var classList = element.className.split(' ');
  if (classList.indexOf(className) === -1) {
    classList.push(className);
  }
  element.className = classList.join(' ');
}

/**
 * Removes a class from an element.
 * @memberOf selector
 * @category selector
 * @param {Object} element Required.
 * @param {string} className Required.
 * @returns {void} Void.
 */
function removeClass(element, className) {
  var classList = element.className.split(' ');
  var classIndex = classList.indexOf(className);
  if (classIndex !== -1) {
    classList.splice(classIndex, 1);
  }
  element.className = classList.join(' ');
}

/**
 * Selects a single child element from a given element according to some criteria.
 * @memberOf selector
 * @category selector
 * @param {Object} element The parent element from which the child will be selected.
 * @param {string} attributeName Name of the attribute for selection.
 * @param {string} attributeValue Value of the named attribute for selection.
 * @returns {Object} The selected element.
 */
function selectChildElementByAttribute(element, attributeName, attributeValue) {
  var childNodes = element.childNodes || [];
  for (var i = 0, l = childNodes.length; i < l; i++) {
    if (childNodes[i][attributeName] === attributeValue) {
      return childNodes[i];
    }
  }
}

/**
 * Selects a single child element from an element tree according to some criteria.
 * @memberOf selector
 * @category selector
 * @param {Object} element The top level of the element tree.
 * @param {Array} attributes Strings describing the selection criteria.
 * @returns {Object} The selected element.
 */
function selectChildElement(element, attributes) {
  var currentElement = element;
  for (var i = 0, l = attributes.length; i < l; i++) {
    if (!currentElement || !attributes[i].length) {
      return;
    } /* short-circuit on failure */
    var attributeName = attributes[i][0] === '.' ? 'className' : 'id';
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(15);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
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

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

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

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// dependencies
// require('babel-polyfill');

var api = __webpack_require__(3);
var selector = __webpack_require__(4);
var serialize = __webpack_require__(18);
var helpers = __webpack_require__(16);
var stringify = __webpack_require__(10).stringify;

// styles
__webpack_require__(13);

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
  template.innerHTML = __webpack_require__(8);
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

  var clientId = options.clientId,
      queryParams = options.queryParams,
      _options$location = options.location,
      pickup = _options$location.pickup,
      destination = _options$location.destination;


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
        if (!isNaN(parseFloat(min)) && isFinite(min) && min > 0 && !isNaN(parseFloat(max)) && isFinite(max) && max > 0) {
          if (priceRangeElement) {
            priceRangeElement.textContent = '$' + min + (min !== max ? '-' + max : '');
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
  var required = ['clientId', 'clientToken', 'location', 'location.pickup', 'parentElement', 'scriptSrc'];
  required.forEach(function (option) {
    var optionPresent = options[option];

    if (option.indexOf('.') > -1) {
      var opt = option.split('.');
      optionPresent = options[opt[0]][opt[1]];
    }

    if (!optionPresent) {
      throw new Error('Missing or invalid options; did you provide a value for ' + option + ' in your options?');
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
    }, options.objectName + '.onGetCostsSuccess');
  }
  // request etas
  api.getEtas({
    lat: location.latitude,
    lng: location.longitude
  }, options.objectName + '.onGetEtasSuccess');
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

  var location = options.location,
      pickup = options.location.pickup;
  // get device location
  // consider moving to Promise

  // bind events regardless; will re-bind on location success

  bindEvents(rootElement, options);

  if (helpers.hasLocationService() && helpers.isEmpty(location.pickup)) {
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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// dependencies
var api = __webpack_require__(3);
var selector = __webpack_require__(4);

// styles
__webpack_require__(14);

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
  template.innerHTML = __webpack_require__(9);
  // store references to important elements
  rootElement = template.childNodes[0];
  closeElement = selector.selectChildElement(rootElement, ['.footer', '.close']);
  mapElement = selector.selectChildElement(rootElement, ['.content', '.map-container']);
  mapLabelNameElement = selector.selectChildElement(mapElement, ['.map-label', '.map-label-name']);
  mapLabelDescriptionElement = selector.selectChildElement(mapElement, ['.map-label', '.map-label-description']);
  frameBefore = selector.selectChildElement(rootElement, ['.content', '.frame-container', '.frame-before on']);
  messageFormElement = selector.selectChildElement(frameBefore, ['.message-form-container', '.message-form']);
  messageFormInputElement = selector.selectChildElement(messageFormElement, ['.message-form-input']);
  openAppCtaElement = selector.selectChildElement(frameBefore, ['.open-app-container', '.open-app-cta']);
  frameAfter = selector.selectChildElement(rootElement, ['.content', '.frame-container', '.frame-after']);
  frameAfterTextHeaderElement = selector.selectChildElement(frameAfter, ['.text-container', '.text-header']);
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
      }, objectName + '.onPostMessagesSuccess');
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
    var mapSrc = 'https://maps.googleapis.com/maps/api/staticmap' + '?center=' + location.latitude + ',' + location.longitude + '&maptype=roadmap&size=640x300&zoom=15' + (googleApiKey ? '&key=' + googleApiKey : '');
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
    openAppCtaElement.href = 'https://lyft.com/ride?id=lyft' + '&destination%5Blatitude%5D=' + location.latitude + '&destination%5Blongitude%5D=' + location.longitude;
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
  close: close,
  initialize: initialize,
  onPostMessagesSuccess: onPostMessagesSuccess,
  open: open
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "<button type=\"button\" class=\"lyft-web-button\" title=\"Lyft web button\">\n  <span class=\"lyft-logo\" title=\"Lyft logo\">\n    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"100%\" height=\"100%\" viewBox=\"0 0 62 45\">\n      <path d=\"M2.88906093,33.1952924 C1.08064111,31.678543 0,29.0557213 0,26.1796707 L0,0.868209803 L8.50060387,0.868209803 L8.50060387,26.2675792 C8.50060387,30.6236413 10.7571142,32.9263187 11.8221878,33.8421413 C10.9646803,34.4076422 9.47150151,34.9285327 7.76427017,34.9285327 C6.48254938,34.9285327 4.59629227,34.6280694 2.88906093,33.1952924 Z M34.8430121,34.2580666 L34.8430121,12.3268685 C34.8430121,5.53036195 39.971356,-7.10542736e-15 46.6913091,-7.10542736e-15 C52.392891,-7.10542736e-15 57.149521,4.08315217 58.3534045,9.709295 L58.4195662,10.1887545 L61.1135896,10.1887545 L61.1135896,18.6881472 L58.6310242,18.6881472 L58.6310242,21.8852758 C58.6310242,23.7510349 60.2032558,25.2914014 62,25.4882114 L62,34.2055839 C55.4551808,33.9982773 50.1946769,28.5518876 50.1946769,21.8852758 L50.1946769,12.3268685 C50.1946769,10.3285906 48.670971,8.70293969 46.6913091,8.70293969 C44.8465653,8.70293969 43.4934119,10.1186599 43.2988186,11.9332484 L43.2663864,12.3268685 L43.2663864,15.3470698 L47.5178452,15.3470698 L47.5178452,23.7615567 L43.2663864,23.7615567 L43.2663864,25.5708717 C43.2663864,28.4456102 41.9322481,31.0684319 40.1238283,32.5851813 C38.7837295,33.7083105 37.1167141,34.3039889 35.3044024,34.3039889 C35.0125126,34.3039889 35.1400911,34.2882441 34.8430121,34.2580666 Z M14.4982482,43.2461032 L14.4982482,35.4782888 C15.6722941,35.9007743 16.8634499,36.2917702 18.3644125,36.2917702 C18.6329511,36.2917702 18.8975979,36.2799616 19.1531637,36.2524082 C21.7801724,35.9781862 23.5120522,34.6753038 23.78578,32.7701827 L23.9466438,31.6536138 L23.1332441,32.4290453 C23.1176766,32.443478 21.4908771,33.9602274 18.6705725,33.9602274 C17.9181453,33.9602274 17.1371778,33.8526379 16.3510211,33.640083 C12.0323485,32.4749676 11.0419098,28.893025 11.0419098,26.0930743 L11.0419098,10.1887545 L19.5262567,10.1887545 L19.5262567,23.6277006 C19.5262567,24.63668 20.6100184,25.459346 21.6270924,25.459346 C22.6441664,25.459346 23.8128596,24.63668 23.8128596,23.6277006 L23.8128596,10.1887545 L32.2972065,10.1887545 L32.2972065,31.7126568 C32.2972065,37.9869607 28.5559089,42.7432031 23.0281637,43.8282825 C21.935847,44.0434614 20.7981252,44.1510509 19.6487278,44.1510509 C17.8039839,44.1510509 16.4117484,43.790611 14.4982482,43.2461032 Z\" fill=\"#FF00BF\" fill-rule=\"evenodd\"></path>\n    </svg>\n  </span>\n  <div class=\"cta-eta\">\n    <span class=\"cta\">Get a ride</span>\n    <span class=\"eta\" title=\"estimated time of arrival\"></span>\n  </div>\n  <span class=\"arrow-icon\" title=\"arrow icon\">\n    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"100%\" height=\"100%\" viewBox=\"0 0 20 20\">\n      <path d=\"M14,13.7506336 L14,6 L6.24936644,6 L8.93723605,8.68786953 L3,17 L11.3121305,11.062764 L14,13.7506336 Z M0,10 C0,15.5228475 4.4771525,20 10,20 C15.5228475,20 20,15.5228475 20,10 C20,4.4771525 15.5228475,0 10,0 C4.4771525,1.70234197e-14 1.48029737e-14,4.4771525 0,10 L0,10 Z\" fill=\"#000000\" fill-rule=\"evenodd\"></path>\n    </svg>\n  </span>\n  <span class=\"price-range\" title=\"price range\"></span>\n</button>\n";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "<div class=\"lyft-web-modal\" title=\"Lyft web modal\">\n  <div class=\"content\">\n    <div class=\"map-container\" title=\"map\">\n      <div class=\"map-label\">\n        <span class=\"map-label-name\" title=\"location name\"></span>\n        <span class=\"map-label-description\" title=\"location description\"></span>\n      </div>\n      <div class=\"map-marker\">\n        <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"40px\" height=\"64px\" viewBox=\"0 0 76 121\">\n          <defs>\n            <filter x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\" filterUnits=\"objectBoundingBox\" id=\"filter-1\">\n              <feOffset dx=\"0\" dy=\"0\" in=\"SourceAlpha\" result=\"shadowOffsetOuter1\"></feOffset>\n              <feGaussianBlur stdDeviation=\"1.5\" in=\"shadowOffsetOuter1\" result=\"shadowBlurOuter1\"></feGaussianBlur>\n              <feComposite in=\"shadowBlurOuter1\" in2=\"SourceAlpha\" operator=\"out\" result=\"shadowBlurOuter1\"></feComposite>\n              <feColorMatrix values=\"0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0\" type=\"matrix\" in=\"shadowBlurOuter1\"></feColorMatrix>\n            </filter>\n            <filter x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\" filterUnits=\"objectBoundingBox\" id=\"filter-2\">\n              <feGaussianBlur stdDeviation=\"3\" in=\"SourceGraphic\"></feGaussianBlur>\n            </filter>\n            <filter x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\" filterUnits=\"objectBoundingBox\" id=\"filter-3\">\n              <feOffset dx=\"0\" dy=\"0\" in=\"SourceAlpha\" result=\"shadowOffsetOuter1\"></feOffset>\n              <feGaussianBlur stdDeviation=\"1.5\" in=\"shadowOffsetOuter1\" result=\"shadowBlurOuter1\"></feGaussianBlur>\n              <feColorMatrix values=\"0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0\" type=\"matrix\" in=\"shadowBlurOuter1\"></feColorMatrix>\n            </filter>\n            <linearGradient x1=\"50%\" y1=\"0%\" x2=\"50%\" y2=\"97.7032156%\" id=\"linearGradient-1\">\n              <stop stop-color=\"#000000\" stop-opacity=\"0\" offset=\"0%\"></stop>\n              <stop stop-color=\"#000000\" stop-opacity=\"0.68115942\" offset=\"100%\"></stop>\n            </linearGradient>\n            <mask id=\"mask-1\" maskContentUnits=\"userSpaceOnUse\" maskUnits=\"objectBoundingBox\" x=\"0\" y=\"0\" width=\"70\" height=\"70\" fill=\"#FFFFFF\">\n              <rect x=\"0\" y=\"0\" width=\"70\" height=\"70\" rx=\"35\"></rect>\n            </mask>\n          </defs>\n          <g fill=\"none\" fill-rule=\"evenodd\" stroke=\"none\" stroke-width=\"1\" transform=\"translate(3.000000, 3.000000)\">\n            <rect x=\"0\" y=\"0\" width=\"70\" height=\"70\" rx=\"35\" fill=\"#000000\" fill-opacity=\"1\" filter=\"url(#filter-1)\"></rect>\n            <rect x=\"0\" y=\"0\" width=\"70\" height=\"70\" rx=\"35\" fill=\"#FF00BF\" fill-rule=\"evenodd\" stroke=\"#FFFFFF\" stroke-width=\"8\" mask=\"url(#mask-1)\"></rect>\n            <g stroke-width=\"1\" fill-rule=\"evenodd\" transform=\"translate(27.000000, 65.000000)\">\n              <polyline fill=\"url(#linearGradient-1)\" opacity=\"0.6\" filter=\"url(#filter-2)\" transform=\"translate(23.618189, 29.706625) rotate(49.000000) translate(-23.618189, -29.706625) \" points=\"21.6181893 4.70662517 21.6181893 54.7066252 25.6181893 54.7066252 25.6181893 4.70662517 21.6181893 4.70662517\"></polyline>\n              <circle fill=\"#000000\" cx=\"8\" cy=\"43\" r=\"5\"></circle>\n              <g transform=\"translate(0.000000, 0.500000)\">\n                <mask id=\"mask-7\" fill=\"#FFFFFF\">\n                  <rect x=\"0\" y=\"0.5\" width=\"16\" height=\"47\"></rect>\n                </mask>\n                <g mask=\"url(#mask-7)\">\n                  <path d=\"M10,13.4999809 L10,42.5 C10,43.6045695 9.1045695,44.5 8,44.5 C6.8954305,44.5 6,43.6045695 6,42.5 L6,13.5 C6,10.5 6,5.1000061 3.63797881e-12,3.54998779 L3.63797881e-12,0.5 L16,0.5 L16,3.54998779 C10.0000127,5.10000282 10,10.4999771 10,13.4999809 Z\" fill=\"#000000\" fill-opacity=\"1\" filter=\"url(#filter-3)\"></path>\n                  <path d=\"M10,13.4999809 L10,42.5 C10,43.6045695 9.1045695,44.5 8,44.5 C6.8954305,44.5 6,43.6045695 6,42.5 L6,13.5 C6,10.5 6,5.1000061 3.63797881e-12,3.54998779 L3.63797881e-12,0.5 L16,0.5 L16,3.54998779 C10.0000127,5.10000282 10,10.4999771 10,13.4999809 Z\" fill=\"#FFFFFF\" fill-rule=\"evenodd\"></path>\n                </g>\n              </g>\n            </g>\n            <rect fill=\"#FFFFFF\" fill-rule=\"evenodd\" x=\"27\" y=\"27\" width=\"16\" height=\"16\" rx=\"8\"></rect>\n          </g>\n        </svg>\n      </div>\n    </div>\n    <div class=\"frame-container\">\n      <div class=\"frame-before on\">\n        <div class=\"lyft-logo-tile-container\">\n          <span class=\"lyft-logo-tile\" title=\"Lyft logo tile\">\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"45px\" height=\"32px\" viewBox=\"0 0 62 45\">\n              <path d=\"M2.88906093,33.1952924 C1.08064111,31.678543 0,29.0557213 0,26.1796707 L0,0.868209803 L8.50060387,0.868209803 L8.50060387,26.2675792 C8.50060387,30.6236413 10.7571142,32.9263187 11.8221878,33.8421413 C10.9646803,34.4076422 9.47150151,34.9285327 7.76427017,34.9285327 C6.48254938,34.9285327 4.59629227,34.6280694 2.88906093,33.1952924 Z M34.8430121,34.2580666 L34.8430121,12.3268685 C34.8430121,5.53036195 39.971356,-7.10542736e-15 46.6913091,-7.10542736e-15 C52.392891,-7.10542736e-15 57.149521,4.08315217 58.3534045,9.709295 L58.4195662,10.1887545 L61.1135896,10.1887545 L61.1135896,18.6881472 L58.6310242,18.6881472 L58.6310242,21.8852758 C58.6310242,23.7510349 60.2032558,25.2914014 62,25.4882114 L62,34.2055839 C55.4551808,33.9982773 50.1946769,28.5518876 50.1946769,21.8852758 L50.1946769,12.3268685 C50.1946769,10.3285906 48.670971,8.70293969 46.6913091,8.70293969 C44.8465653,8.70293969 43.4934119,10.1186599 43.2988186,11.9332484 L43.2663864,12.3268685 L43.2663864,15.3470698 L47.5178452,15.3470698 L47.5178452,23.7615567 L43.2663864,23.7615567 L43.2663864,25.5708717 C43.2663864,28.4456102 41.9322481,31.0684319 40.1238283,32.5851813 C38.7837295,33.7083105 37.1167141,34.3039889 35.3044024,34.3039889 C35.0125126,34.3039889 35.1400911,34.2882441 34.8430121,34.2580666 Z M14.4982482,43.2461032 L14.4982482,35.4782888 C15.6722941,35.9007743 16.8634499,36.2917702 18.3644125,36.2917702 C18.6329511,36.2917702 18.8975979,36.2799616 19.1531637,36.2524082 C21.7801724,35.9781862 23.5120522,34.6753038 23.78578,32.7701827 L23.9466438,31.6536138 L23.1332441,32.4290453 C23.1176766,32.443478 21.4908771,33.9602274 18.6705725,33.9602274 C17.9181453,33.9602274 17.1371778,33.8526379 16.3510211,33.640083 C12.0323485,32.4749676 11.0419098,28.893025 11.0419098,26.0930743 L11.0419098,10.1887545 L19.5262567,10.1887545 L19.5262567,23.6277006 C19.5262567,24.63668 20.6100184,25.459346 21.6270924,25.459346 C22.6441664,25.459346 23.8128596,24.63668 23.8128596,23.6277006 L23.8128596,10.1887545 L32.2972065,10.1887545 L32.2972065,31.7126568 C32.2972065,37.9869607 28.5559089,42.7432031 23.0281637,43.8282825 C21.935847,44.0434614 20.7981252,44.1510509 19.6487278,44.1510509 C17.8039839,44.1510509 16.4117484,43.790611 14.4982482,43.2461032 Z\" fill=\"#FFFFFF\" fill-rule=\"evenodd\"></path>\n            </svg>\n          </span>\n        </div>\n        <div class=\"text-container\">\n          <h1>Ride with the Lyft mobile app.</h1>\n          <p>Enter your phone number below. We'll text you a link to request your Lyft ride.</p>\n        </div>\n        <div class=\"message-form-container\">\n          <form name=\"lyftMessageForm\" method=\"get\" action=\"#\" class=\"message-form\" onsubmit=\"window.open('http://www.lyft.com/signup/SDKSIGNUP','_blank');return false;\">\n            <input type=\"text\" class=\"message-form-input\" name=\"phoneNumber\" placeholder=\"Phone number\" required title=\"phone number\" />\n            <input type=\"submit\" class=\"message-form-button\" name=\"submitButton\" title=\"text me a link\" value=\"Text me a link\" />\n          </form>\n        </div>\n        <div class=\"open-app-container\">\n          <p class=\"open-app-separator\">&mdash;&nbsp;or&nbsp;&mdash;</p>\n          <a href=\"#\" class=\"open-app-cta\" title=\"Open in Lyft app\">Open in Lyft app</a>\n        </div>\n      </div>\n      <div class=\"frame-after\">\n        <div class=\"circle-check-icon-container\">\n          <span class=\"circle-check-icon\" title=\"circle check icon\">\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"42px\" height=\"42px\" viewBox=\"0 0 20 19\">\n              <path d=\"M7.364,13.789l-4.243,-4.243l-2.121,2.121l6.364,6.364l11.667,-11.667l-2.121,-2.121l-9.546,9.546Z\" fill=\"#FFFFFF\" fill-rule=\"evenodd\"></path>\n            </svg>\n          </span>\n        </div>\n        <div class=\"text-container\">\n          <h1 class=\"text-header\">Ride link sent.</h1>\n          <p>Tap the link to get going.</p>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"footer\">\n    <a href=\"#\" class=\"close\" title=\"close Lyft web modal\">&#10005;</a>\n  </div>\n</div>\n";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(12);
var parse = __webpack_require__(11);
var formats = __webpack_require__(1);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos));
            val = options.decoder(part.slice(pos + 1));
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function parseObjectRecursive(chain, val, options) {
    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj;
    if (root === '[]') {
        obj = [];
        obj = obj.concat(parseObject(chain, val, options));
    } else {
        obj = options.plainObjects ? Object.create(null) : {};
        var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
        var index = parseInt(cleanRoot, 10);
        if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && options.parseArrays && index <= options.arrayLimit) {
            obj = [];
            obj[index] = parseObject(chain, val, options);
        } else {
            obj[cleanRoot] = parseObject(chain, val, options);
        }
    }

    return obj;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts || {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = __webpack_require__(2);
var formats = __webpack_require__(1);

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) {
        // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) {
        // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix);
            return [formatter(keyValue) + '=' + formatter(encoder(obj))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly));
        } else {
            values = values.concat(stringify(obj[key], prefix + (allowDots ? '.' + key : '[' + key + ']'), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts || {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats.default;
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(obj[key], key, generateArrayPrefix, strictNullHandling, skipNulls, encode ? encoder : null, filter, sort, allowDots, serializeDate, formatter, encodeValuesOnly));
    }

    return keys.join(delimiter);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if (typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {};
options.transform = transform;
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if (content.locals) module.exports = content.locals;
// Hot Module Replacement
if (false) {
	// When the styles change, update the <style> tags
	if (!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./index.css", function () {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./index.css");
			if (typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function () {
		update();
	});
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if (typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {};
options.transform = transform;
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if (content.locals) module.exports = content.locals;
// Hot Module Replacement
if (false) {
	// When the styles change, update the <style> tags
	if (!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./index.css", function () {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./index.css");
			if (typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function () {
		update();
	});
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Check if an object is empty.
 * @param {Object, string}
 * @returns {bool}
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {
  // null and undefined are "empty"
  if (obj === null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}

function isProd() {
  return "development" === 'production';
}

function logger(msg) {
  if (!isProd()) {
    console.log(msg);
  }
}

/**
 * Check if browser location service is present
 * @param {null}
 * @returns {bool}
 */
function hasLocationService() {
  return navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition;
}

module.exports = {
  isEmpty: isEmpty,
  isProd: isProd,
  logger: logger,
  hasLocationService: hasLocationService
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
      var callbackResult = Object.prototype.toString.call(options.callback) === '[object Function]' ? options.callback(event) : undefined;
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
      var key = pfx ? pfx + '[' + prop + ']' : prop;
      var val = obj[prop];
      results.push((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? serialize(val, key) : encodeURIComponent(key) + '=' + encodeURIComponent(val));
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
  var src = options.url + (options.url.indexOf('?') !== -1 ? '&' : '?') + 'callback=' + options.callback + '&' + serialize(options.data);
  /* perform the request */
  return injectScript({ src: src });
}

// exports
module.exports = {
  request: request
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Serializes an object to a query string; ensures each key is not null.
 * @memberOf serialize
 * @category serialize
 * @param {Object} obj Required.
 * @returns {String} String.
 */
module.exports = function (obj) {
  var str = [];
  if (!obj) {
    return '';
  }
  for (var p in obj) {
    if (obj.hasOwnProperty(p) && obj[p] !== null) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }
  return str.join('&');
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// webpack begins its journey here
window['lyftWebModal'] = __webpack_require__(7);
window['lyftWebButton'] = __webpack_require__(6);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "/* medium styles */\n.lyft-web-button {\n  cursor: pointer;\n  padding: 5px 10px;\n  color: #000000; /* white */\n  font-family: sans-serif;\n  background-color: #FFFFFF; /* black */\n  border: none;\n  -webkit-border-radius: 8px;\n     -moz-border-radius: 8px;\n          border-radius: 8px;\n}\n.lyft-web-button:hover {\n  background-color: #E6E6E6; /* reduce brightness by 10% */\n}\n.lyft-web-button > .lyft-logo {\n  display: inline-block;\n  width: 48px;\n  height: 35px;\n  margin-top: 4px;\n  vertical-align: middle;\n}\n.lyft-web-button > .lyft-logo > svg {\n  width: 48px; /* fix svg rendering for IE */\n  height: 35px; /* fix svg rendering for IE */\n}\n.lyft-web-button > .cta-eta {\n  display: inline-block;\n  margin-left: 10px;\n  text-align: left;\n  vertical-align: middle;\n}\n.lyft-web-button > .cta-eta > .cta {\n  display: block;\n  font-size: 24px;\n  font-weight: 300;\n}\n.lyft-web-button > .cta-eta > .eta {\n  display: block;\n  font-size: 14px;\n  font-weight: 300;\n}\n.lyft-web-button > .arrow-icon {\n  display: inline-block;\n  width: 18px;\n  height: 19px; /* add 1px to prevent clipping */\n  margin-left: 10px;\n  vertical-align: middle;\n}\n.lyft-web-button > .arrow-icon > svg {\n  width: 18px; /* fix svg rendering for IE */\n  height: 19px; /* fix svg rendering for IE */\n}\n.lyft-web-button > .price-range {\n  display: inline-block;\n  margin-left: 4px;\n  vertical-align: middle;\n  font-size: 14px;\n  font-weight: 300;\n}\n\n/* small styles */\n.lyft-web-button.small {\n  padding: 4px 8px;\n}\n.lyft-web-button.small > .lyft-logo {\n  width: 32px;\n  height: 23px;\n}\n.lyft-web-button.small > .lyft-logo > svg {\n  width: 32px; /* fix svg rendering for IE */\n  height: 23px; /* fix svg rendering for IE */\n}\n.lyft-web-button.small > .cta-eta {\n  margin-left: 8px;\n}\n.lyft-web-button.small > .cta-eta > .cta {\n  display: none;\n}\n.lyft-web-button.small > .cta-eta > .eta {\n  font-size: 20px;\n}\n.lyft-web-button.small > .arrow-icon {\n  display: none;\n}\n.lyft-web-button.small > .price-range {\n  display: none;\n}\n\n/* large styles */\n.lyft-web-button.large {\n  padding: 18px 20px;\n}\n.lyft-web-button.large > .lyft-logo {\n  width: 55px;\n  height: 40px;\n}\n.lyft-web-button.large > .lyft-logo > svg {\n  width: 55px; /* fix svg rendering for IE */\n  height: 40px; /* fix svg rendering for IE */\n}\n.lyft-web-button.large > .cta-eta {\n  margin-left: 20px;\n}\n.lyft-web-button.large > .cta-eta > .cta {\n  font-size: 30px;\n}\n.lyft-web-button.large > .cta-eta > .eta {\n  font-size: 20px;\n}\n.lyft-web-button.large > .arrow-icon {\n  margin-left: 20px;\n}\n.lyft-web-button.large > .price-range {\n  font-size: 20px;\n}\n\n/* hot-pink */\n.lyft-web-button.hot-pink {\n  color: #FFFFFF; /* white */\n  background-color: #FF00BF; /* pink */\n}\n.lyft-web-button.hot-pink:hover {\n  background-color: #E600AC; /* reduce brightness by 10% */\n}\n.lyft-web-button.hot-pink > .lyft-logo > svg > path {\n  fill: #FFFFFF; /* white */\n}\n.lyft-web-button.hot-pink > .arrow-icon > svg > path {\n  fill: #FFFFFF; /* white */\n}\n\n/* mulberry-dark */\n.lyft-web-button.mulberry-dark {\n  color: #FFFFFF; /* white */\n  background-color: #352384; /* mulberry */\n}\n.lyft-web-button.mulberry-dark:hover {\n  background-color: #2B1C6B; /* reduce brightness by 10% */\n}\n.lyft-web-button.mulberry-dark > .lyft-logo > svg > path {\n  fill: #FFFFFF; /* white */\n}\n.lyft-web-button.mulberry-dark > .arrow-icon > svg > path {\n  fill: #FFFFFF; /* white */\n}\n\n/* mulberry-light */\n.lyft-web-button.mulberry-light {\n  color: #352384; /* mulberry */\n  background-color: #FFFFFF; /* white */\n}\n.lyft-web-button.mulberry-light:hover {\n  background-color: #E6E6E6; /* reduce brightness by 10% */\n}\n.lyft-web-button.mulberry-light > .lyft-logo > svg > path {\n  fill: #352384; /* mulberry */\n}\n.lyft-web-button.mulberry-light > .arrow-icon > svg > path {\n  fill: #352384; /* mulberry */\n}\n\n/* multicolor */\n.lyft-web-button.multicolor {\n  color: #000000; /* black */\n  background-color: #FFFFFF; /* white */\n}\n.lyft-web-button.multicolor:hover {\n  background-color: #E6E6E6; /* reduce brightness by 10% */\n}\n.lyft-web-button.multicolor > .lyft-logo > svg > path {\n  fill: #FF00BF; /* pink */\n}\n.lyft-web-button.multicolor > .arrow-icon > svg > path {\n  fill: #000000; /* white */\n}\n", ""]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "/* small-to-medium screen styles */\n.lyft-web-modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 1;\n  display: block;\n  visibility: hidden;\n  opacity: 0;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  overflow: auto;\n  background-color: rgb(0,0,0);\n  background-color: rgba(0,0,0,0.4);\n  -webkit-transition: visibility 0.4s, opacity 0.4s;\n     -moz-transition: visibility 0.4s, opacity 0.4s;\n       -o-transition: visibility 0.4s, opacity 0.4s;\n          transition: visibility 0.4s, opacity 0.4s;\n}\n.lyft-web-modal.on {\n  visibility: visible;\n  opacity: 1;\n}\n.lyft-web-modal > .content {\n  position: relative;\n  top: -300px;\n  left: 0;\n  right: 0;\n  opacity: 0;\n  width: 100%;\n  max-width: 320px;\n  margin: 20px auto 0 auto;\n  padding: 0;\n  color: #000000;\n  font-family: sans-serif;\n  text-align: center;\n  background-color: #FFFFFF;\n  border: none;\n  -webkit-border-radius: 8px;\n     -moz-border-radius: 8px;\n          border-radius: 8px;\n  -webkit-box-shadow: 0 0 5px rgba(0,0,0,0.3);\n     -moz-box-shadow: 0 0 5px rgba(0,0,0,0.3);\n          box-shadow: 0 0 5px rgba(0,0,0,0.3);\n  -webkit-transition: top 0.4s, opacity 0.4s;\n     -moz-transition: top 0.4s, opacity 0.4s;\n       -o-transition: top 0.4s, opacity 0.4s;\n          transition: top 0.4s, opacity 0.4s;\n}\n.lyft-web-modal.on > .content {\n  top: 0;\n  opacity: 1;\n}\n.lyft-web-modal > .content > .map-container {\n  width: 100%;\n  height: 150px; /* background-image src will be 300px */\n  background-color: #EEEEEE;\n  background-position: center top; /* bump the marker down by 150px */\n  background-repeat: no-repeat;\n  background-size: 167% 167%;\n  -webkit-border-radius: 8px 8px 0 0;\n     -moz-border-radius: 8px 8px 0 0;\n          border-radius: 8px 8px 0 0;\n}\n.lyft-web-modal > .content > .map-container > .map-label {\n  display: inline-block;\n  max-width: 300px;\n  margin: 10px auto 0 auto;\n  padding: 5px;\n  background-color: #FFFFFF;\n  -webkit-border-radius: 5px;\n     -moz-border-radius: 5px;\n          border-radius: 5px;\n  -webkit-box-shadow: 0 0 5px rgba(0,0,0,0.3);\n     -moz-box-shadow: 0 0 5px rgba(0,0,0,0.3);\n          box-shadow: 0 0 5px rgba(0,0,0,0.3);\n}\n.lyft-web-modal > .content > .map-container > .map-label > .map-label-name {\n  display: block;\n  font-size: 14px;\n  font-weight: 700;\n}\n.lyft-web-modal > .content > .map-container > .map-label > .map-label-description {\n  display: block;\n  margin-top: 5px;\n  font-size: 10px;\n  font-weight: 300;\n}\n.lyft-web-modal > .content > .map-container > .map-marker {\n  margin-top: 13px;\n}\n.lyft-web-modal > .content > .map-container > .map-marker > svg {\n  display: inline-block;\n  width: 40px;\n  height: 64px;\n}\n.lyft-web-modal > .content > .frame-container {\n  position: relative;\n}\n.lyft-web-modal > .content > .frame-container > .frame-before {\n  position: static;\n  z-index: 1;\n  padding: 10px;\n  visibility: hidden;\n  opacity: 0;\n  -webkit-transition: visibility 0.4s, opacity 0.4s;\n     -moz-transition: visibility 0.4s, opacity 0.4s;\n       -o-transition: visibility 0.4s, opacity 0.4s;\n          transition: visibility 0.4s, opacity 0.4s;\n}\n.lyft-web-modal > .content > .frame-container > .frame-before.on {\n  visibility: visible;\n  opacity: 1;\n}\n.lyft-web-modal > .content > .frame-container > .frame-after {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  z-index: 2;\n  padding: 10px;\n  visibility: hidden;\n  opacity: 0;\n  -webkit-transition: visibility 0.4s, opacity 0.4s;\n     -moz-transition: visibility 0.4s, opacity 0.4s;\n       -o-transition: visibility 0.4s, opacity 0.4s;\n          transition: visibility 0.4s, opacity 0.4s;\n}\n.lyft-web-modal > .content > .frame-container > .frame-after.on {\n  visibility: visible;\n  opacity: 1;\n}\n.lyft-web-modal > .content .lyft-logo-tile-container > .lyft-logo-tile {\n  display: inline-block;\n  width: 40px;\n  height: 40px;\n  vertical-align: middle;\n  background-color: #FF00BF;\n  background-image: -webkit-linear-gradient(top left, #FF00BF, #B80B8C);\n  background-image: -moz-linear-gradient(top left, #FF00BF, #B80B8C);\n  background-image: -o-linear-gradient(top left, #FF00BF, #B80B8C);\n  background-image: linear-gradient(to bottom right, #FF00BF, #B80B8C);\n  border: none;\n  -webkit-border-radius: 5px;\n     -moz-border-radius: 5px;\n          border-radius: 5px;\n}\n.lyft-web-modal > .content .lyft-logo-tile-container > .lyft-logo-tile > svg {\n  display: inline-block;\n  width: 30px;\n  height: 21px;\n  margin: 11px 0 0 0;\n  fill: #FFFFFF;\n}\n.lyft-web-modal > .content .circle-check-icon-container > .circle-check-icon {\n  display: inline-block;\n  width: 40px;\n  height: 40px;\n  vertical-align: middle;\n  background-color: #FF00BF;\n  background-image: -webkit-linear-gradient(top left, #FF00BF, #B80B8C);\n  background-image: -moz-linear-gradient(top left, #FF00BF, #B80B8C);\n  background-image: -o-linear-gradient(top left, #FF00BF, #B80B8C);\n  background-image: linear-gradient(to bottom right, #FF00BF, #B80B8C);\n  border: none;\n  -webkit-border-radius: 50%;\n     -moz-border-radius: 50%;\n          border-radius: 50%;\n}\n.lyft-web-modal > .content .circle-check-icon-container > .circle-check-icon > svg {\n  display: inline-block;\n  width: 30px;\n  height: 30px;\n  margin: 5px 0 0 0;\n  fill: #FFFFFF;\n}\n.lyft-web-modal > .content .text-container {\n  margin-top: 10px;\n}\n.lyft-web-modal > .content .text-container > h1 {\n  margin: 0 0 0 0;\n  color: #352384;\n  font-size: 20px;\n  font-weight: 500;\n}\n.lyft-web-modal > .content .text-container > p {\n  width: 100%;\n  max-width: 320px;\n  margin: 5px auto 0 auto;\n  color: #000000;\n  font-size: 14px;\n  font-weight: 300;\n}\n.lyft-web-modal > .content .message-form-container {\n  margin-top: 10px;\n}\n.lyft-web-modal > .content .message-form-container > form > .message-form-input {\n  /* lyft style attributes */\n  -webkit-appearance: none;\n  height: 36px;\n  color: #333447;\n  font-size: 16px;\n  font-weight: lighter;\n  text-align: center;\n  text-transform: none;\n  line-height: 1.428571429;\n  vertical-align: middle;\n  background-color: #FFFFFF;\n  background-image: none;\n  border: 1px solid #CCCCCC;\n  -webkit-border-radius: 5px;\n     -moz-border-radius: 5px;\n          border-radius: 5px;\n  -webkit-box-shadow: none;\n     -moz-box-shadow: none;\n          box-shadow: none;\n  /* element-specific attributes */\n  width: 100%;\n  max-width: 298px; /* manually correct for border */\n  margin: 0 0 0 0;\n  padding: 0 0 0 0;\n}\n.lyft-web-modal > .content .message-form-container > form > .message-form-button {\n  /* lyft style attributes */\n  -webkit-appearance: button;\n  cursor: pointer;\n  height: 40px;\n  color: #FFFFFF;\n  font-size: 16px;\n  font-weight: 500;\n  text-align: center;\n  text-transform: none;\n  line-height: 1.428571429;\n  vertical-align: middle;\n  background-color: #FF00BF;\n  background-image: -webkit-linear-gradient(top left, #FF00BF, #B80B8C);\n  background-image: -moz-linear-gradient(top left, #FF00BF, #B80B8C);\n  background-image: -o-linear-gradient(top left, #FF00BF, #B80B8C);\n  background-image: linear-gradient(to bottom right, #FF00BF, #B80B8C);\n  border: none;\n  -webkit-border-radius: 5px;\n     -moz-border-radius: 5px;\n          border-radius: 5px;\n  /* element-specific attributes */\n  width: 100%;\n  max-width: 300px;\n  margin: 5px 0 0 0;\n}\n.lyft-web-modal > .content .message-form-container > form > .message-form-button:hover {\n  background-color: #E600AC; /* reduce brightness by 10% */\n  background-image: -webkit-linear-gradient(top left, #E600AC, #9E0978);\n  background-image: -moz-linear-gradient(top left, #E600AC, #9E0978);\n  background-image: -o-linear-gradient(top left, #E600AC, #9E0978);\n  background-image: linear-gradient(to bottom right, #E600AC, #9E0978);\n}\n.lyft-web-modal > .content .open-app-container {\n  margin-top: 10px;\n}\n.lyft-web-modal > .content .open-app-container > .open-app-separator {\n  display: block;\n  margin: 0 0 0 0;\n  color: #000000;\n  font-size: 14px;\n  font-weight: 300;\n}\n.lyft-web-modal > .content .open-app-container > .open-app-cta {\n  display: inline-block;\n  margin-top: 10px;\n  color: #FF00BF;\n  font-size: 14px;\n  text-decoration: none;\n}\n.lyft-web-modal > .footer {\n  text-align: center;\n}\n.lyft-web-modal > .footer > .close {\n  display: inline-block;\n  margin-top: 20px;\n  color: #FFFFFF;\n  font-family: Arial, sans-serif;\n  font-size: 36px;\n  text-decoration: none;\n}\n\n/* large-to-very-large screen styles */\n@media(min-width:768px) {\n  .lyft-web-modal > .content {\n    max-width: 640px;\n    margin: 40px auto 0 auto;\n  }\n  .lyft-web-modal > .content > .map-container {\n    height: 200px;\n    background-size: auto;\n  }\n  .lyft-web-modal > .content > .map-container > .map-label {\n    margin: 20px auto 0 auto;\n    padding: 10px;\n  }\n  .lyft-web-modal > .content > .map-container > .map-label > .map-label-name {\n    font-size: 16px;\n  }\n  .lyft-web-modal > .content > .map-container > .map-label > .map-label-description {\n    font-size: 12px;\n  }\n  .lyft-web-modal > .content > .frame-container > .frame-before {\n    padding: 15px;\n  }\n  .lyft-web-modal > .content > .frame-container > .frame-after {\n    padding: 15px;\n  }\n  .lyft-web-modal > .content .lyft-logo-tile-container > .lyft-logo-tile {\n    width: 64px;\n    height: 64px;\n  }\n  .lyft-web-modal > .content .lyft-logo-tile-container > .lyft-logo-tile > svg {\n    width: 45px;\n    height: 32px;\n    margin: 17px 0 0 0;\n  }\n  .lyft-web-modal > .content .circle-check-icon-container > .circle-check-icon {\n    width: 64px;\n    height: 64px;\n  }\n  .lyft-web-modal > .content .circle-check-icon-container > .circle-check-icon > svg {\n    width: 42px;\n    height: 42px;\n    margin: 10px 0 0 0;\n  }\n  .lyft-web-modal > .content .text-container {\n    margin-top: 20px;\n  }\n  .lyft-web-modal > .content .text-container > h1 {\n    font-size: 24px;\n  }\n  .lyft-web-modal > .content .text-container > p {\n    margin: 10px auto 0 auto;\n    font-size: 16px;\n  }\n  .lyft-web-modal > .content .message-form-container {\n    margin-top: 20px;\n  }\n  .lyft-web-modal > .content .message-form-container > form > .message-form-input {\n    max-width: 318px; /* manually correct for border */\n  }\n  .lyft-web-modal > .content .message-form-container > form > .message-form-button {\n    max-width: 320px;\n    margin: 10px 0 0 0;\n  }\n  .lyft-web-modal > .content .open-app-container {\n    margin-top: 20px;\n  }\n  .lyft-web-modal > .content .open-app-container > .open-app-separator {\n    font-size: 16px;\n  }\n  .lyft-web-modal > .content .open-app-container > .open-app-cta {\n    margin-top: 20px;\n    font-size: 16px;\n  }\n  .lyft-web-modal > .footer > .close {\n    font-size: 48px;\n  }\n}\n", ""]);

// exports


/***/ })
/******/ ]);