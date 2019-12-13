# Configuration

## Overview

All _custom_ configuation is stored in `window.owntracks.config`,
which is a regular JavaScript object - so you can use template strings, spread syntax,
comments and other JS features.

Some of the application state is synced to the URL's query parameters. If a parameter
exists in the URL query, it takes precedence over the configured value - otherwise the
configured value will be used and appended to the URL query.

Start with this:

```js
window.owntracks = window.owntracks || {};
window.owntracks.config = {};
```

**WARNING: if your configuration contains private data (most commonly your tile server**
**access key), make sure to protect access to it properly, e.g. with basic authentication.**

## Options

- `api`
  - [`baseUrl`](#apibaseurl)
- [`endDate`](#enddate)
- [`ignorePingLocation`](#ignorepinglocation)
- [`locale`](#locale)
- `map`
  - [`attribution`](#mapattribution)
  - `center`
    - [`lat`](#mapcenterlat)
    - [`lng`](#mapcenterlng)
  - [`circle`](#mapcircle)
  - [`circleMarker`](#mapcirclemarker)
  - `controls`
    - `scale`
      - [`display`](#mapcontrolsscaledisplay)
      - [`imperial`](#mapcontrolsscaleimperial)
      - [`maxWidth`](#mapcontrolsscalemaxwidth)
      - [`metric`](#mapcontrolsscalemetric)
      - [`position`](#mapcontrolsscaleposition)
    - `zoom`
      - [`display`](#mapcontrolszoomdisplay)
      - [`position`](#mapcontrolszoomposition)
  - `heatmap`
    - [`blur`](#mapheatmapblur)
    - [`gradient`](#mapheatmapgradient)
    - [`max`](#mapheatmapmax)
    - [`radius`](#mapheatmapradius)
  - `layers`
    - [`heatmap`](#maplayersheatmap)
    - [`last`](#maplayerslast)
    - [`line`](#maplayersline)
    - [`points`](#maplayerspoints)
  - [`maxNativeZoom`](#mapmaxnativezoom)
  - [`maxPointDistance`](#mapmaxpointdistance)
  - [`maxZoom`](#mapmaxzoom)
  - [`polyline`](#mappolyline)
  - [`url`](#mapurl)
  - [`zoom`](#mapzoom)
- `onLocationChange`
  - [`reloadHistory`](#onlocationchangereloadhistory)
- [`primaryColor`](#primarycolor)
- [`selectedDevice`](#selecteddevice)
- [`selectedUser`](#selecteduser)
- [`startDate`](#startdate)
- [`verbose`](#verbose)

### `api.baseUrl`

Base URL for the recorder's HTTP and WebSocket API. Keep CORS in mind.

- Type: [`String`]
- Default: current protocol and host
- Examples:
  ```js
  // API requests will be made to https://owntracks.example.com/api/0/...
  window.owntracks.config = {
    api: {
      baseUrl: "https://owntracks.example.com"
    }
  };
  ```
  ```js
  // API requests will be made to https://example.com/owntracks/api/0/...
  window.owntracks.config = {
    api: {
      baseUrl: "https://example.com/owntracks/"
    }
  };
  ```

### `endDate`

Initial end date for fetched data.

- Type: [`Date`]
- Default: today
- Example:
  ```js
  // Data will be fetched up to 1970-01-01
  window.owntracks.config = {
    endDate: new Date(1970, 1, 1)
  };
  ```

### `ignorePingLocation`

Remove the `ping/ping` location from the fetched data. This is useful when using the
`owntracks/recorder` Docker image which has it [enabled for health checks by default](https://github.com/owntracks/recorder/issues/195#issuecomment-304004436).

- Type: [`Boolean`]
- Default: `true`
- Example:
  ```js
  // Don't ignore ping/ping location. Not sure why you'd do this :)
  window.owntracks.config = {
    ignorePingLocation: false
  };
  ```

### `locale`

The language to use for the user interface. Available: `de` (German), `en` (English).

- Type: [`String`]
- Default: `"en"`

### `map.attribution`

Attribution for map tiles.

- Type: [`String`] (may contain HTML)
- Default: `"&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors"`
- Example:
  ```js
  // Make sure to add proper attribution!
  window.owntracks.config = {
    map: {
      attribution: "Map tiles &copy; MyTileServerProvider"
    }
  };
  ```

### `map.center.lat`

Initial map center latitude.

- Type: [`Number`]
- Default: `0`

### `map.center.lng`

Initial map center longitude.

- Type: [`Number`]
- Default: `0`

### `map.circle`

Location accuracy indicator configuation. `color` and `fillColor` default to
`primaryColor` if `null`. See [Vue2Leaflet `l-circle` documentation](https://korigan.github.io/Vue2Leaflet/#/components/l-circle/)
for all possible values.

- Type: [`Object`]
- Default:
  ```js
  {
    color: null,
    fillColor: null,
    fillOpacity: 0.2
  }
  ```

### `map.circleMarker`

Location point marker configuation. `color` defaults to `primaryColor` if `null`. See
[Vue2Leaflet `l-circle-marker` documentation](https://korigan.github.io/Vue2Leaflet/#/components/l-circle-marker/)
for all possible values.

- Type: [`Object`]
- Default:
  ```js
  {
    color: null,
    fillColor: "#fff",
    fillOpacity: 1,
    radius: 4
  }
  ```

### `map.controls.scale.display`

Whether to show scale control or not.

- Type: [`Boolean`]
- Default: `true`

### `map.controls.scale.imperial`

Whether to show an imperial scale (ft) or not.

- Type: [`Boolean`]
- Default: `true`

### `map.controls.scale.maxWidth`

Maximum width of the scale control in pixels.

- Type: [`Number`]
- Default: `200`

### `map.controls.scale.metric`

Whether to show an metric scale (m) or not.

- Type: [`Boolean`]
- Default: `true`

### `map.controls.scale.position`

Scale control position on the map. See [Leaflet control position documentation](https://leafletjs.com/reference-1.5.0.html#control-position)
for all possible values.

- Type: [`String`]
- Default: `"bottomleft"`

### `map.controls.zoom.display`

Whether to show zoom control or not.

- Type: [`Boolean`]
- Default: `true`

### `map.controls.zoom.position`

Zoom control position on the map. See [Leaflet control position documentation](https://leafletjs.com/reference-1.5.0.html#control-position)
for all possible values.

- Type: [`String`]
- Default: `"topleft"`

### `map.heatmap.blur`

Heatmap blur radius.

- Type: [`Number`]
- Default: `15`

### `map.heatmap.gradient`

Mapping of values between 0 and 1 to different colors. Defaults to [`simpleheat`'s default gradient](https://github.com/mourner/simpleheat/blob/c1998c36fa2f9a31350371fd42ee30eafcc78f9c/simpleheat.js#L22-L28)
if `null`.

- Type: [`Object`] or `null`
- Default: `null`

### `map.heatmap.max`

Heatmap max data value.

- Type: [`Number`]
- Default: `20`

### `map.heatmap.radius`

Heatmap point radius.

- Type: [`Number`]
- Default: `25`

### `map.layers.heatmap`

Initial visibility of the heatmap layer.

- Type: [`Boolean`]
- Default: `false`

### `map.layers.last`

Initial visibility of the last locations layer.

- Type: [`Boolean`]
- Default: `true`

### `map.layers.line`

Initial visibility of the line layer.

- Type: [`Boolean`]
- Default: `true`

### `map.layers.points`

Initial visibility of the points layer.

- Type: [`Boolean`]
- Default: `false`

### `map.maxNativeZoom`

This is being used to fetch tiles in different resolutions - set to the highest value
the configured tileserver supports.

- Type: [`Number`]
- Default: `19`

### `map.maxPointDistance`

Maximum distance (in meters) between points for them to be part of the the same line.
This avoids straight lines going across the map when there's a ceartain distance between
two points (which often indicates that they're not related). Set to `null` to disable
splitting into separate lines.

- Type: [`Number`] or `null`
- Default: `null`
- Example:
  ```js
  // Don't connect points with a distance of more than 1km
  window.owntracks.config = {
    map: {
      maxPointDistance: 1000
    }
  };
  ```

### `map.maxZoom`

Allow zooming closer than the tile server supports, which will result in (slightly)
blurry tiles on higher zoom levels. Set to the same value as [`map.maxNativeZoom`](#map.maxNativeZoom)
to disable.

- Type: [`Number`]
- Default: `21`

### `map.polyline`

Location point marker configuation. `color` defaults to `primaryColor` if `null`. See
[Vue2Leaflet `l-polyline` documentation](https://korigan.github.io/Vue2Leaflet/#/components/l-polyline/)
for all possible values.

- Type: [`Object`]
- Default:
  ```js
  {
    color: null,
    fillColor: "transparent"
  }
  ```

### `map.url`

Tile server URL. For more information see [Leaflet tile layer documentation](https://leafletjs.com/reference-1.5.0.html#tilelayer-url-template)
and [this Wikipedia article](https://en.wikipedia.org/wiki/Tiled_web_map).

- Type: [`String`]
- Default: `"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"`
- Example:
  ```js
  // Use dark HDPI tiles from Mapbox
  window.owntracks.config = {
    map: {
      url: "https://api.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}@2x.png?access_token=xxxxxxxxxxxxxxxx"
    }
  };
  ```

### `map.zoom`

Initial map zoom level.

- Type: [`Number`]
- Default: `19`

### `onLocationChange.reloadHistory`

Whether to reload the location history (of selected date range) or not when a location
update is received.

- Type: [`Boolean`]
- Default: `false`

### `primaryColor`

Primary color for the user interface (navigation bar and various map elements).

- Type: [`String`] ([CSS `<color>`])
- Default: `"#3f51b5"` (primary color from the OwnTracks Android app)
- Example:
  ```js
  // Set the UI's primary color to 'rebeccapurple'
  window.owntracks.config = {
    primaryColor: "rebeccapurple"
  };
  ```

### `selectedDevice`

Initial selected device. All devices will be shown by default if `null`. Will be ignored
if [`selectedUser`](#selectedUser) is `null`;

Only data for the selected user/device will be fetched, so you can use this to limit the
amount of data fetched after page load.

- Type: [`String`] or `null`
- Default: `null`
- Example:
  ```js
  // Select the device 'phone' from user 'foo' by default
  window.owntracks.config = {
    selectedUser: "foo",
    selectedDevice: "phone"
  };
  ```

### `selectedUser`

Initial selected user. All users will be shown by default if `null`.

Only data for the selected user/device will be fetched, so you can use this to limit the
amount of data fetched after page load.

- Type: [`String`] or `null`
- Default: `null`
- Example:
  ```js
  // Select all devices from user 'foo' by default
  window.owntracks.config = {
    selectedUser: "foo"
  };
  ```

### `startDate`

Initial start date for fetched data.

- Type: [`Date`]
- Default: one month ago
- Example:
  ```js
  // Data will be fetched from the first day of the current month
  const startDate = new Date();
  startDate.setUTCHours(0, 0, 0, 0);
  startDate.setUTCDate(1);
  window.owntracks.config = {
    startDate
  };
  ```

### `verbose`

Whether to enable verbose mode or not.

- Type: [`Boolean`]
- Default: `false`

[`Boolean`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[`Date`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[`Number`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[`Object`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[`String`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[CSS `<color>`]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
