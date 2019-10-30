/**
 * @type {import("@xpresser/router") | XpresserRouter}
 */
const Route = $.router;
const apiRoutes = require('./routes/api.routes');

Route.get('/', 'App@index');
Route.path('/api', apiRoutes).middleware('XhrRequestsOnly');

