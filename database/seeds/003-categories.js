exports.seed = function(knex) {
  return knex('categories').del()
    .then(function () {
      return knex('categories').insert([
        {
          name: 'Brush Teeth',
          user_id: 1,
          task_id: 1
        }
      ]);
    });
};
