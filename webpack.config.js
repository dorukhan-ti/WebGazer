const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const bannerString =`
 WebGazer.js: Democratizing Webcam Eye Tracking on the Browser
 Copyright (c) 2016, Brown HCI Group
 Licensed under GPLv3. Companies with a valuation of less than $1M can use WebGazer.js under LGPLv3.
 `;

<<<<<<< HEAD
const varConfig = {
	entry: './src/index.mjs',
	output: {
		filename: 'webgazer.js',
		library: {
			name: 'webgazer',
			type: 'var',
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
		new	FileManagerPlugin({
			events: {
				onEnd: {
					copy: [
			            { source: './dist/webgazer.js', destination: './www/' },
			            { source: './dist/webgazer.js.map', destination: './www/' },
			            { source: './dist/webgazer.js', destination: './www/data/src/' },
			            { source: './dist/webgazer.js.map', destination: './www/data/src/' },
			        ],
				},
			},
		}),
	],
	devtool: "source-map"
};

const commonjs2Config = {
	entry: './src/index.mjs',
	output: {
		filename: 'webgazer.commonjs2.js',
		library: {
			name: 'webgazer',
			type: 'commonjs2',
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

module.exports = [varConfig, commonjs2Config]
=======
function createConfig(options) {
  return {
    entry: './src/index.mjs',
    output: {
      filename: 'webgazer' + 
		(options.target == 'var' ? '' : '.' + options.target) + 
		(options.minified ? '.min' : '') + 
		'.js',
      library: 'webgazer',
      libraryTarget: options.target,
      libraryExport: 'default',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          type: 'javascript/esm',
          exclude: /node_modules/
        }
      ]
    },
    optimization: {
      // if using google extension manifest v3 set to true
      minimize: options.minified
    },
    resolve: {
      extensions: [".mjs", ".webpack.js", ".web.js", ".js", ".json"]
    },
    plugins: [
      new webpack.BannerPlugin(bannerString),
    ],
    devtool: "source-map"
  };
}
module.exports = createVariants({
  minified: [true, false],
  target: ['var','commonjs2']
}, createConfig);
>>>>>>> 6cb26d4 (remove numeric new tensorflow model "face-landmarks-detection")
