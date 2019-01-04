const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

let webpackConfig = {
  mode: isProd ? 'production' : 'development',
  optimization: {
    splitChunks: {
        cacheGroups: {
            default: false,
            vendors: false,
            vendor: {
                name: 'vendor',
                chunks: 'all',
                test: /node_modules/,
                priority: 20
            },
            common: {
                name: 'common',
                minChunks: 2,
                chunks: 'all',
                priority: 10,
                reuseExistingChunk: true,
                enforce: true
            }
        }
    }
  },
  entry: './src/index.js',
  output: {
    filename: './js/app.js',
    chunkFilename: './js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    new HtmlWebpackPlugin({
      title: "test index",
      filename: 'index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          "css-loader"
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
}

if (isProd) {
  webpackConfig.plugins.push(
    new CleanWebpackPlugin(['dist']),
  )
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
    }),
  )
  webpackConfig.optimization.minimizer = [
    new UglifyJsPlugin({
      // test: /\.js(\?.*)?$/i,
      cache: true,
      parallel: true,
      sourceMap: true // set to true if you want JS source maps
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
}

module.exports = webpackConfig