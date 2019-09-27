import config from "@/config";
import { ISO_DATE_REGEXP, EARTH_RADIUS_IN_KM } from "@/constants";

export const getApiUrl = path => new URL(`${config.api.baseUrl}${path}`);
export const isIsoDate = s => ISO_DATE_REGEXP.test(s);
export const degreesToRadians = degrees => (degrees * Math.PI) / 180;

// https://stackoverflow.com/a/365853/5952681
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
