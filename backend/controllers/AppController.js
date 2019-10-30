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
    index: () => "hello World",
});


module.exports = AppController;
