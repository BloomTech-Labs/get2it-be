
exports.up = function(knex) {
    return knex.schema.alterTable('tasks', tasks => {

        tasks.integer('timeLeft');
        tasks.boolean('initialNotify').defaultTo(false);
        tasks.boolean('notifyOn').defaultTo(false);
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('tasks')
};
