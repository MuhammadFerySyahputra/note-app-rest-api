const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

module.exports = merge(commonConfig, {
  // Konfigurasi khusus pengembangan di sini
  mode: "development",
});
