import config from "@/config";
import { ISO_DATE_REGEXP, EARTH_RADIUS_IN_KM } from "@/constants";

/** @typedef {import("./types").Coordinate} Coordinate */

/**
 * Get a complete URL for any API resource, taking the
 * base URL configuration into account.
 *
 * @param {String} path Path to the API resource
 * @return {URL} Final API URL
 */
export const getApiUrl = path => {
  const normalizedBaseUrl = config.api.baseUrl.endsWith("/")
    ? config.api.baseUrl.slice(1)
    : config.api.baseUrl;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(`${normalizedBaseUrl}${normalizedPath}`);
};

/**
 * Check if the given string is an ISO 8601 YYYY-MM-DD date.
 *
 * @param {String} s Input value to be tested
 * @return {Boolean} Whether the input is an ISO 8601 date
 */
export const isIsoDate = s => ISO_DATE_REGEXP.test(s);

/**
 * Convert degrees to radians.
 *
 * @param {Number} degrees Angle in degrees
 * @return {Number} Angle in radians
 */
export const degreesToRadians = degrees => (degrees * Math.PI) / 180;

/**
 * Calculate the distance between two coordinates.
 * https://stackoverflow.com/a/365853/5952681
 *
 * @param {Coordinate} c1 First coordinate
 * @param {Coordinate} c2 Second coordinate
 * @return {Number} Distance in meters
 */
export const distanceBetweenCoordinates = (c1, c2) => {
  const latDistanceInRad = degreesToRadians(c1.lat - c2.lat);
  const lngDistanceInRad = degreesToRadians(c1.lng - c2.lng);
  const lat1InRad = degreesToRadians(c1.lat);
  const lat2InRad = degreesToRadians(c2.lat);
  const a =
    Math.sin(latDistanceInRad / 2) * Math.sin(latDistanceInRad / 2) +
    Math.sin(lngDistanceInRad / 2) *
      Math.sin(lngDistanceInRad / 2) *
      Math.cos(lat1InRad) *
      Math.cos(lat2InRad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Return distance in meters
  return EARTH_RADIUS_IN_KM * c * 1000;
};

/**
 * Let the user download a string as file.
 *
 * @param {String} text Content of the file
 * @param {String} filename Suggested filename for the browser
 * @param {String} [mimeType] Content mime type
 */
export const download = (text, filename, mimeType = "text/plain") => {
  const dataUrl = `data:${mimeType},${encodeURIComponent(text)}`;
  console.log(dataUrl);
  const element = document.createElement("a");
  element.href = dataUrl;
  element.download = filename;
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
