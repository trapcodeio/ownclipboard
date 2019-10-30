"use strict";
/**
 * ContentController
 * @type {ControllerService}
 */
const ContentController = $.handler({
    // Controller Name
    name: "ContentController",
    // Controller Middlewares
    middlewares: {},
    // Controller Default Service Error Handler.
    e: (x, error) => x.send({error}),


    /**
     * Example Method.
     * @returns {*}
     */
    index: {send: "Hello World"},
});


module.exports = ContentController;
