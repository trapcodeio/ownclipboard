"use strict";
/**
 * AppController
 * @type {Xpresser.Controller.Handler}
 */
const AppController = $.handler({
    // Controller Name
    name: "AppController",
    // Controller Middlewares
    middlewares: {},
    // Controller Default Service Error Handler.
    e: (x, error) => x.send({error}),


    /**
     * Vue index method
     * All routes goes here.
     * @returns {*}
     */
    vue: (http) => http.res.sendFile($.path.base("dist/index.html")),
});


module.exports = AppController;
