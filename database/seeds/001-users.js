const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          displayName: "bob1",
          password: bcrypt.hashSync('1234test', 10),
          email: 'bob1@gmail.com'
        },
        {
          displayName: "bob2",
          password: bcrypt.hashSync('1234test', 10),
          email: 'bob2@gmail.com'
        },
        {
          displayName: "bob3",
          password: bcrypt.hashSync('1234test', 10),
          email: 'bob3@gmail.com'
        }
      ]);
    });
};
