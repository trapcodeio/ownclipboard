/**
 * @type {XpresserRouter}
 */
const Route = $.router;

module.exports = () => {

    Route.path('auth', () => {
        Route.get('=auth');
        Route.post('@checkUsername');
        Route.post('@register');
        Route.post('@login');
        Route.post('@logout');
        Route.post('@change_password');
    }).controller('Auth', true).as('auth');

    // Route.path('')
};
