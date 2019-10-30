const Base = __dirname;
const env = require("xpresser/env")(Base);
const isDev = env["NODE_ENV"] === "development";

module.exports = {
    name: "CloudClipper",
    env: env["NODE_ENV"],

    server: {
        port: env["APP_PORT"]
    },
    database: {
      startOnBoot: true
    },
    paths: {
        base: Base,
        public: "dist",
    },
    session: {
        startOnBoot: true
    },
    response: {
        cacheFiles: !isDev
    }
};
