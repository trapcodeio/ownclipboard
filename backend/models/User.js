"use strict";
/**
* User Model
* @class
* @extends $.model
*/
class User extends $.model {

    /**
    * Name of model database table name.
    * @method tableName
    * @returns {string}
    */
    static get tableName() {
        return "users";
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
