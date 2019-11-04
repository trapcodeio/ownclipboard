"use strict";
const bcrypt = require("bcryptjs");
const User = $.use.model('User');

const DataSchema = {
    username: 3,
    password: 3
};

/**
 * AuthController
 * @type {ControllerService}
 */
const AuthController = $.handler({
    // Controller Name
    name: "AuthController",
    // Controller Middlewares
    // middleware: {'@change_password': 'dyccyw'},
    // Controller Default Service Error Handler.
    e: $$.defaultErrorHandler,

    boot: async (http) => {
        let username = http.query().removeNull(true).get('username', false);

        if (!username) {
            username = http.body().removeNull(true).get('username', username)
        }

        if (username) username = username.toLowerCase();

        const user = (typeof username === "string" && !(username.length < DataSchema.username)) ? await User.query().where({username}).first() : false;
        return {user, username}
    },

    auth: (http) => {
        const logged = http.isLogged();
        const user = http.authUser();

        if(user){
            user.$pick([
                'username',
            ])
        }

        return http.toApi({
            user: logged ? user : false,
            logged,
        })
    },

    checkUsername: async (http, boot, error) => {
        const {user, username} = boot;

        if (username && username.length < DataSchema.username)
            return error(`Username too short.`);

        return http.toApi({exists: !!user});
    },

    login: async (http, boot, error) => {
        const {user, username} = boot;
        if (!user) return error(`Account with  ${username} does not exist.`);

        let password = http.body().removeNull(true).get('password', '');
        if (password.length < DataSchema.password) {
            return error(`Password too short.`)
        }

        const isPassword = bcrypt.compareSync(password, user.password);
        if (!isPassword) {
            return error(`Password incorrect for username: ${username}`)
        }

        http.loginUser(username);

        user.$pick(User.jsPick());

        // Set Session Keys
        return http.toApi({user, __say: `Login successful.`})
    },

    register: async (http, boot, error) => {
        const {user, username} = boot;
        if (user) return error(`Username ${username} already exists.`);

        let password = http.body().removeNull(true).get('password', '');
        if (password.length < 4) {
            return error(`Password too short.`)
        }

        password = bcrypt.hashSync(password, 10);
        const NewUser = {username, password};
        // Add user to database
        await User.query().insert(NewUser);

        return http.sayToApi(`Registration successful, login now!`)
    },

    logout: (http) => {
        http.logout();
        return http.toApi({logged: http.isLogged()});
    },

    change_password: (http, boot, error) => {
        const needed = ['current', 'password'];
        const body = http.body();
        const user = http.authUser();

        if (!user) {
            return error(`You are not logged!`);
        }

        if (!body.removeNull(true).exists(needed)) {
            return error(`Fields missing.`);
        }

        const {current, password} = body.pick(needed);

        if (!bcrypt.compareSync(current, user.password)) {
            return error('Old password provided is not correct!')
        }

        user.$query().updateAndFetch({
            password: bcrypt.hashSync(password, 10)
        });

        http.logout();

        return http.sayToApi(`Password changed successfully, please re-login.`);
    }
});


module.exports = AuthController;
