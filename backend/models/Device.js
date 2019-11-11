"use strict";

/**
 * Device Model
 * @class
 * @extends $.model
 */
class Device extends $.model {

    /**
     * Name of model database table name.
     * @method tableName
     * @returns {string}
     */
    static get tableName() {
        return "devices";
    }

    static get jsPick() {
        return [
            'name',
            'code',
            'used',
            'used_by',
            'user_id',
            'hits',
            'api_key',
            'created_at',
            'updated_at'
        ]
    }


}

Device.prototype.$hidden = [];

module.exports = Device;
