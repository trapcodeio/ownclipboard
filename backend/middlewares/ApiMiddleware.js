"use strict";
const Device = $.use.model('Device');
const User = $.use.model('User');
const Content = $.use.model('Content');


/**
 * ApiMiddleware
 */
module.exports = {

    // Default middleware action
    async allow(http) {
        const error = (error, status = 200) => {
            return $$.defaultApiErrorHandler(http, error, status);
        };
        // Errors
        const apiKeyNotFound = {type: 'api_key_not_found', message: `ApiKey not found in request.`};
        const apiKeyNotValid = {type: 'api_key_not_valid', message: `ApiKey found but not valid.`};
        const apiKeyNotConnected = {
            type: "api_key_not_connected",
            message: `ApiKey not connected, use /api/connect for first api key connection.`
        };

        // Get ApiKey from query.
        let api_key = http.query('api_key', false);

        // If false check in body.
        if (!api_key) {
            api_key = http.body('api_key', false);
        }

        // if false or not string trigger error.
        if (!api_key) {
            return error(apiKeyNotFound, 401);
        }

        if (typeof api_key !== "string" || api_key.length !== 100) {
            return error(apiKeyNotValid, 401);
        }

        // Find ApiKey
        const device = await Device.query().where({api_key}).first();
        if (!device) {
            return error(apiKeyNotValid, 401);
        }

        const url = '/connect';
        if (!device.used && http.req.path !== url) {
            return error(apiKeyNotConnected, 401);
        }

        const user = await User.query().where({id: device.user_id}).first();

        // find clip if exists
        const clipNotFound = {type: 'clip_not_valid', message: `Clip not valid, maybe already deleted.`};
        const clipCodeNotFound = {type: 'clip_not_found', message: `Clip not found in request.`};

        let clip = http.query('clip', http.body('clip', undefined));
        if (clip) {
            clip = await Content.query().where({
                user_id: user.id,
                code: clip
            }).first();

            if (!clip) {
                return error(clipNotFound, 404)
            }
        } else if (!clip && http.req.url.includes('delete')) {
            return error(clipCodeNotFound, 422);
        }


        http.locals.set('api_key', api_key);
        http.locals.set('api_device', device);
        http.locals.set('api_user', user);
        http.locals.set('api_clip', clip);

        // Update Hits in background
        $.events.emit('Api.updateHits', api_key);


        return http.next();
    }

};
