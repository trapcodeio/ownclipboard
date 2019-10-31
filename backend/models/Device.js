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


}

Device.prototype.$hidden = [];

module.exports = Device;
