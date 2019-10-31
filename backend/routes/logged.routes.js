/**
 * @type {XpresserRouter}
 */
const Route = $.router;

module.exports = () => {

    Route.path('content', () => {

        Route.get('=all');
        Route.post('@create')

    }).controller('Content', true).as('content');

    Route.path('devices', () => {

        Route.get('=all');
        Route.post('@add')


    }).controller('Device', true).as('devices');

    // Route.path('')
};
