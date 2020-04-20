const Route = $.router;

/**
 * All "/api" routes are defined here.
 */
Route.path('/api').middleware('Api');
Route.path('/api', () => {

    Route.post('@connect');
    Route.get('@all');
    Route.post('@add');
    Route.delete('@delete');

    Route.all('*', 'notFound');
}).controller('Api', true).as('api');
