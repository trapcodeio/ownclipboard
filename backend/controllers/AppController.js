"use strict";
/**
 * AppController
 * @type {ControllerService}
 */
const AppController = $.handler({
    // Controller Name
    name: "AppController",
    // Controller Middlewares
    middlewares: {},
    // Controller Default Service Error Handler.
    e: (x, error) => x.send({error}),


    /**
     * Example Method.
     * @returns {*}
     */
    vue: (http) => http.res.sendFile($.path.base("dist/index.html")),
});


module.exports = AppController;
