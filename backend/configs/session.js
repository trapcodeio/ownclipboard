"use strict";
module.exports = ($) => ({
    /**
     * Enable this plugin
     */
    enabled: true,
    /**
     * Use Default Store
     */
    useDefault: true,
    /**
     * Use LanIp as Domain (For Development)
     */
    useLanIpAsDomain: false,
    /**
     * Slugify the session name
     */
    slugifyName: true,
    /**
     * Session Configuration settings
     * The session plugin used is `express-session`
     *
     * The configs below are the minimal required configs.
     * Check here for full configuration.
     * https://www.npmjs.com/package/express-session
     */
    sessionConfig: {
        secret: "!XpresserSecretKey!",
        cookie: {
            path: $.config.get("server.root"),
            domain: $.config.get("server.domain"),
            maxAge: 5000 * 60 * 24
        },
        resave: true,
        saveUninitialized: true
    },
    /**
     * Default Store used: `connect-session-knex`
     * The default settings uses an sqlite file.
     *
     * You can also check other SQL configs of saving your session in databases
     * like PostgreSQL, MySQL, MariaDB, MSSQL, Oracle or SQLite3
     *
     * See Configuration here
     * https://www.npmjs.com/package/connect-session-knex
     */
    storeConfig: {
        client: "sqlite3",
        connection: {
            filename: $.path.frameworkStorageFolder("sessions.sqlite")
        },
        useNullAsDefault: true
    },
    /**
     * Use Custom Store instead of default store.
     * This option will only be checked if useDefault is false.
     */
    customStore(use) {
        // const store = new YourCustomStore();
        return use({
            ...this.sessionConfig
            // store,
        });
    },
    /**
     * LanIpAsDomain Keys
     * if useLanIpAsDomain is enabled, these keys in your config will be changed to your lanIp
     * on boot.
     */
    useLanIpAsDomainKeys: [
        "server.domain",
        "session.cookie.domain" // Session cookie domain.
    ]
});
