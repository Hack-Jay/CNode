const path = require('path')

module.exports = {
  output: {
		filename: '[name].[hash].js',
		path: path.join(__dirname, '../dist'),
		// 路径前缀，用来区分
		publicPath: '/public/'
  },
  module: {
		rules: [
			{
				enforce: 'pre',
				test: /.(js|jsx)$/ ,
				loader: 'eslint-loader',
				exclude: [
					path.join(__dirname, '../node_modules')
				]
			},
			{
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
