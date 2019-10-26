# OwnTracks UI

> Web interface for OwnTracks

![Version](https://img.shields.io/github/package-json/v/owntracks/frontend/v2.0.0-alpha)
[![Docker Pulls](https://img.shields.io/docker/pulls/owntracks/frontend)](https://hub.docker.com/r/owntracks/frontend)
[![License](https://img.shields.io/github/license/owntracks/frontend?color=d63e97)](https://github.com/owntracks/frontend/blob/master/LICENSE)

<p style="text-align: center;">
  <img src="https://raw.githubusercontent.com/owntracks/frontend/master/docs/images/owntracks-ui.png" alt="OwnTracks UI">
</p>

## Introduction

This is a web interface for [OwnTracks](https://github.com/owntracks/recorder) built as
a Vue.js single page application. The recorder itself already ships with some basic web
pages, this is a more advanced interface with more functionality, all in one place.

## Installation

### Manually

- Run `yarn install --production` to install dependencies
- Run `yarn build` to compile and minify for production
- Copy the content of the `dist/` directory to your webroot

The API is expected to be reachable under the same domain as the web interface.

### Docker

You can launch directly via Docker run like this:

```console
$ docker run -d -p 80:80 -e SERVER_HOST=otrecorder-host -e SERVER_PORT=otrecorder-port owntracks/frontend
```

Or you can use `docker-compose` (if you also run the OwnTracks Recorder with the default
compose config, and the service is named `otrecorder`):

```yaml
version: '3'

services:
  owntracks-ui:
    image: owntracks/frontend
    ports:
      - 80:80
    environment:
      - SERVER_HOST=otrecorder
      - SERVER_PORT=8083
    restart: unless-stopped
```

## Configuration

It's possible to get started without any configuration change whatsoever, assuming your
OwnTracks API is reachable at the root of the same host as the frontend.

Copy [`public/config/config.example.js`](public/config/config.example.js) to
`public/config/config.js` and make changes as you wish.

See [`docs/config.md`](docs/config.md) for all available options.

## Development

- Run `yarn install` to install dependencies
- Run `yarn serve` to compile for development and start the hot-reload server
- Run `yarn lint` to lint and fix files
- Run `yarn test` to run unit tests

You can use the [`corsProxy.js`](scripts/corsProxy.js) script to use your production
instance of OwnTracks for development without making changes to its CORS-Headers:

```console
$ yarn cors-proxy
```
If you have [basic authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Basic_authentication_scheme)
enabled, create a `.env` file with your credentials:

```text
OT_BASIC_AUTH_USERNAME=user
OT_BASIC_AUTH_PASSWORD='P@$$w0rd'
```

Then run:

```console
$ env $(cat .env | xargs) yarn cors-proxy
```

The default host and port it binds to is `0.0.0.0:8888`. Change using the `OT_PROXY_HOST`
and `OT_PROXY_PORT` environment variables.

Finally update `api.baseUrl` in your config to `"http://0.0.0.0:8888/https://owntracks.example.com"`.

## Features

- Last known (i.e. live) locations:
  - Accuracy visualization (circle)
  - Device friendly name and icon
  - Detailed information (if available): time, latitude, longitude, height, battery and
    speed
- Location history (data points, line or both)
- Location heatmap
- Quickly fit all shown objects on the map into view
- Display data in a specific date range
- Filter by user and device
- Highly customisable

## Screenshots

_Click to enlarge._

<a href="https://raw.githubusercontent.com/owntracks/frontend/master/docs/images/live.png" target="_blank"><img src="https://raw.githubusercontent.com/owntracks/frontend/master/docs/images/live.png" alt="Live" height="200"></a>
<a href="https://raw.githubusercontent.com/owntracks/frontend/master/docs/images/multiple.png" target="_blank"><img src="https://raw.githubusercontent.com/owntracks/frontend/master/docs/images/multiple.png" alt="Multiple" height="200"></a>
<a href="https://raw.githubusercontent.com/owntracks/frontend/master/docs/images/date-selection.png" target="_blank"><img src="https://raw.githubusercontent.com/owntracks/frontend/master/docs/images/date-selection.png" alt="Date selection" height="200"></a>
<a href="https://raw.githubusercontent.com/owntracks/frontend/master/docs/images/heatmap.png" target="_blank"><img src="https://raw.githubusercontent.com/owntracks/frontend/master/docs/images/heatmap.png" alt="Heatmap" height="200"></a>
<a href="https://raw.githubusercontent.com/owntracks/frontend/master/docs/images/customized.png" target="_blank"><img src="https://raw.githubusercontent.com/owntracks/frontend/master/docs/images/customized.png" alt="Customized" height="200"></a>

## Contributing

Please feel free to open an issue and discuss your ideas and report bugs. If you think
you can help out with something, open a PR!
