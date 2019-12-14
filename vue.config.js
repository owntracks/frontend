const fs = require("fs");
const webpack = require("webpack");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

const packageJson = fs.readFileSync("./package.json");
const version = JSON.parse(packageJson).version;

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          PACKAGE_VERSION: `"${version}"`,
        },
      }),
      new MomentLocalesPlugin(),
    ],
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
    },
  },
};
