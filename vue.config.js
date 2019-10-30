const env = process.env;
// const url = env.APP_PROTOCOL;
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: env.VUE_APP_SERVER_URL,
                ws: false,
                changeOrigin: true
            },
            '/auth': {
                target: env.VUE_APP_SERVER_URL,
                ws: false,
                changeOrigin: true
            }
        }
    }
};
