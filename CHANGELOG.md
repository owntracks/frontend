# 2.0.0-beta.1 (2019-10-26)

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
- Add URL query parameters to load and preserve application state: `lat`, `lng`, `zoom`, `start`, `end`, `user`, `device` and `layers`.
- Add a loading indicator.
- Add 'download data' modal, currently supporting formatted and minified JSON.
- Add a verbose mode.
- Add CORS proxy script toeasily use a production instance of the OwnTracks recorder in development.
- Add unit tests for util and API functions.
- Add documentation for all public funtions
- Add documentation for all configuration options.
- Add more configuration options, including setting the API base URL ([#4](https://github.com/owntracks/frontend/issues/4)) and hiding the `ping/ping` location ([#12](https://github.com/owntracks/frontend/issues/12)).

# 1.1.0 (2019-10-26)

- Add support for Docker. [#7](https://github.com/owntracks/frontend/pull/7), [@sharkoz](https://github.com/sharkoz)
- Move project to the OwnTracks organisation on GitHub. [#8](https://github.com/owntracks/frontend/pull/8), [@jpmens](https://github.com/jpmens)
- Enable compression in nginx configuration used in Docker image. [#11](https://github.com/owntracks/frontend/pull/11), [@sharkoz](https://github.com/sharkoz)

# 1.0.0 (2019-06-18)

- Initial release
