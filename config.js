const Base = __dirname;
const env = require("xpresser/env")(Base);
const isDev = env["NODE_ENV"] === "development";
// const ngrok = "clip.ngrok.io";
const ngrok = false;
const domain = ngrok || "localhost";

module.exports = {
    name: "CloudClipBoard",
    env: env["NODE_ENV"],

    server: {
        domain,
        port: env["APP_PORT"],
        includePortInUrl: !ngrok
    },
    database: {
      startOnBoot: true
    },
    paths: {
        base: Base,
        public: "dist",
        jsonConfigs: "backend://",
    },
    session: {
        startOnBoot: true,
        cookie: {
            domain
        },
        ssl: {
            enabled: env["SSL"],
            files: {
                cert: env["SSL_CERT"],
                key: env["SSL_KEY"]
            }
        },
    },
    response: {
        cacheFiles: !isDev,
        cacheFileExtensions: ["js", "css", "woff2"],
    },

    plugins: {
        "@xpresser/auth": {
            model: 'User',
            modelWhere: 'username'
        }
    }
};
