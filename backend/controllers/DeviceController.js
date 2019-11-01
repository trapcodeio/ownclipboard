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

    /**
     * Boot Method for all methods defined
     * @param http
     * @param error
     * @returns {Promise<{user: *, device: *}>}
     */
    boot: async (http, error) => {
        // Get current auth user.
        const user = http.authUser();
        // Get Device from params
        let device = http.params.device || undefined;

        // if device then add to boot return values
        if (device) {
            device = await Device.query().where({user_id: user.id, code: device}).first()
            if (!device) {
                return error(`Device not found, maybe already deleted.`);
            }
        }

        // return to every method.
        return {user: http.authUser(), device};
    },


    /**
     * Example Method.
     * @returns {*}
     */
    all: async (http, {user}) => {
        // Get user id
        const user_id = user.id;
        // Get page from query.
        const page = Number(http.query('page', 1));
        // Get User devices.
        const devices = await Device.query().where({user_id})
            .orderBy('id', 'desc')
            .paginate(page, 20);

        // Say to api.
        return http.toApi({devices});
    },

    add: async (http, {user}, error) => {
        // Get name from body
        const name = http.body("name", "");
        // validate name
        if (name && name.length < 2) {
            return error(`Device name is too short.`);
        }

        // Generate api_key and code random strings
        const api_key = $.helpers.randomStr(100).toUpperCase();
        const code = $.helpers.randomStr(20);

        // Inset new device.
        const device = await Device.query().insert({
            user_id: user.id,
            name,
            code,
            api_key,
            enabled: true
        });

        return http.toApi({device, created: true, __say: 'Device added successfully.'})
    },

    delete: async (http, {device}) => {
        // Get device name
        const name = device.name;
        // delete Device.
        await device.$query().delete();
        // Say to Api
        return http.sayToApi(`Device: ${name}, deleted successfully.`);
    }
});


module.exports = DeviceController;
