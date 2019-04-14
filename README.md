# OwnTracks UI

> A modern web interface for OwnTracks

<p style="text-align: center;">
  <img src="docs/images/owntracks-ui.png" alt="Owntracks UI">
</p>

## Introduction

This is a WebInterface for OwnTracks, intended to replace the various web pages shipping with the recorder. OwnTracks UI uses Vue.js under the hood.

*This is not an official OwnTracks project.*

## Installation

Clone the repository and copy `index.html` and the `static/` directory to your server's webroot. The API is expected to be reachable under the same domain as the web interface.

## Features

- Enable or disable multiple layers:

  - Last known (i.e. live) locations:

    - Accuracy visualization (circle)
    - Device friendly name and icon
    - Detailed information (if available): time, lat, lon, height, battery and speed

  - Location history (data points, line or both)
  - Location heatmap
  - Button to quickly fit all shown objects on the map into view

- Display data in a specific date range
- Filter by user and device
- Customizable:

  - UI color
  - Default start and end date
  - Map:

    - Tile server
    - Max zoom
    - Default position and zoom
    - Heatmap colors, radius and blur

## Screenshots

_Click to enlarge._

<a href="docs/images/live.png" target="_blank"><img src="docs/images/live.png" alt="Live" height="200"></a>
<a href="docs/images/multiple.png" target="_blank"><img src="docs/images/multiple.png" alt="Multiple" height="200"></a>
<a href="docs/images/heatmap.png" target="_blank"><img src="docs/images/heatmap.png" alt="Heatmap" height="200"></a>

## ToDo

- Add screenshots to `README.md`!
- Node.js based development workflow:

  - Webpack
  - Vue SFCs
  - Sass
  - Dependency management with yarn instead of a local copy or unpkg.com

- Docker support
- Download data for selected date range, user and device as JSON

## Contributing

Please feel free to open an issue and discuss your ideas and report bugs. If you think you can help out with something, open a PR!
