const Route = $.router;

/**
 * All "/api" routes are defined here.
 */

// This validates the api routes.
// It is used to validate that an endpoint belongs to OwnClipBoard.
Route.post("/api/validate", "Api@validate");

Route.path("/api").middleware("Api");
Route.path("/api", () => {
    Route.post("@connect");
    Route.get("@all");
    Route.post("@add");
    Route.delete("@delete");

    Route.all("*", "notFound");
})
    .controller("Api", true)
    .as("api");
