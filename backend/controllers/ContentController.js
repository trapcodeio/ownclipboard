"use strict";
const Content = $.use.model("Content");

/**
 * ContentController
 * @type {ControllerService}
 */
const ContentController = $.handler({
    // Controller Name
    name: "ContentController",
    // Controller Middlewares
    middlewares: {},
    // Controller Default Service Error Handler.
    e: $$.defaultErrorHandler,

    boot: (http) => {
        return {user: http.authUser()}
    },

    /**
     * Example Method.
     * @returns {*}
     */
    all: async (http, {user}) => {
        let page = http.query('page', 1);
        if (Number(page) < 1) page = 1;

        const contents = await Content.query().where({user_id: user.id})
            .orderBy('id', 'desc')
            .paginate(page, 20);

        for (const content of contents.data) {
            content.$pick(Content.jsPick);
        }

        return http.toApi({contents});
    },

    create: async (http, {user}, error) => {
        const user_id = user.id;
        let exists = true;
        let text = http.body('content', undefined);
        if (!text || (text && !text.trim().length)) {
            return error(`Content is empty.`);
        }

        text = text.trim();

        const isUrl = $$.validURL(text);
        const type = isUrl ? 'url' : 'text';

        let content = await Content.query().where({user_id, content: text}).first();

        if (!content) {
            content = await Content.query().insert({
                code: $.helpers.randomStr(20),
                type,
                user_id,
                content: text,
            });

            exists = false;
        }


        content.$pick(Content.jsPick);

        return http.toApi({content, exists});
    },
});


module.exports = ContentController;
