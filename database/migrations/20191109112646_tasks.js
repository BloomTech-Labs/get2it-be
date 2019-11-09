
exports.up = function(knex) {
    return knex.schema.createTable('tasks', tasks => {
        tasks.increments();

        tasks.integer('user_id').unsigned().notNullable().references('id').inTable('users');
        tasks.boolean('status');
        tasks.date('date');
        tasks.string('start_time');
        tasks.string('end_time');
        tasks.string('label_color');
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('tasks')
};
