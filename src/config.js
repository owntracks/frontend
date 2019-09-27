import deepmerge from "deepmerge";

const endDate = new Date();
endDate.setUTCHours(0);
endDate.setUTCMinutes(0);
endDate.setUTCSeconds(0);

const startDate = new Date(endDate);
startDate.setUTCMonth(startDate.getMonth() - 1);

const DEFAULT_CONFIG = {
  api: {
    // API base URL, defaults to the same domain. Keep CORS in mind.
    baseUrl: `${window.location.protocol}//${window.location.host}`,
  },
  accentColor: "#478db2",
  // Initial start and end date. Doesn't have to be hardcoded, see
  // above. Defaults to one month ago - today.
  startDate,
  endDate,
  // User and device selected by default. Set to null to show all by default.
  selectedUser: null,
  selectedDevice: null,
  map: {
    // Initial map center position
    center: { lat: 0, lng: 0 },
    // Initial map zoom
    zoom: 19,
    // This is being used to fetch tiles in different resolutions -
    // set to the highest value the configured tileserver supports.
    maxNativeZoom: 19,
    // Allow zooming closer than the tile server supports, which will
    // result in (slightly) blurry tiles on higher zoom levels. Set
    // to the same value as `maxNativeZoom` to disable.
    maxZoom: 21,
    // Tile server URL. See Leaflet documentation for more info.
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    // Leaflet map controls. Options should be self-explanatory.
    controls: {
      zoom: {
        display: true,
        position: "topleft",
      },
      scale: {
        display: true,
        position: "bottomleft",
        maxWidth: 200,
        metric: true,
        imperial: true,
      },
    },
    // `color` and `fillColor` default to `accentColor` when null.
    polyline: {
      color: null,
      fillColor: "transparent",
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
    // Configuration for the heatmap (simpleheat). See
    // https://github.com/mourner/simpleheat for more info.
    heatmap: {
      max: 20,
      radius: 25,
      blur: 15,
      // Uses simpleheat's default gradient when null. See
      // https://github.com/mourner/simpleheat/blob/c1998c36fa2f9a31350371fd42ee30eafcc78f9c/simpleheat.js#L22-L28
      gradient: null,
    },
    // Which layers to show by default. The source of truth at runtime
    // is the Vuex store, which is initialised from these values and
    // the query parameters, in that order.
    layers: {
      last: true,
      line: true,
      points: false,
      heatmap: false,
    },
    // Maximum distance (in meters) between points for them to be part
    // of the the same line. This avoids straight lines going across
    // the map when there's a large distance between two points (which
    // usually indicates that they're not related). Set to Infinity to
    // disable splitting into separate lines.
    maxPointDistance: 1000,
  },
  // Remove the ping/ping location which is enabled in the recorder's
  // Docker image for health checks by default:
  // https://github.com/owntracks/recorder/issues/195#issuecomment-304004436
  ignorePingLocation: true,
};

// Use deepmerge to combine the default and user-defined configuration.
// This enables the user to use a fairly small config object which only
// needs to contain actual changes, not all default values - and these
// stay up-to-date automatically.
// There might not be a user-defined config, default to an empty object.
export default deepmerge(DEFAULT_CONFIG, (window.owntracks || {}).config || {});
