/**
 * @param {knex} knex
 */
exports.up = function (knex) {
    return knex.schema.createTable("users", ($table) => {
        $table.increments("id");
        $table.string("username");
        $table.string("email").nullable();
        $table.string("password");
        $table.string("empty_password").nullable();
        $table.string("delete_password").nullable();
        $table.timestamp("last_seen").nullable();
        $table.json("extra").defaultTo("{}");
        $table.timestamps(true, true);
    });
};
/**
 * @param {knex} knex
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users")
};
