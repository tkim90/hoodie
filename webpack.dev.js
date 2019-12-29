const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const config = require('./mapboxConfig.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './client/dist',
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.MAPBOX_TOKEN": JSON.stringify(config.MAPBOX_TOKEN),
    })
  ],
})