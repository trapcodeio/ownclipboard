"use strict";
const Device = $.use.model('Device');
/**
 * Api
 */
module.exports = {
    namespace: "Api",

    /**
     * The `index` method is called by default.
     * it also inherits namespace as name.
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
