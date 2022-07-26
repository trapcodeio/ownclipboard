"use strict";
const BaseModel = require("./BaseModel");

/**
 * User Model
 
 */
class User extends BaseModel {
    /**
     * Name of model database table name.
     * @method tableName
     * @returns {string}
     */
    static get tableName() {
        return "users";
    }

    /**
     * @return {Promise<*>}
     * @param value
     */
    static async authDataProvider(value) {
        return User.query().where({ username: value }).first();
    }

    /**
     * Pick data returned to frontend javascript
     * @returns []
     */
    static jsPick() {
        return ["email", "username", "last_seen"];
    }
}

User.prototype.$hidden = [];

module.exports = User;
