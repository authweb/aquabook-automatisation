module.exports = function override(config, env) {
  const rule = config.module.rules.find(
    (r) =>
      // it's a oneOf rule
      r.oneOf &&
      // which contains a rule that processes scss files
      r.oneOf.find((rr) => rr.test && rr.test.toString() === '/\\.module\\.(scss|sass)$/'),
  );
  const scssRule = rule.oneOf.find(
    (r) => r.test && r.test.toString() === '/\\.module\\.(scss|sass)$/',
  );
  scssRule.use.push({
    loader: require.resolve('sass-loader'),
    options: {
      additionalData: `@import "./src/scss/globalscss/_global.scss";`,
    },
  });
  return config;
};
