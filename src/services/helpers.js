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
  if (typeof obj !== 'object') return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}

function isProd() {
  return process.env.NODE_ENV === 'production';
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
  isEmpty,
  isProd,
  logger,
  hasLocationService
};
