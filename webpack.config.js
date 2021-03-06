const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const mode = process.env.NODE_ENV;
const API_URL = {
  production: JSON.stringify("https://topnames.herokuapp.com"),
  development: JSON.stringify("http://localhost:3001"),
};

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  devtool: mode === "development" ? "inline-source-map" : false,
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    compress: true,
    overlay: true,
    host: "localhost",
    historyApiFallback: true,
    port: 3000,
    publicPath: "/",
    hot: true,
    watchOptions: {
      ignored: [
        path.resolve(__dirname, "build"),
        path.resolve(__dirname, "node_modules"),
      ],
    },
  },
  plugins: [
    mode === "production" ? new CleanWebpackPlugin() : () => {console.log(mode)},
    new HtmlWebpackPlugin({
      title: "Solita assignment",
      template: "public/index.html",
      inject: true,
    }),
    new webpack.DefinePlugin({
      API_URL: API_URL[mode],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            sourceMap: true,
          },
        },
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].bundle.js",
  },
};
