"use strict";
/**
 * XhrRequestsOnlyMiddleware
 */
module.exports = (http) => {

    if (!http.req.xhr) {
        return http.toApiFalse({
            message: "Request Method not supported!"
        }, 401);
    }

    return http.next();
};
