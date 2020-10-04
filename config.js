const Base = __dirname;
const env = require('@xpresser/env')(Base);
const isDev = env['NODE_ENV'] === 'development';
// const ngrok = 'clip.ngrok.io';
const ngrok = false;
const domain = ngrok || env['APP_DOMAIN'] || 'localhost';

module.exports = {
    name: 'OwnClipboard',
    env: env['NODE_ENV'],

    server: {
        domain,
        port: env['APP_PORT'],
        includePortInUrl: !ngrok,
        use: {
            session: true,
            cors: true
        }
    },

    database: {
        startOnBoot: true,
        config: {
            client: 'sqlite3',
            connection: () => ({
                filename: __dirname + '/database.sqlite'
            }),
            useNullAsDefault: true
        },
        /*config: {
            client: env['DATABASE_CLIENT'],
            connection: {
                host: env['DATABASE_HOST'],
                port: env['DATABASE_PORT'],
                user: env['DATABASE_USER'],
                password: env['DATABASE_PASSWORD'],
                database: env['DATABASE_NAME'],
                ssl: {
                    ca: fs.readFileSync(Base+'/db_cert.crt').toString()
                }
            },
        }*/
    },
    paths: {
        base: Base,
        public: 'dist',
        jsonConfigs: 'backend://',
    },
    session: {
        useDefault: true,
        cookie: {
            domain
        },
        ssl: {
            enabled: env['SSL'],
            files: {
                cert: env['SSL_CERT'],
                key: env['SSL_KEY']
            }
        },
    },

    response: {
        cacheFiles: !isDev,
        cacheFileExtensions: ['js', 'css', 'woff2'],
    },

    plugins: {
        '@xpresser/auth': {
            model: 'User',
            modelPrimaryKey: 'username',
            userPasswordProvider: 'authPasswordProvider',
            userDataProvider: 'authDataProvider',
            userRegisterHandler: 'authRegisterHandler',
        }
    },

    packages: {
        'body-parser': {
            json: {limit: '50mb', extended: true},
            urlencoded: {limit: '50mb', extended: true}
        }
    }
};
