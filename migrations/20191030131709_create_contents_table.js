/**
 * @param {knex} knex
 */
exports.up = function (knex) {
    return knex.schema.createTable("contents", ($t) => {
        $t.increments('id');
        $t.integer('user_id');
        $t.string('code');
        $t.string('type').defaultTo('text');
        $t.string('type_id').nullable();
        $t.text('content').nullable();
        $t.boolean('locked').defaultTo(false);
        $t.boolean('favorite').defaultTo(false);
        $t.string('device_code').nullable();
        $t.json('extra');
        $t.timestamps(true, true);
    })
};
/**
 * @param {knex} knex
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("contents");
};
