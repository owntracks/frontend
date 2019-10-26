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
 * Calculate the distance between two coordinates. Uses the haversine formula,
 * which is not 100% accurate - but that's not the goal here.
 *
 * https://en.wikipedia.org/wiki/Haversine_formula
 *
 * @param {Coordinate} c1 First coordinate
 * @param {Coordinate} c2 Second coordinate
 * @return {Number} Distance in meters
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
 * Let the user download a string as file.
 *
 * @param {String} text Content of the file
 * @param {String} filename Suggested filename for the browser
 * @param {String} [mimeType] Content mime type
 */
export const download = (text, filename, mimeType = "text/plain") => {
  const dataUrl = `data:${mimeType},${encodeURIComponent(text)}`;
  const element = document.createElement("a");
  element.href = dataUrl;
  element.download = filename;
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
