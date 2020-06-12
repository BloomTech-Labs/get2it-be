
exports.up = function(knex) {
    return (
        knex.schema
            .createTable('users', users => {
                users.increments();
                users.string('displayName', 128).notNullable();
                users.string('email', 128).notNullable().unique();
                users.string('password', 128).notNullable();
            })
            .createTable('tasks', tasks => {
                tasks.increments();
                tasks.integer('user_id')
                    .unsigned()
                    .notNullable()
                    .references('id')
                    .inTable('users')
                    .onUpdate('CASCADE')
                    .onDelete('RESTRICT');
                tasks.string('name').notNullable();
                tasks.boolean('status');
                tasks.date('date');
                tasks.string('start_time');
                tasks.string('end_time');
                tasks.string('task_icon');
                tasks.integer('timeLeft');
                tasks.integer('notificationId');
                tasks.boolean('initialNotify').defaultTo(false);
                tasks.boolean('notifyOn').defaultTo(false);
            })
            .createTable('categories', categories => {
                categories.increments();
                categories.integer('user_id')
                    .unsigned()
                    .notNullable()
                    .references('id')
                    .inTable('users')
                    .onUpdate('CASCADE')
                    .onDelete('RESTRICT');
                categories.string('name')
            })
            .createTable('task-categories', table => {
                table.integer('task_id')
                    .unsigned()
                    .notNullable()
                    .references('id')
                    .inTable('tasks')
                    .onUpdate('CASCADE')
                    .onDelete('RESTRICT');
                table.integer('category_id')
                    .unsigned()
                    .notNullable()
                    .references('id')
                    .inTable('categories')
                    .onUpdate('CASCADE')
                    .onDelete('RESTRICT');
                table.primary(['task_id', 'category_id'])
            })
    )
};

exports.down = function(knex) {
    return (
        knex.schema
            .dropTableIfExists('task-categories')
            .dropTableIfExists('categories')
            .dropTableIfExists('tasks')
            .dropTableIfExists('users')
    )
};
