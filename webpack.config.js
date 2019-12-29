const config = require('./mapboxConfig.js');
const webpack = require('webpack');

module.exports = {
  entry: __dirname + `/client/src/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: __dirname + '/client/dist'
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.MAPBOX_TOKEN": JSON.stringify(config.MAPBOX_TOKEN),
    })
  ],
  module : {
    rules : [
      {
        test : /\.jsx?$/,
        exclude: /(node_modules)/,
        loader : 'babel-loader',
        enforce: "pre",
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  }
};
