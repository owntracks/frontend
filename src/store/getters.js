import L from "leaflet";

import config from "@/config";
import { distanceBetweenCoordinates } from "@/util";

/** @typedef {import("./types").State} State */
/** @typedef {import("./types").MultiLocationHistory} MultiLocationHistory */
/** @typedef {import("./types").DatepickerConfig} DatepickerConfig */

/**
 * From the selected users' and devices' location histories, create an
 * array of all coordinates.
 *
 * @param {State} state
 * @param {MultiLocationHistory} state.locationHistory Location history of selected users and devices
 * @return {Array.<L.LatLng>} All coordinates
 */
const locationHistoryLatLngs = state => {
  const latLngs = [];
  Object.keys(state.locationHistory).forEach(user => {
    Object.keys(state.locationHistory[user]).forEach(device => {
      state.locationHistory[user][device].forEach(coordinate => {
        latLngs.push(L.latLng(coordinate.lat, coordinate.lon));
      });
    });
  });
  return latLngs;
};

/**
 * From the selected users' and devices' location histories, create an
 * array of coordinate groups where the distance between two subsequent
 * coordinates does not exceed `config.map.maxPointDistance`.
 *
 * @param {State} state
 * @param {MultiLocationHistory} state.locationHistory Location history of selected users and devices
 * @return {Array.<Array.<L.LatLng>>} Groups of coherent coordinates
 */
const locationHistoryLatLngGroups = state => {
  const groups = [];
  Object.keys(state.locationHistory).forEach(user => {
    Object.keys(state.locationHistory[user]).forEach(device => {
      let latLngs = [];
      state.locationHistory[user][device].forEach(coordinate => {
        const latLng = L.latLng(coordinate.lat, coordinate.lon);
        // Skip if group splitting is disabled or this is the first
        // coordinate in the current group
        if (config.map.maxPointDistance !== null && latLngs.length > 0) {
          const lastLatLng = latLngs.slice(-1)[0];
          if (
            distanceBetweenCoordinates(lastLatLng, latLng) >
            config.map.maxPointDistance
          ) {
            // Distance is too far, start new group of coordinate
            groups.push(latLngs);
            latLngs = [];
          }
        }
        // Add coordinate to current active group
        latLngs.push(latLng);
      });
      groups.push(latLngs);
    });
  });
  return groups;
};

/**
 * For the start date selector, disable all dates above the end date
 * or current date.
 *
 * @param {State} state
 * @param {Date} state.endDate End date
 * @return {DatepickerConfig} Configuration for the `disabled-dates` prop of the `vuejs-datepicker` component
 */
const startDateDisabledDates = state => {
  return {
    customPredictor: date => date > state.endDate || date > new Date(),
  };
};

/**
 * For the end date selector, disable all dates below the start date
 * or above the current date.
 *
 * @param {State} state
 * @param {Date} state.startDate Start date
 * @return {DatepickerConfig} Configuration for the `disabled-dates` prop of the `vuejs-datepicker` component
 */
const endDateDisabledDates = state => {
  return {
    customPredictor: date => date < state.startDate || date > new Date(),
  };
};

export default {
  locationHistoryLatLngs,
  locationHistoryLatLngGroups,
  startDateDisabledDates,
  endDateDisabledDates,
};
