/* eslint max-len: 0 */

/**
 * A coordinate with latitude and longitude.
 *
 * @typedef Coordinate
 * @type {(Object|L.LatLng)}
 * @property {Number} lat Latitude
 * @property {Number} lng Longitude
 */

/**
 * Vuex state.
 *
 * @typedef {Object.<String, *>} State
 */

/**
 * URL query parameter object.
 *
 * @typedef {Object.<String, *>} QueryParams
 */

/**
 * @typedef {Object} DatepickerConfig
 * @property {Function} DatepickerConfig.customPredictor Custom predictor function
 */

/**
 * A user's name.
 *
 * @typedef {String} User
 */

/**
 * A device's name.
 *
 * @typedef {String} Device
 */

/**
 * A last location object.
 *
 * @typedef {Object.<String, *>} LastLocation
 */

/**
 * An array of location history objects
 *
 * @typedef {Array.<Object.<String, *>>} LocationHistory
 */

/**
 * Multiple arrays of location history objects mapped to user and devices.
 *
 * @typedef {Object.<User, Object.<Device, LocationHistory>>} MultiLocationHistory
 */
