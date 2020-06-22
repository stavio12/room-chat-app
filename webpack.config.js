const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./app/index.js",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "build"),
    filename: "bundled.js",
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 3000,
    contentBase: "./build",
    hot: true,
    historyApiFallback: { index: "index.html" },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", ["@babel/preset-env", { targets: { node: "12" } }]],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve("./app/index.html"),
    }),
  ],
};
