"use strict";
const Device = require('../models/Device');
/**
 * Api
 */
module.exports = {
    namespace: "Api",

    /**
     * Update Hits Event
     * @param api_key
     * @returns {Promise<void>}
     */
    async updateHits(api_key) {
        // Your Code
        const device = await Device.query().where({api_key: api_key}).first();
        if (device) {
            const hits = (device.hits || 0) + 1;
            // noinspection JSCheckFunctionSignatures
            await device.$query().update({hits})
        }

    }

};
