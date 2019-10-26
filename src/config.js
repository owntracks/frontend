import deepmerge from "deepmerge";

const endDate = new Date();
endDate.setUTCHours(0, 0, 0, 0);

const startDate = new Date(endDate);
startDate.setUTCMonth(startDate.getMonth() - 1);

const DEFAULT_CONFIG = {
  api: {
    baseUrl: `${window.location.protocol}//${window.location.host}`,
  },
  endDate,
  ignorePingLocation: true,
  map: {
    attribution:
      '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    center: {
      lat: 0,
      lng: 0,
    },
    circle: {
      color: null,
      fillColor: null,
      fillOpacity: 0.2,
    },
    circleMarker: {
      color: null,
      fillColor: "#fff",
      fillOpacity: 1,
      radius: 4,
    },
    controls: {
      scale: {
        display: true,
        imperial: true,
        maxWidth: 200,
        metric: true,
        position: "bottomleft",
      },
      zoom: {
        display: true,
        position: "topleft",
      },
    },
    heatmap: {
      blur: 15,
      gradient: null,
      max: 20,
      radius: 25,
    },
    layers: {
      heatmap: false,
      last: true,
      line: true,
      points: false,
    },
    maxNativeZoom: 19,
    maxPointDistance: null,
    maxZoom: 21,
    polyline: {
      color: null,
      fillColor: "transparent",
    },
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    zoom: 19,
  },
  primaryColor: "#3f51b5",
  selectedDevice: null,
  selectedUser: null,
  startDate,
  verbose: false,
};

// Use deepmerge to combine the default and user-defined configuration.
// This enables the user to use a fairly small config object which only
// needs to contain actual changes, not all default values - and these
// stay up-to-date automatically.
// There might not be a user-defined config, default to an empty object.
export default deepmerge(DEFAULT_CONFIG, (window.owntracks || {}).config || {});
