"use strict";
const Device = $.use.model("Device");
/**
 * DeviceController
 * @type {ControllerService}
 */
const DeviceController = $.handler({
    // Controller Name
    name: "DeviceController",
    // Controller Middlewares
    middlewares: {},
    // Controller Default Service Error Handler.
    e: $$.defaultErrorHandler,

    boot: http => ({user: http.authUser()}),


    /**
     * Example Method.
     * @returns {*}
     */
    all: async (http, {user}) => {
        const user_id = user.id;
        const page = Number(http.query('page', 1));
        const devices = await Device.query().where({user_id})
            .orderBy('id', 'desc')
            .paginate(page, 20);

        return http.toApi({devices});
    },

    add: (http, {user}, error) => {
        const name = http.body("name", "");
        if (name && name.length < 2) {
            return error(`Device name is too short.`);
        }
        const device = Device.query().insert({
            user_id: user.id,
            code: $.helpers.randomStr(20)
        });

        return http.toApi({device})
    }
});


module.exports = DeviceController;
