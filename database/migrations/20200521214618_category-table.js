
exports.up = function(knex) {
  return knex.schema.createTable('categories', categories => {
    categories.increments();
    categories.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    categories.string('name').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('categories')
};
