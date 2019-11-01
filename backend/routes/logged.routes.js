/**
 * @type {XpresserRouter}
 */
const Route = $.router;

module.exports = () => {

    Route.path('content', () => {

        Route.get('=all');
        Route.post('@create');
        Route.delete(':content/delete','delete')


    }).controller('Content', true).as('content');

    Route.path('devices', () => {

        Route.get('=all');
        Route.post('@add');
        Route.delete(':device/delete','delete')


    }).controller('Device', true).as('devices');

    // Route.path('')
};
