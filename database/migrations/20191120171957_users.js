
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments();

        users.string('username', 128).notNullable().comment('This is the username field');
        users.string('password', 128).notNullable().comment('This is the password field');
        users.string('email', 128).notNullable().comment('This is the email field');
      })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
};
