const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    ventor: ['react', 'react-dom'],
    index: [
      'babel-polyfill',
      'react-hot-loader/patch',
      path.resolve(__dirname, "src/index.js")
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
  },
  module: {
    rules: [{
        test: /.js$/,
        use: [
          "react-hot-loader/webpack",
          "babel-loader",
        ],
        exclude: path.resolve(__dirname, "node_modules")
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "static/img/[name].[ext]"
          }
        }]
      },
      {
        test: /\.(ttf|eot|svg|woff)(\?(\w|#)*)?$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "static/font/[name].[ext]"
          }
        }]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      name: "index",
      title: "webpack config cli",
      filename: "index.html",
      inject: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/vendor.js'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map',
  devServer: {
    hot: true,
    inline: true,
    port: 46480,
    contentBase: path.resolve(__dirname, "dist"),

    proxy: {
      "/api": {
         target: "https://test-api.zjurl.cn/open-apis/bot/customer_service",
         secure: false,
         changeOrigin: true,
         bypass: function(req, res) {
          console.log("has proxy");
         }
      }
    }
  },
  resolve: {
    extensions: [" ", ".js", ".jsx", ".css", ".less"],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      css: path.resolve(__dirname, "src/css/"),
      model: path.resolve(__dirname, 'src/model/'),
      store: path.resolve(__dirname, 'src/store/')
    }
  }
};