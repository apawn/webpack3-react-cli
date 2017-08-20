const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/index.bundle.js",
  },
  module: {
    rules: [{
        test: /.js$/,
        use: [
          "babel-loader",
        ],
        exclude: path.resolve(__dirname, "node_modules")
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            "postcss-loader"
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader",
            "postcss-loader",
            "less-loader"
          ]
        })
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      title: "webpack config cli",
      filename: "index.html",
      inject: true,
    }),
    new ExtractTextPlugin({
      filename: "css/index.css"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map',
  devServer: {
    hot:true,
    inline: true,
    port: 46480,
    contentBase: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions:[" ", ".js", ".jsx", ".css", ".less"]
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/')
  }
};