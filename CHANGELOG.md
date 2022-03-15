# Changelog

Dates are in UTC.

## 2.11.0 (2022-03-16)

- Show WiFi SSID and BSSID in location popup, if available
- Show address in location popup, if available ([#73](https://github.com/owntracks/frontend/pull/73), [@saesh](https://github.com/saesh))
- Upgrade dependencies

## 2.10.0 (2021-11-28)

- Ensure location history line segments are drawn in chronological order ([#67](https://github.com/owntracks/frontend/issues/67))
- Add trailing slashes to paths used by Docker nginx config ([#63](https://github.com/owntracks/frontend/pull/63), [@growse](https://github.com/growse))
- Upgrade dependencies

## 2.9.0 (2021-05-01)

- Add a cancel button to the loading data modal
- Replace remaining uses of "OwnTracks UI" with "OwnTracks Frontend"
- Upgrade dependencies

## 2.8.0 (2021-02-19)

- Add elevation gain / loss to "distance travelled" calculation ([#51](https://github.com/owntracks/frontend/issues/51))

## 2.7.0 (2021-02-14)

- Rename translation files from `xx` to `xx-XX` format to allow different language variants
- Separate `en` translations into British English (`en-GB`) and American English (`en-US`, default)
- Add French translations ([#49](https://github.com/owntracks/frontend/pull/49), [@Elu43](https://github.com/Elu43))
- Update Docker image to use Node 14 and nginx 1.18
- Upgrade dependencies

## 2.6.0 (2020-12-29)

- Add `router.basePath` config option for non-webroot deployments
- Configure Vue to not assume it's on the web root ([#47](https://github.com/owntracks/frontend/pull/47), [@growse](https://github.com/growse))
- Update Docker NGINX config to listen on IPv6 as well ([#46](https://github.com/owntracks/frontend/pull/46), [@growse](https://github.com/growse))
- Upgrade dependencies

## 2.5.1 (2020-10-27)

- Fix incorrect handling of `api.baseUrl` with trailing slash ([#44](https://github.com/owntracks/frontend/pull/44), [@karmanyaahm](https://github.com/karmanyaahm))
- Upgrade dependencies

## 2.5.0 (2020-09-07)

- Add `filters.fitView` config option - this will prevent the map from re-fitting automatically by default when a live location changes ([#41](https://github.com/owntracks/frontend/issues/41))
- Show regions for location on popup
- Fix vertical offset of non-pin popups
- Build Docker images for multiple architectures (linux/amd64, linux/arm/v7, linux/arm64) using GitHub Actions ([#38](https://github.com/owntracks/frontend/pull/38), [@wollew](https://github.com/wollew))
- Replace Travis CI with GitHub Actions build/lint/test workflows ([#39](https://github.com/owntracks/frontend/pull/39))
- Replace node-sass with sass (dart-sass)
- Upgrade dependencies

## 2.4.0 (2020-06-01)

- Add `filters.minAccuracy` config option - this allows ignoring location points which do
  not meet the configured accuracy requirement ([#35](https://github.com/owntracks/frontend/issues/35))
- Upgrade dependencies

## 2.3.1 (2020-05-09)

- Fix linting issue in `config.md`

## 2.3.0 (2020-05-09)

- Add `api.fetchOptions` config option - this allows sending custom HTTP headers or including
  cookies in the request
- Upgrade dependencies

## 2.2.0 (2020-03-18)

- Improve mobile layout further:
  - Reduce header paddings
  - Align buttons/dropdowns
- Upgrade dependencies

## 2.1.0 (2020-03-18)

- Replace default Leaflet marker with a custom one ([#2](https://github.com/owntracks/frontend/issues/2))
- Improve verbose mode logging
- Improve mobile usability ([#19](https://github.com/owntracks/frontend/issues/19))
- Upgrade dependencies

## 2.0.0 (2020-03-01)

Stable release of v2, finally! 🎉

_This is just a version bump, see all the beta releases below, especially the first one, for a list of changes._

## 2.0.0-beta.11 (2020-03-01)

- Add Spanish translations ([#25](https://github.com/owntracks/frontend/pull/25), [@dtorner](https://github.com/dtorner))
- Change "distance travelled" label to `title`
- Replace map initial center/zoom config with auto fitting ([#23](https://github.com/owntracks/frontend/issues/23))
- Enhance code type definitions using TypeScript features ([#20](https://github.com/owntracks/frontend/pull/20))
- Upgrade dependencies

## 2.0.0-beta.10 (2020-02-07)

- Add "distance travelled" feature

## 2.0.0-beta.9 (2020-02-06)

- Support locale with language and region part (`en-GB`)
- Update docs (screenshot, changelog improvements, typo fix)
- Add funding information

## 2.0.0-beta.8 (2020-01-26)

- Add friendly device name and face images to location history popups
- Add missing `alt`/`title` to device face image
- Fix all JSDoc `@return` directives to `@returns`
- Use computed prop for device name in location popup
- Enable ESLint `max-len` rule

## 2.0.0-beta.7 (2020-01-24)

This release doesn't really affect end-users but greatly improves the development experience.

- Add `jsconfig.json`
- Set `no-console`/`no-debugger` to `"warn"` in dev mode
- Linting and formatting:
  - Separate npm scripts for linting and formatting
  - Lint/format Markdown files
  - Run lint on Travis CI
- Upgrade dependencies

## 2.0.0-beta.6 (2019-12-14)

- Fix heatmap - the upgrade of `vue2-leaflet` from 2.2.1 to 2.3.0 added an `activated` attribute to layers causing the heatmap to not show ([#18](https://github.com/owntracks/frontend/issues/18))

## 2.0.0-beta.5 (2019-12-14)

- Add Leaflet popup close button background color transition
- Add `$config` Vue instance property
- Improve accessibility ([#9](https://github.com/owntracks/frontend/issues/9))
- Use configured locale for timestamp formatting
- Upgrade dependencies

## 2.0.0-beta.4 (2019-12-14)

- Add support for time selection ([#10](https://github.com/owntracks/frontend/issues/10))
  - New date/time picker component is properly translated/localised and keyboard accessible
  - Config options are now `startDateTime`/`endDateTime` and format of URL parameters changed
- Changed default start/end date and time to use local timezone
- Fix missing translation of "[date] to [date]"
- Update i18n development notes in `README.md`

## 2.0.0-beta.3 (2019-12-13)

- Add i18 support (currently English and German, `locale` config option)
- Add custom checkbox focus style
- Fix layer dropdown issues ([#1](https://github.com/owntracks/frontend/issues/1))
- Fix checkbox style issues
- Fix hover/focus inconsistencies
- Fix Docker image labels
- `README.md` enhancements
- Upgrade dependencies

## 2.0.0-beta.2 (2019-11-02)

- Add `onLocationChange.reloadHistory` config option
- Add Travis CI config
- Fix timezone issues in tests
- Fix ESLint errors in production mode
- Fix table of content links in config documentation
- Upgrade dependencies

## 2.0.0-beta.1 (2019-10-26)

- Convert codebase to Node.js based development workflow, including:
  - Package management using yarn
  - Build step using Webpack and Babel
  - Usage of Vue single file components
  - SCSS and PostCSS
  - ESLint configuration for linting and consistent code style
  - `package.json` scripts: `serve`, `build`, `lint`, `cors-proxy` and `test`
- Design updates, including:
  - New default primary color (same as OwnTracks Android app)
  - Improved hover and focus styles as a first attempt to improve accessibility
  - Improved modals and location popups
  - Custom checkbox styles
  - Switch from Font Awesome 4 to Feather Icons
- Application now uses Vuex and Vue Router
- Add URL query parameters to load and preserve application state: `lat`, `lng`, `zoom`, `start`, `end`, `user`, `device` and `layers`
- Add a loading indicator
- Add 'download data' modal, currently supporting formatted and minified JSON
- Add a verbose mode
- Add CORS proxy script to easily use a production instance of the OwnTracks recorder in development
- Add unit tests for util and API functions
- Add documentation for all public funtions
- Add documentation for all configuration options
- Add more configuration options, including setting the API base URL ([#4](https://github.com/owntracks/frontend/issues/4)) and hiding the `ping/ping` location ([#12](https://github.com/owntracks/frontend/issues/12))

## 1.1.0 (2019-10-26)

- Add support for Docker ([#7](https://github.com/owntracks/frontend/pull/7), [@sharkoz](https://github.com/sharkoz))
- Move project to the OwnTracks organisation on GitHub ([#8](https://github.com/owntracks/frontend/pull/8), [@jpmens](https://github.com/jpmens))
- Enable compression in nginx configuration used in Docker image ([#11](https://github.com/owntracks/frontend/pull/11), [@sharkoz](https://github.com/sharkoz))

## 1.0.0 (2019-06-18)

- Initial release
