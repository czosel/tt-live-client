var babel = require("rollup-plugin-babel");
var resolve = require("rollup-plugin-node-resolve");
var commonjs = require("rollup-plugin-commonjs");

export default {
  input: "index.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    name: "TTlive"
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**"
    })
  ]
};
