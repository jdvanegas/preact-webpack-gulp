const path = require("path");
const uglifyjs = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  // mode: "production",
  mode: "development",
  entry: {
    app: "./src/scripts/modules/app.js",
  },
  output: {
    // solo se puede especificar una carpeta output
    filename: "[name].bundle.min.js",
    path: path.resolve(__dirname, "src/scripts/outputs"),
    jsonpFunction: "wpBsipJsonp",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [path.resolve(__dirname, "src/scripts"), "node_modules"],
    alias: {
      react: "preact",
      "react-dom": "preact/compat",
    },
  },
  devtool: "source-map",
  watch: true,
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              {
                plugins: ["@babel/plugin-proposal-class-properties"],
              },
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new uglifyjs({
      sourceMap: true,
    }),
    // new webpack.ProvidePlugin({
    //   Promise: "es6-promise",
    // }),
  ],
  //   optimization: {
  //     splitChunks: {
  //       chunks: "all",
  //       minSize: 30000,
  //       cacheGroups: {
  //         defaultVendors: {
  //           test: /[\\/]node_modules[\\/]/,
  //           name: "bc-vendors",
  //           filename: "[name].bundle.min.js",
  //           priority: -10,
  //         },
  //         default: {
  //           name: "bc-commons",
  //           filename: "[name].bundle.min.js",
  //           minChunks: 3,
  //           priority: -20,
  //         },
  //       },
  //     },
  //   },
};
