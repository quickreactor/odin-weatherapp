// webpack.config.js
const { merge } = require('webpack-merge');
const common = require("./webpack.common.js");

module.exports = merge (common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
    port: 9000,
  },
});
