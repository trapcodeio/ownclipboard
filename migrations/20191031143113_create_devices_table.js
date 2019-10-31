/**
 * @param {knex} knex
 */
exports.up = function (knex) {
    return knex.schema.createTable("devices", ($t) => {
        $t.increments("id");
        $t.integer('user_id');
        $t.string("name").nullable();
        $t.string("code");
        $t.string("api_key");
        $t.boolean("used").defaultTo(false);
        $t.string("used_by").nullable();
        $t.boolean("enabled").defaultTo(false);
        $t.timestamps(true, true);
    });
};
/**
 * @param {knex} knex
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("devices");
};
