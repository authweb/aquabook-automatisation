const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/api",
		createProxyMiddleware({
			target: "https://api.aqua-book.ru",
			changeOrigin: true,
			onProxyReq: (proxyReq, req) => {
				if (!req.body || !Object.keys(req.body).length) {
					return;
				}

				const contentType = proxyReq.getHeader("Content-Type");

				if (contentType.includes("application/json")) {
					const bodyData = JSON.stringify(req.body);
					// Set the content length header for the proxy request
					proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
					// Write the JSON stringified body to the proxy request
					proxyReq.write(bodyData);
				}
			},
		}),
	);
};
