const { override, overrideDevServer, addPostcssPlugins, addWebpackAlias, addBundleVisualizer, addWebpackPlugin } = require('customize-cra');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const overrideDevServerConfig = () => config => {
	config.setupMiddlewares = (middlewares, devServer) => {
		if (!devServer) {
			throw new Error('webpack-dev-server is not defined');
		}
		return middlewares;
	};
	return {
		...config,
		allowedHosts: [
			"aqua-book.ru",
			"api.aqua-book.ru",
			"it.aqua-book.ru",
			"staging.aqua-book.ru",
		],
	};
};

const overrideWebpackConfig = (config, env) => {
	const oneOfRule = config.module.rules.find(rule => Array.isArray(rule.oneOf));
	if (oneOfRule) {
		const sassRule = oneOfRule.oneOf.find(rule => rule.test && rule.test.toString().includes("sass|scss"));
		if (sassRule) {
			sassRule.use.push({
				loader: require.resolve("sass-loader"),
				options: {
					additionalData: "@import './src/scss/globalscss/_global.scss';",
				},
			});
		} else {
			// Добавляем правило для SASS/SCSS файлов, если оно не найдено
			oneOfRule.oneOf.push({
				test: /\.(sass|scss)$/,
				use: [
					require.resolve('style-loader'),
					require.resolve('css-loader'),
					{
						loader: require.resolve('sass-loader'),
						options: {
							additionalData: "@import './src/scss/globalscss/_global.scss';",
						},
					},
				],
			});
			console.error("SASS rule was not found and has been added to 'oneOf' rules");
		}
	} else {
		console.error("Cannot find 'oneOf' rule in Webpack config");
	}

	config.resolve = {
		...config.resolve,
		fallback: {
			"http": require.resolve("stream-http"),
			"https": require.resolve("https-browserify"),
			"zlib": require.resolve("browserify-zlib"),
			"stream": require.resolve("stream-browserify"),
		}
	};

	if (env === 'production') {
		config.optimization = {
			...config.optimization,
			minimize: true,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						compress: {
							drop_console: true,
						},
					},
				}),
			],
			splitChunks: {
				chunks: 'all',
				maxInitialRequests: 30,
				maxAsyncRequests: 30,
				minSize: 10000,
				cacheGroups: {
					defaultVendors: {
						test: /[\\/]node_modules[\\/]/,
						priority: -10,
						reuseExistingChunk: true,
					},
					default: {
						minChunks: 2,
						priority: -20,
						reuseExistingChunk: true,
					},
				},
			},
		};
		config.plugins.push(new CompressionPlugin());
	}

	return config;
};

module.exports = {
	webpack: override(
		overrideWebpackConfig,
		addPostcssPlugins([
			require('tailwindcss'),
			require('autoprefixer'),
		]),
		addWebpackAlias({
			['@']: path.resolve(__dirname, 'src'),
		}),
		(config) => {
			if (process.env.BUNDLE_VISUALIZE) {
				config = addBundleVisualizer({ openAnalyzer: false })(config);
			}
			return config;
		}
	),
	devServer: overrideDevServer(overrideDevServerConfig()),
};
