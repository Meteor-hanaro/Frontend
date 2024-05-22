const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
      // target: 'http://43.203.254.84',
      changeOrigin: true,
    })
  );
};
