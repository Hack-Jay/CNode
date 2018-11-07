const path = require('path')
const merge = require('webpack-merge')
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
	module: {
		rules: [{
				test: /.jsx$/,
				loader: 'babel-loader'
			},
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: [
					path.join(__dirname, '../node_modules')
				]
			}
		]
	}
})
