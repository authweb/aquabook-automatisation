const { override, overrideDevServer } = require("customize-cra");

// Ваша функция для модификации настроек devServer
const overrideDevServerConfig = () => config => {
	return {
		...config,
		allowedHosts: [
			// Это позволит указанным хостам
			"aqua-book.ru",
			"api.aqua-book.ru",
			"it.aqua-book.ru",
			"staging.aqua-book.ru",
			// и так далее...
		],
		// другие настройки...
	};
};

// Ваша текущая функция override для обновления правил Webpack
const overrideWebpackConfig = (config, env) => {
	// Цепочка find может привести к ошибкам если структура конфига изменена
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

	return config;
};

module.exports = {
	webpack: override(overrideWebpackConfig),
	devServer: overrideDevServer(overrideDevServerConfig()),
};
