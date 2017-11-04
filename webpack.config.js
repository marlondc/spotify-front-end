const path = require('path');
const Dotenv = require('dotenv-webpack');
const merge = require('webpack-merge');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'public');

const server = {
  entry: path.resolve(__dirname, 'server.jsx'),
  output: {
    path: BUILD_DIR,
    filename: 'server.bundle.js',
    publicPath: '/static/',
  },
  target: 'web',
  node: {
    __filename: false,
    __dirname: false,
  },
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    // keep node_module paths out of the bundle
    .concat(['react-dom/server'])
    .reduce((ext, mod) => {
      const external = ext;
      external[mod] = `commonjs ${mod}`;
      return external;
    }, {}),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              'es2015',
              'react',
              'stage-2',
            ],
            plugins: []
          }
        }]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
        include: SRC_DIR,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 100000,
            name: '/images/[name].[ext]'
          },
        }]
      },
      {
        test: /\.scss$/,
        include: SRC_DIR,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader!isomorphic-style-loader'),
      },
      {
        test: /\.woff$|\.woff2$|\.ttf$|\.otf$|\.eot$/,
        include: SRC_DIR,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 100000,
              name: '/fonts/[name].[ext]'
            }
          }
        ]
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss"]
  },
  plugins: [
    // Output extracted CSS to a file
    new ExtractTextPlugin({ filename: 'main.css', disable: false, allChunks: true })
  ]
}

const config = merge(
  server
);

module.exports = config;
