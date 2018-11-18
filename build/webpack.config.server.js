const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  target: 'node',
  // webpack 4 要求增加
  mode: 'development',
  entry: {
    app: path.join(__dirname, '../client/server.entry.js')
  },
  output: {
    filename: 'server.entry.js',
    libraryTarget: 'commonjs2'
  },
  externals: Object.keys(require('../package.json').dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_BASE': '"http://127.0.0.1:3000"'
    })
  ]
})
