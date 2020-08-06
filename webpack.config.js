const path = require('path');

module.exports = {
  entry: './src/MockFrontEnd/index.js',
  target: 'node',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './src/build'),
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: path.resolve(__dirname, './node_modules/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s?css$/i,
        exclude: path.resolve(__dirname, './node_modules/'),
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
