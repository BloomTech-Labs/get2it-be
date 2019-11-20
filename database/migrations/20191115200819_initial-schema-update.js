
exports.up = function(knex) {
    return knex.schema.table('users', users => {
        users.string('password', 128);
      })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
};