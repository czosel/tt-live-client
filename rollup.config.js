var babel = require("rollup-plugin-babel");
var resolve = require("rollup-plugin-node-resolve");

export default {
  input: "index.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    name: "TTlive"
  },
  plugins: [resolve(), babel()]
};
