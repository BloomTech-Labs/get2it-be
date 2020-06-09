exports.seed = function(knex) {
  return knex('categories').del()
    .then(function () {
      return knex('categories').insert([
        {
          name: 'Personal',
          user_id: 1
        },
        {
          name: 'Personal',
          user_id: 2
        },
        {
          name: 'Personal',
          user_id: 3
        }
      ]);
    });
};
