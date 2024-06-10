import deepmerge from "deepmerge";

const endDateTime = new Date();
endDateTime.setHours(23, 59, 59, 0);

const startDateTime = new Date(endDateTime);
startDateTime.setMonth(startDateTime.getMonth() - 1);
startDateTime.setHours(0, 0, 0, 0);

const DEFAULT_CONFIG = {
  api: {
    baseUrl: `${window.location.protocol}//${window.location.host}`,
    fetchOptions: {},
  },
  endDateTime,
  filters: {
    minAccuracy: null,
  },
  ignorePingLocation: true,
  locale: "en-US",
  map: {
    attribution:
      '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
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
      poi: true,
      points: false,
    },
    maxNativeZoom: 19,
    maxPointDistance: null,
    maxZoom: 21,
    poiMarker: {
      color: "red",
      fillColor: "red",
      fillOpacity: 0.2,
      radius: 12,
    },
    polyline: {
      color: null,
      fillColor: "transparent",
    },
    tileSize: 256,
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    zoomOffset: 0,
  },
  onLocationChange: {
    fitView: false,
    reloadHistory: false,
  },
  primaryColor: "#3f51b5",
  router: {
    basePath: "/",
  },
  selectedDevice: null,
  selectedUser: null,
  showDistanceTravelled: true,
  startDateTime,
  verbose: false,
};

// Use deepmerge to combine the default and user-defined configuration.
// This enables the user to use a fairly small config object which only
// needs to contain actual changes, not all default values - and these
// stay up-to-date automatically.
// There might not be a user-defined config, default to an empty object.
export default deepmerge(DEFAULT_CONFIG, (window.owntracks || {}).config || {});
