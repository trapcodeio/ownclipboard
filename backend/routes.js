/**
 * @type {import("@xpresser/router") | XpresserRouter}
 */
const Route = $.router;
const apiRoutes = require('./routes/api.routes');
const loggedRoutes = require('./routes/logged.routes');

Route.get('/', 'App@index');
Route.path('/api', apiRoutes).middleware('XhrRequestsOnly');
Route.path('/api/logged', loggedRoutes).middleware('XhrRequestsOnly');

