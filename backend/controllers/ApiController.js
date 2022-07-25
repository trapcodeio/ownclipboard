"use strict";
const Content = require("../models/Content");

/**
 * ApiController
 * @type {Xpresser.Controller.Handler}
 */
const ApiController = $.handler({
    // Controller Name
    name: "ApiController",
    // Controller Middleware
    middlewares: {},
    // Controller Default Service Error Handler.
    e: $$.defaultApiErrorHandler,

    boot: async (http) => {
        const api_key = http.state.get("api_key");
        const device = http.state.get("api_device");
        const user = http.state.get("api_user");
        const clip = http.state.get("api_clip");

        return { device, api_key, user, clip };
    },

    validate(http) {
        return $$.toApi(http, {
            allowPublicValidation: true
        });
    },

    /**
     * Connect .
     * @returns {*}
     */
    connect: async (http, { device }) => {
        let used_by = http.body("device_id", undefined);

        if (!device.used) {
            // noinspection JSCheckFunctionSignatures
            device = await device.$query().updateAndFetch({ used: true, used_by });
        }

        used_by = device.used_by;

        const data = {
            ...device.$pick(["name", "api_key", "hits", "used_by"]),
            used_by
        };

        return $$.toApi(http, data);
    },

    /**
     * Get all User Clips
     * @param http
     * @param user
     * @returns {Promise<void>}
     */
    all: async (http, { user }) => {
        let page = http.query("page", 1);
        let search = http.query("search", undefined);
        if (Number(page) < 1) page = 1;

        let query = Content.query().where({ user_id: user.id });
        if (search && search.length > 1) {
            query.where("content", "like", `%${search}%`);
        }

        const clips = await query.orderBy("id", "desc").paginate(page, 20);

        for (const content of clips.data) {
            content.$pick(Content.jsPick);
        }

        return $$.toApi(http, { search, clips });
    },

    /**
     * Add content using the content add service.
     */
    add: { "content.add": "api" },

    /**
     * Delete Content
     * @param http
     * @param clip
     * @returns {Promise<*>}
     */
    delete: async (http, { clip }) => {
        const code = clip.code;
        await clip.$query().delete();
        return $$.toApi(http, { deleted: true, code });
    },

    /**
     * 404 error response.
     * @param http
     * @param boot
     * @param error
     * @returns {*}
     */
    notFound: (http, boot, error) =>
        error(
            {
                type: "404",
                message: `Route not found!`
            },
            404
        )
});

module.exports = ApiController;
