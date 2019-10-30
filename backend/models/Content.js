"use strict";
/**
* Content Model
* @class
* @extends $.model
*/
class Content extends $.model {

    /**
    * Name of model database table name.
    * @method tableName
    * @returns {string}
    */
    static get tableName() {
        return "contents";
    }

}

Content.prototype.$hidden = [];

module.exports = Content;
