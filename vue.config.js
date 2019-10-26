const fs = require("fs");
const webpack = require("webpack");

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
    ],
  },
};
