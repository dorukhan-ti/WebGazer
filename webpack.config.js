const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const bannerString =`
 WebGazer.js: Democratizing Webcam Eye Tracking on the Browser
 Copyright (c) 2016, Brown HCI Group
 Licensed under GPLv3. Companies with a valuation of less than $1M can use WebGazer.js under LGPLv3.
 `;

 const umdConfig = {
	entry: './src/index.mjs',
	output: {
		filename: 'webgazer.umd.js',
		library: {
			name: 'webgazer',
			type: 'umd',
			export: 'default',
		},
		path: path.resolve(__dirname, 'dist'),
	},
	module:	{
		rules: [
			{
				test: /\.mjs$/,
				type: 'javascript/auto',
				exclude: /node_modules/,
				resolve: {
					fullySpecified: false,
				},
			}
		]
	},
	resolve: {
		extensions: [".mjs", ".webpack.js", ".web.js", ".js", ".json"]
	},
	optimization: {
		minimizer: [new TerserPlugin({
			extractComments: false,
		})],
	},
	plugins: [
		new webpack.BannerPlugin(bannerString),
	],
	devtool: "source-map"
};

module.exports = [umdConfig]
