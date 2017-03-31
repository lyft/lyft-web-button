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
  for (var p in obj)    {
    if (obj.hasOwnProperty(p) && obj[p] !== null) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }
  return str.join('&');
};
