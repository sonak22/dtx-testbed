const { createProxyMiddleware } = require("http-proxy-middleware");

const mainTarget = process.env.NODE_ENV === "development" ? process.env.REACT_APP_API_URL : "";

// src/setupProxy.js
module.exports = function (app) {
   app.use(
      createProxyMiddleware("/dtxiot", {
         target: mainTarget,
         changeOrigin: true,
      }),
   );
};
