// dependencies
var jsonp = require('./jsonp.js');

// constants
var SERVER_URL = 'https://www.lyft.com/api/jsonp';
var GET_COSTS_URL = SERVER_URL + '/get_costs';
var GET_DRIVERS_URL = SERVER_URL + '/get_drivers';
var GET_ETAS_URL = SERVER_URL + '/get_etas';
var GET_RIDE_TYPES_URL = SERVER_URL + '/get_ride_types';
var POST_MESSAGES_URL = SERVER_URL + '/post_messages';

// configuration
var client_id;
function setClientId(value) { client_id = value; }
var client_token;
function setClientToken(value) { client_token = value; }

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
