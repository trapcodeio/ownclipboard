const { $ } = require("../xpresser");
const Route = $.router;

// Require Api Routes
require("./routes/api.routes.js");

const apiRoutes = require("./routes/auth.routes");
const loggedRoutes = require("./routes/logged.routes");

Route.path("/secure").middleware("XhrRequestsOnly");
Route.path("/secure", apiRoutes);
Route.path("/secure/logged", loggedRoutes).middleware(["Auth"]);
Route.routesAfterPlugins = () => {
    Route.get("/*", "App@vue");
};
