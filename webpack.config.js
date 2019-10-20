module.exports = {
  entry: __dirname + `/client/src/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: __dirname + '/client/dist'
  },
  module : {
    rules : [
      {
        test : /\.jsx?$/,
        exclude: /(node_modules)/,
        loader : 'babel-loader',
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
