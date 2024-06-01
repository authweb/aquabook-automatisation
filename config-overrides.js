const { override, overrideDevServer, addPostcssPlugins, addWebpackAlias, addBundleVisualizer, addWebpackPlugin } = require('customize-cra');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// Ваша функция для модификации настроек devServer
const overrideDevServerConfig = () => config => {
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

// Ваша текущая функция override для обновления правил Webpack
const overrideWebpackConfig = (config, env) => {
	const ruleIndex = config.module.rules.findIndex(rule => rule.oneOf);
	if (ruleIndex !== -1) {
		const rule = config.module.rules[ruleIndex];
		const sassRuleIndex = rule.oneOf.findIndex(
			r => r.test && r.test.toString().includes("sass|scss"),
		);
		if (sassRuleIndex !== -1) {
			const sassRule = rule.oneOf[sassRuleIndex];
			sassRule.use.push({
				loader: require.resolve("sass-loader"),
				options: {
					additionalData: "@import './src/scss/globalscss/_global.scss';",
				},
			});
		}
	} else {
		console.error("Cannot find 'oneOf' rule in Webpack config");
	}

	// Добавляем оптимизацию для продакшн сборок
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
