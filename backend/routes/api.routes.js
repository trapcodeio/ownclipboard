/**
 * @type {XpresserRouter}
 */
const Route = $.router;

module.exports = () => {
    Route.path('auth', () => {
        Route.get('=auth');
        Route.post('@checkUsername');
        Route.post('@register');
    }).controller('Auth', true).as('auth');
};
