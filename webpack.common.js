const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: __dirname + `/client/src/index.jsx`,
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: __dirname + '/client/dist'
  },
  plugins: [
    new Dotenv()
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
        use: [
          'style-loader',
          'css-loader'
        ],
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
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: { test: /[\\/]node_modules[\\/]/, name: "vendors", chunks: "all" },
      },
    },
  },
};
