exports.up = function(knex) {
  return (
      knex.schema
        .alterTable('task-categories', table => {
            table.integer('task_id')
                    .unsigned()
                    .notNullable()
                    .references('id')
                    .inTable('tasks')
                    .onUpdate('CASCADE')
                    .onDelete('CASCADE');
        })
  )
};

exports.down = function(knex) {
  
};
