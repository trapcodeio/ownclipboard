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

    boot: async (http, error) => {
        // Get current auth user.
        const user = http.authUser();
        // Get Device from params
        let content = http.params.content || undefined;

        // if device then add to boot return values
        if (content) {
            content = await Content.query().where({user_id: user.id, code: content}).first();
            if (!content) {
                return error(`Content not found, maybe already deleted.`);
            }
        }


        // return to every method.
        return {user: http.authUser(), content};
    },

    /**
     * Example Method.
     * @returns {*}
     */
    all: async (http, {user}) => {
        let page = http.query('page', 1);
        let search = http.query('search', undefined);
        if (Number(page) < 1) page = 1;

        let query = Content.query().where({user_id: user.id});
        if (search && search.length > 1) {
            query.where('content', 'like', `%${search}%`)
        }

        const contents = await query.orderBy('id', 'desc')
            .paginate(page, 20);

        for (const content of contents.data) {
            content.$pick(Content.jsPick);
        }

        return http.toApi({contents, search});
    },

    create: {
        'content.add': true
    },

    delete: async (http, {content}) => {
        await content.$query().delete();
        return http.toApi({});
    }
});


module.exports = ContentController;
