"use strict";
/**
* User Model
* @class
* @extends $.model
*/
class User extends $.baseModel {

    /**
    * Name of model database table name.
    * @method tableName
    * @returns {string}
    */
    static get tableName() {
        return "users";
    }

    /**
     * @param data
     * @return {Promise<*>}
     */
    static async authDataProvider(data) {
        return User.query().where({username: data.key}).first();
    }


    /**
     * Pick data returned to frontend javascript
     * @returns []
     */
    static jsPick(){
        return [
            'email',
            'username',
            'last_seen'
        ]
    }

}

User.prototype.$hidden = [];

module.exports = User;
