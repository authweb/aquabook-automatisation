const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/api",
		createProxyMiddleware({
			target: "http://aqua-book:3306",
			changeOrigin: true,
		}),
	);
};
