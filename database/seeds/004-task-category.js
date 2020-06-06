exports.seed = function(knex) {
  return knex('task-categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('task-categories').insert([
        {task_id: 1, category_id: 1},
        {task_id: 2, category_id: 1},
        {task_id: 3, category_id: 1},
        {task_id: 4, category_id: 1},
        {task_id: 5, category_id: 1},
        {task_id: 6, category_id: 1}
      ]);
    });
};
