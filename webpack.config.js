'use strict';

const { ProvidePlugin } = require('webpack')
const path = require('path')

const SOURCE_DIR = path.join(__dirname, 'src')
const BUILD_DIR = path.resolve(__dirname, 'dist/')

const config = {
  devtool: 'inline-source-map',
  context: SOURCE_DIR,
  entry: './main.js',
  output: {
    path: BUILD_DIR,
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      SOURCE_DIR,
      "node_modules"
    ],
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.js(x)?$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /\.(scss|css)$/,
      use: [
        "style-loader",
        "css-loader",
        "autoprefixer-loader?browsers=last 5 version",
        "sass-loader"
      ]
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'file-loader'
      }]
    }, {
      test: /\.otf$/,
      use: [{
        loader: 'file-loader'
      }]
    }, {
      test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          prefix: 'font/',
          limit: 5000
        }
      }]
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 5000,
          mimetype: 'application/octet-stream'
        }
      }]
    }, {
      test: /\.(png|ico|jp(e?)g|gif|svg(\?v=\d+\.\d+\.\d+)?)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
          mimetype: 'image/svg+xml'
        }
      },
        {
          loader: 'image-webpack-loader'
        }
      ]
    }]
  },
  plugins: [
    new ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
  }
};

module.exports = config;
