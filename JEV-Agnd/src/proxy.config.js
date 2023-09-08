// CORS Config
const PROXY_CONFIG = [
    {
        context: [
            "/api"
        ],
        target: "http://filhodonordeste.lovestoblog.com/",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/": ""
        }
    }
];

module.exports = PROXY_CONFIG;