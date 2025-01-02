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
  - [`fetchOptions`](#apifetchoptions)
- [`endDateTime`](#enddatetime)
- `filters`
  - [`minAccuracy`](#filtersminaccuracy)
- [`ignorePingLocation`](#ignorepinglocation)
- [`locale`](#locale)
- `map`
  - [`attribution`](#mapattribution)
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
    - [`poi`](#maplayerspoi)
    - [`points`](#maplayerspoints)
  - [`maxNativeZoom`](#mapmaxnativezoom)
  - [`maxPointDistance`](#mapmaxpointdistance)
  - [`maxZoom`](#mapmaxzoom)
  - [`poiMarker`](#mappoimarker)
  - [`polyline`](#mappolyline)
  - [`url`](#mapurl)
- `onLocationChange`
  - [`fitView`](#onlocationchangefitview)
  - [`reloadHistory`](#onlocationchangereloadhistory)
- [`primaryColor`](#primarycolor)
- `router`
  - [`basePath`](#routerbasepath)
- [`selectedDevice`](#selecteddevice)
- [`selectedUser`](#selecteduser)
- [`showDistanceTravelled`](#showdistancetravelled)
- [`startDateTime`](#startdatetime)
- [`units`](#units)
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
      baseUrl: "https://owntracks.example.com",
    },
  };
  ```
  ```js
  // API requests will be made to https://example.com/owntracks/api/0/...
  window.owntracks.config = {
    api: {
      baseUrl: "https://example.com/owntracks/",
    },
  };
  ```

### `api.fetchOptions`

Options for API requests (made with `fetch()`). See [`fetch()` docs on MDN] for details.

You can use this for example to send custom HTTP headers or to include cookies in the request.

- Type: [`Object`]
- Default: `{}`
- Example:
  ```js
  // Include credentials (e.g. cookies)
  window.owntracks.config = {
    api: {
      fetchOptions: {
        credentials: "include",
      },
    },
  };
  ```

### `endDateTime`

Initial end date and time (browser timezone) for fetched data.

- Type: [`Date`]
- Default: today, 23:59:59
- Example:
  ```js
  // Data will be fetched up to 1970-01-01
  window.owntracks.config = {
    endDateTime: new Date(1970, 1, 1),
  };
  ```

### `filters.minAccuracy`

Minimum accuracy in meters for location points to be rendered & included in the travelled distance.

This filter is disabled by default as accuracies can vary across devices an locations, but you're
encouraged to set it as it can be a simple way to remove outliers and vastly improve the travelled
distance calculation.

- Type: [`Number`] or `null`
- Default: `null`
- Example:
  ```js
  // Don't include location points with an accuracy exceeding 100 meters
  window.owntracks.config = {
    filters: {
      minAccuracy: 100,
    },
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
    ignorePingLocation: false,
  };
  ```

### `locale`

The locale to use for the user interface, this affects the language and date/time
formats.

Available languages:

- `cs-CZ` (Standard Czech)
- `da-DK` (Standard Danish)
- `de-DE` (Standard German)
- `en-GB` (British English)
- `en-US` (American English)
- `es-ES` (Castilian Spanish)
- `fr-FR` (Standard French)
- `sk-SK` (Standard Slovak)
- `tr-TR` (Standard Turkish)

Using a locale with non-existent translations is possible and will affect date/time formats, but
use `en-US` for translations.

- Type: [`String`]
- Default: `"en-US"`

### `map.attribution`

Attribution for map tiles.

- Type: [`String`] (may contain HTML)
- Default: `"&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors"`
- Example:
  ```js
  // Make sure to add proper attribution!
  window.owntracks.config = {
    map: {
      attribution: "Map tiles &copy; MyTileServerProvider",
    },
  };
  ```

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

### `map.layers.poi`

Initial visibility of the POI layer.

- Type: [`Boolean`]
- Default: `true`

### `map.layers.points`

Initial visibility of the location points layer.

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
      maxPointDistance: 1000,
    },
  };
  ```

### `map.maxZoom`

Allow zooming closer than the tile server supports, which will result in (slightly)
blurry tiles on higher zoom levels. Set to the same value as [`map.maxNativeZoom`](#map.maxNativeZoom)
to disable.

- Type: [`Number`]
- Default: `21`

### `map.poiMarker`

POI marker configuration. See [Vue2Leaflet `l-circle-marker` documentation](https://korigan.github.io/Vue2Leaflet/#/components/l-circle-marker/)
for all possible values.

- Type: [`Object`]
- Default:
  ```js
  {
    color: "red",
    fillColor: "red",
    fillOpacity: 0.2,
    radius: 12
  }
  ```

### `map.polyline`

Location point marker configuration. `color` defaults to `primaryColor` if `null`. See
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

### `map.tileSize`

Size of the tiles in pixels returned by the tile server. Can be used together with
[`map.zoomOffset`](#map.zoomOffset) to configure bigger tile sizes.

- Type: [`Number`]
- Default: `256`

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
      url: "https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}@2x?access_token=xxxxxxxxxxxxxxxx",
    },
  };
  ```

### `map.zoomOffset`

Offset the zoom level to account for different tile sizes. For example tiles with a
size of 512x512 need an offset of -1 and for 1024x1024 an offset of -2.

- Type: [`Number`]
- Default: `0`

### `onLocationChange.fitView`

Whether to re-fit the map's content into view or not when a location update is received.

This can be useful if you're showing live locations and don't want them to "leave" the map.

- Type: [`Boolean`]
- Default: `false`

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
    primaryColor: "rebeccapurple",
  };
  ```

### `router.basePath`

Base path of the application deployment.

- Type: [`String`]
- Default: `"/"`
- Example:
  ```js
  // Frontend will be reachable at https://example.com/owntracks
  window.owntracks.config = {
    router: {
      basePath: "/owntracks",
    },
  };
  ```

### `selectedDevice`

Initial selected device. All devices will be shown by default if `null`. Will be ignored
if [`selectedUser`](#selectedUser) is `null`.

Only data for the selected user/device will be fetched, so you can use this to limit the
amount of data fetched after page load.

- Type: [`String`] or `null`
- Default: `null`
- Example:
  ```js
  // Select the device 'phone' from user 'foo' by default
  window.owntracks.config = {
    selectedUser: "foo",
    selectedDevice: "phone",
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
    selectedUser: "foo",
  };
  ```

### `showDistanceTravelled`

Whether to calculate and show the travelled distance of the last fetched data in the
header bar. `maxPointDistance` is being takein into account, if a distance between two
subsequent points is greater than `maxPointDistance`, it will not contibute to the
calculated travelled distance.

This also includes a calculation of elevation gain / loss.

- Type: [`Boolean`]
- Default: `true`

### `startDateTime`

Initial start date and time (browser timezone) for fetched data.

- Type: [`Date`]
- Default: one month ago, 00:00:00
- Example:
  ```js
  // Data will be fetched from the first day of the current month
  const startDateTime = new Date();
  startDateTime.setHours(0, 0, 0, 0);
  startDateTime.setDate(1);
  window.owntracks.config = {
    startDateTime,
  };
  ```

### `units`

Allows the configuration of the units of measurement to use for the user interface.

Available options:

- `metric`
- `imperial`

Choosing anything other than one of these options will fall back to metric.

- Type: [`String`]
- Default: `"metric"`

### `verbose`

Whether to enable verbose mode or not.

- Type: [`Boolean`]
- Default: `false`

[`boolean`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[`date`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
[`number`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[`object`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[`string`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[css `<color>`]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
[`fetch()` docs on mdn]: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters
