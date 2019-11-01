"use strict";
/**
 * AuthMiddleware
 */
module.exports = {

    // Default middleware action
    allow(http) {
        // run check here
        if (!http.isLogged()) {
            if (http.req.xhr) {
                return http.sayToApiFalse(`You are not logged`, false, 401);
            }

            return http.redirectToRoute('auth');
        }

        return http.next();
    }

};
