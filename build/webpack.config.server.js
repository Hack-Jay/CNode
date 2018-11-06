const path = require('path')

module.exports = {
	target: 'node',
	// webpack 4 要求增加
	mode: 'development',
	entry: {
		app: path.join(__dirname, '../client/server.entry.js')
	},
	output: {
		filename: 'server.entry.js',
		path: path.join(__dirname, '../dist'),
		// 路径前缀，用来区分
		publicPath: '/public',
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
}