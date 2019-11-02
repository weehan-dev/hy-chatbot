const path = require('path');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'node',
  plugins: [new Dotenv()],
  externals: [nodeExternals()],
  mode: 'production',
  resolve: {
    extensions: ['.js', 'json'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  devtool: 'source-map',
  node: {
    dns: 'mock',
    fs: 'empty',
    url: false,
    net: 'empty',
    child_process: 'empty',
    __dirname: false,
    __filename: false
  }
};
