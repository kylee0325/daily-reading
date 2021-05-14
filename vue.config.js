const webpack = require('webpack')

module.exports = {
	configureWebpack: {
		plugins: [
			new webpack.ContextReplacementPlugin(
				/moment[\\\/]locale$/,
				/^\.\/(zh-cn)$/
			),
		]
	}
}
