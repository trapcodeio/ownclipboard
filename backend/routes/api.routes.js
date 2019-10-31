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
    }).controller('Auth', true).as('auth');

    // Route.path('')
};
