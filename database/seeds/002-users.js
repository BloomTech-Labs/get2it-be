exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          displayName: "bob1",
          password: '1234test',
          email: 'bob1@gmail.com'
        },
        {
          displayName: "bob2",
          password: '1234test',
          email: 'bob2@gmail.com'
        },
        {
          displayName: "bob3",
          password: '1234test',
          email: 'bob3@gmail.com'
        }
      ]);
    });
};
