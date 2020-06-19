const db = require('../database/dbConfig.js');

module.exports = {
    findById,
    assignCategory,
    update,
    findTasks
};

// (id) below is the task id
function findById(id) {
    return db('task-categories')
        .where({task_id: id})
        .first()
};

function assignCategory(combo) {
    return db('task-categories')
        .insert(combo)
};

function update(combo, id) {
    return db('task-categories')
        .where({task_id: id})
        .update(combo)
}
  
  // (id) below is the category id
  function findTasks(id) {
    return db('task-categories as tc')
      .join('tasks as t', 't.id', 'tc.task_id')
      .join('categories', 'categories.id', 'tc.category_id')
      .select('t.name', 't.status', 't.date', 't.start_time', 't.end_time', 't.task_icon', 't.timeLeft', 't.initialNotify', 't.notifyOn', 't.id', 't.user_id')
      .where({category_id: id})
};
  