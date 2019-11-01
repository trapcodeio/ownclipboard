/**
 * @type {XpresserRouter}
 */
const Route = $.router;

Route.path('/api').middleware('Api');
Route.path('/api', () => {

    Route.all('@connect');
    Route.all('@all');
    Route.all('@add');
    Route.all('@delete');
    Route.all('@search');

    Route.get('*', 'notFound');
}).controller('Api', true).as('api');
