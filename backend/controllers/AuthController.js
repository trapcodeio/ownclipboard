"use strict";
const User = $.use.model('User');
/**
 * AuthController
 * @type {ControllerService}
 */
const AuthController = $.handler({
    // Controller Name
    name: "AuthController",
    // Controller Middlewares
    middlewares: {},
    // Controller Default Service Error Handler.
    e: (http, error) => {
        if (typeof error === "object") {
            return http.toApiFalse(error);
        } else {
            return http.sayToApi(error, false)
        }
    },

    boot: async (http) => {
        let username = http.query('username', false);

        if (!username) {
            username = http.body('username', username)
        }

        const user = typeof username === "string" && username.length ? await User.query().where({username}).first() : false;
        return {user, username}
    },

    auth: () => {
        return {user: {name: "John"}}
    },

    checkUsername: {
        next: async ({http, boot, error}) => {
            const {user} = boot;

            if (!user) return error({exists: false});
            return http.toApi({exists: true});
        }
    },

    register: {
        next: ({http, boot, error}) => {
            const {user, username} = boot;
            if (user) return error(`Username ${username} already exists.`);

            const password = http.body().removeNull(true).get('password', '');

            if (password.length < 4) {
                return error(`Password too short.`)
            }

            return http.toApi({username, password})
        }
    }
});


module.exports = AuthController;
