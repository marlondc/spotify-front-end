const path = require('path');
const Dotenv = require('dotenv-webpack');

const SRC_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'public');

module.exports = {
  entry: SRC_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: SRC_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            'es2015',
            'react',
            'stage-2',
          ]
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
        include: SRC_DIR,
        loader: 'file-loader',
        options: {
          limit: 100000,
          name: '/images/[name].[ext]'
        }
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
    })
  ]
};
