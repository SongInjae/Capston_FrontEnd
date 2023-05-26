const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        // createProxyMiddleware('/users/google-login', {
        //     target: 'http://localhost:3000',

        //     changeOrigin: true
        // }),
        createProxyMiddleware('/users/google-login', {
            target: 'http://3.35.38.254:8000',
            // pathRewrite: {
            //     '^/users/google-login': ''
            // },
            changeOrigin: true
        })
    )


}; 
