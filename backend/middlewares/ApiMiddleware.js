"use strict";
const Device = $.use.model('Device');
const User = $.use.model('User');

/**
 * ApiMiddleware
 */
module.exports = {

    // Default middleware action
    async allow(http) {
        // Errors
        const apiKeyNotFound = {type: 'not_found', message: `ApiKey not found in request.`};
        const apiKeyNotValid = {type: "not_valid", message: `ApiKey found but not valid.`};
        const apiKeyNotConnected = {
            type: "not_valid",
            message: `ApiKey not connected, use /api/connect for first api key connection.`
        };

        // Get ApiKey from query.
        let apiKey = http.query('api_key', false);

        // If false check in body.
        if (!apiKey) {
            apiKey = http.body('api_key', false);
        }

        // if false or not string trigger error.
        if (!apiKey) {
            return http.toApiFalse({error: apiKeyNotFound}, 401);
        }

        if (typeof apiKey !== "string" || apiKey.length !== 100) {
            return http.toApiFalse({error: apiKeyNotValid}, 401);
        }

        // Find ApiKey
        const device = await Device.query().where({api_key: apiKey}).first();
        if (!device) {
            return http.toApiFalse({error: apiKeyNotValid}, 401);
        }

        const url = '/connect';
        if (!device.used && http.req.path !== url) {
            return http.toApiFalse({error: apiKeyNotConnected}, 401);
        }

        const user = await User.query().where({id: device.user_id}).first();

        http.locals.set('api_key', apiKey);
        http.locals.set('api_device', device);
        http.locals.set('api_user', user);

        const hits = (device.hits || 0) + 1;
        // Update Hits in background
        Device.query().where({api_key: apiKey}).update({hits}).then(() => {
            // Do nothing..
        });

        return http.next();
    }

};
