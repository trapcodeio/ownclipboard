"use strict";
const Content = $.use.model('Content');

/**
 * ApiController
 * @type {ControllerService}
 */
const ApiController = $.handler({
    // Controller Name
    name: "ApiController",
    // Controller Middlewares
    middlewares: {},
    // Controller Default Service Error Handler.
    e: $$.defaultApiErrorHandler,

    boot: async (http) => {
        const api_key = http.locals.get('api_key');
        const device = http.locals.get('api_device');
        const user = http.locals.get('api_user');
        const clip = http.locals.get('api_clip');

        return {device, api_key, user, clip};
    },


    /**
     * Example Method.
     * @returns {*}
     */
    connect: async (http, {device, user}) => {
        const used_by = http.body('device_id', null);

        if (!device.used) {
            await device.$query().update({used: true, used_by})
        }

        return http.toApi({
            ...device.$pick([
                'api_key',
                'hits'
            ]),
            username: user.username
        });
    },


    /**
     * Get all User Clips
     * @param http
     * @param user
     * @returns {Promise<void>}
     */
    all: async (http, {user}) => {
        let page = http.query('page', 1);
        let search = http.query('search', undefined);
        if (Number(page) < 1) page = 1;

        let query = Content.query().where({user_id: user.id});
        if (search && search.length > 1) {
            query.where('content', 'like', `%${search}%`)
        }

        const clips = await query.orderBy('id', 'desc')
            .paginate(page, 20);

        for (const content of clips.data) {
            content.$pick(Content.jsPick);
        }

        return http.toApi({search, clips});
    },
    add: {
        'content.add': 'api'
    },
    delete: async (http, {clip}) => {
        const code = clip.code;
        await clip.$query().delete();
        return http.toApi({deleted: true, code})
    },
    notFound: (http, boot, error) => error({
        type: '404',
        message: `Route not found!`
    }, 404),
});


module.exports = ApiController;
