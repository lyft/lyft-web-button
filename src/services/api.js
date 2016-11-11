// dependencies
var jsonp = require('./jsonp.js');

// constants
var SERVER_URL         = 'http://www.lyft.com/api/jsonp';
var GET_COSTS_URL      = SERVER_URL + '/get_costs';
var GET_DRIVERS_URL    = SERVER_URL + '/get_drivers';
var GET_ETAS_URL       = SERVER_URL + '/get_etas';
var GET_RIDE_TYPES_URL = SERVER_URL + '/get_ride_types';
var POST_MESSAGES_URL  = SERVER_URL + '/post_messages';

// configuration
var client_token;
function setClientToken(value) {client_token = value;}

/**
 * Requests JSONP with injected `client_token`.
 * @param {Object} data Required.
 * @param {function} callback Optional.
 * @param {string} url Required.
 */
function requestWithClientToken(data, callback, url) {
  /* build data payload */
  data = data || {};
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
  return requestWithClientToken(data, callback, GET_COSTS_URL);
}

/**
 * Gets `drivers`.
 * @param {Object} data Required.
 * @param {string} data.lat Required.
 * @param {string} data.lng Required.
 * @param {function} callback Optional.
 */
function getDrivers(data, callback) {
  return requestWithClientToken(data, callback, GET_DRIVERS_URL);
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
  return requestWithClientToken(data, callback, GET_ETAS_URL);
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
  return requestWithClientToken(data, callback, GET_RIDE_TYPES_URL);
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
  return requestWithClientToken(data, callback, POST_MESSAGES_URL);
}

// exports
module.exports = {
  getCosts: getCosts,
  getDrivers: getDrivers,
  getEtas: getEtas,
  getRideTypes: getRideTypes,
  postMessages: postMessages,
  setClientToken: setClientToken
};
