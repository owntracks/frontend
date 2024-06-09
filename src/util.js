import moment from "moment";

import config from "@/config";
import { DATE_TIME_FORMAT, EARTH_RADIUS_IN_KM } from "@/constants";

/**
 * Get a complete URL for any API resource, taking the
 * base URL configuration into account.
 *
 * @param {String} path Path to the API resource
 * @returns {URL} Final API URL
 */
export const getApiUrl = (path) => {
  const normalizedBaseUrl = config.api.baseUrl.endsWith("/")
    ? config.api.baseUrl.slice(0, -1)
    : config.api.baseUrl;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(`${normalizedBaseUrl}${normalizedPath}`);
};

/**
 * Check if the given string is an ISO 8601 YYYY-MM-DDTHH:MM:SS datetime.
 *
 * @param {String} s Input value to be tested
 * @returns {Boolean} Whether the input matches the expected format
 */
export const isIsoDateTime = (s) => moment(s, DATE_TIME_FORMAT, true).isValid();

/**
 * Convert degrees to radians.
 *
 * @param {Number} degrees Angle in degrees
 * @returns {Number} Angle in radians
 */
export const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;

/**
 * Calculate the distance between two coordinates. Uses the haversine formula,
 * which is not 100% accurate - but that's not the goal here.
 *
 * https://en.wikipedia.org/wiki/Haversine_formula
 *
 * @param {Coordinate} c1 First coordinate
 * @param {Coordinate} c2 Second coordinate
 * @returns {Number} Distance in meters
 */
export const distanceBetweenCoordinates = (c1, c2) => {
  const r = EARTH_RADIUS_IN_KM * 1000;
  const phi1 = degreesToRadians(c1.lat);
  const phi2 = degreesToRadians(c2.lat);
  const lambda1 = degreesToRadians(c1.lng);
  const lambda2 = degreesToRadians(c2.lng);
  const d =
    2 *
    r *
    Math.asin(
      Math.sqrt(
        Math.sin((phi2 - phi1) / 2) ** 2 +
          Math.cos(phi1) *
            Math.cos(phi2) *
            Math.sin((lambda2 - lambda1) / 2) ** 2
      )
    );
  return d;
};

/**
 * Format a distance in meters into a human-readable string with unit.
 *
 * This only supports m / km for now, but could read a config option and return
 * ft / mi.
 *
 * @param {Number} distance Distance in meters
 * @returns {String} Formatted string including unit
 */
export const humanReadableDistance = (distance) => {
  let unit = "m";
  if (Math.abs(distance) >= 1000) {
    distance = distance / 1000;
    unit = "km";
  }
  return `${distance.toLocaleString(config.locale, {
    maximumFractionDigits: 1,
  })} ${unit}`;
};

/**
 * Get the total number of locations from a nested location history.
 *
 * @param {LocationHistory} locationHistory Location history
 * @returns {Number} Total number of locations
 */
export const getLocationHistoryCount = (locationHistory) =>
  Object.keys(locationHistory)
    .map((user) =>
      Object.keys(locationHistory[user])
        .map((device) => locationHistory[user][device].length)
        .reduce((a, b) => a + b, 0)
    )
    .reduce((a, b) => a + b, 0);
