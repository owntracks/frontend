import L from "leaflet";

import config from "@/config";
import { distanceBetweenCoordinates } from "@/util";

/**
 * From the selected users' and devices' location histories, create an
 * array of all coordinates.
 *
 * @param {State} state
 * @param {MultiLocationHistory} state.locationHistory
 *   Location history of selected users and devices
 * @returns {L.LatLng[]} All coordinates
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
 * @param {MultiLocationHistory} state.locationHistory
 *   Location history of selected users and devices
 * @returns {L.LatLng[][]} Groups of coherent coordinates
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
        if (
          typeof config.map.maxPointDistance === "number" &&
          config.map.maxPointDistance > 0 &&
          latLngs.length > 0
        ) {
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

export default {
  locationHistoryLatLngs,
  locationHistoryLatLngGroups,
};
