"use strict";
const BaseModel = require('./BaseModel');

/**
 * Content Model
 * @class
 * @extends $.model
 */
class Content extends BaseModel {

    /**
     * Name of model database table name.
     * @method tableName
     * @returns {string}
     */
    static get tableName() {
        return "contents";
    }

    static get virtualAttributes() {
        return ['html_formatted']
    }

    html_formatted() {
        return $$.nl2br($$.htmlEntities(this.content))
    }

    static get jsPick() {
        return [
            "code",
            "type",
            "content",
            "html_formatted",
            "locked",
            "favorite",
            "created_at"
        ]
    }

}

Content.prototype.$hidden = [];

module.exports = Content;
