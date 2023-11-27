const _ = require('lodash');
const path = require('path');
const {addPostcssPluginsWebpack5} = require('./scripts/addPostcssPluginsWebpack5');
const {
	override,
	babelInclude,
	addBabelPlugin,
	addBabelPreset,
	addDecoratorsLegacy,
	addBundleVisualizer,
	addWebpackPlugin,
	// disableChunk,
} = require('customize-cra');
const webpack = require('webpack');

module.exports = {
	webpack: function (config) {
		// config.optimization.splitChunks = {
		// 	cacheGroups: {
		// 		default: false,
		// 	},
		// };
		// config.optimization.runtimeChunk = false;

		const ignoreSourceMapWarnings = (config) => {
			if (process.env.REACT_APP_ENV === 'development') {
				config.ignoreWarnings = [
					function ignoreSourcemapsLoaderWarnings(warning) {
						return (
							warning.module &&
							warning.module.resource.includes('node_modules') &&
							warning.details &&
							warning.details.includes('source-map-loader')
						);
					},
				];
			}

			return config;
		};

		const ignoreMiniCssExtractPluginOrder = (config) => {
			const instanceOfMiniCssExtractPlugin = config.plugins.find(
				(plugin) => plugin.constructor.name === 'MiniCssExtractPlugin',
			);

			if (instanceOfMiniCssExtractPlugin) {
				instanceOfMiniCssExtractPlugin.options.ignoreOrder = true;
			}

			return config;
		};

		const resolveFallback = (config) => {
			config.resolve.fallback = {
				zlib: false,
				stream: require.resolve('stream-browserify'),
				buffer: require.resolve('buffer'),
				crypto: false,
				path: false,
				fs: false,
			};

			return config;
		};

		let newConfig = override(
			resolveFallback,
			ignoreSourceMapWarnings,
			ignoreMiniCssExtractPluginOrder,
			babelInclude([
				path.resolve('src'),
				path.resolve('../core'), // don't reference it through node_modules/@my-project/components because yarn workspaces already resolves it
				path.resolve('../uikit'), // don't reference it through node_modules/@my-project/components because yarn workspaces already resolves it
			]),
			addDecoratorsLegacy(),
			addBabelPreset(['@babel/preset-typescript', {onlyRemoveTypeImports: true}]),
			addBabelPreset(['@babel/preset-react']),
			addBabelPlugin('babel-plugin-parameter-decorator'),
			addBabelPlugin('babel-plugin-transform-typescript-metadata'),
			addBabelPlugin(['@babel/plugin-proposal-class-properties', {loose: true}]),
			addBundleVisualizer({analyzerMode: 'static', reportFilename: '../bundle-report.html', openAnalyzer: false}),
			addPostcssPluginsWebpack5(),
			addWebpackPlugin(
				new webpack.ProvidePlugin({
					process: 'process/browser',
					Buffer: ['buffer', 'Buffer'],
				}),
			),
			// disableChunk(),
		)(config);

		const rules = newConfig.module.rules.find((obj) => 'oneOf' in obj).oneOf;

		if (rules) {
			const isBabelLoader = (rule) => _.includes(rule.loader, 'babel-loader');
			const firstIdx = _.findIndex(rules, isBabelLoader);
			const lastIdx = _.findLastIndex(rules, isBabelLoader);
			if (lastIdx >= 0 && firstIdx !== lastIdx) {
				rules.splice(lastIdx, 1);
			}
		}

		return newConfig;
	},
	jest: function (config) {
		config.transform = _.omitBy(config.transform, (value) => value.indexOf('babelTransform.js') !== -1);

		return config;
	},
};
