const db = require('../database/dbConfig.js');

module.exports = {
  find,
  findById,
  findCategories,
  add,
  update,
  remove,
  assignCategory,
  findTasks
};

function find() {
  return db('users');
}

// (id) below is category id
function findById(id) {
  return db('categories')
      .where({id})
      .first()
}

// (id) below is the user id
function findCategories(id) {
  return db('categories')
      .where({user_id: id})
      .orderBy('id')
}

function add(category) {
  return db('categories')
      .insert(category)
}

function update(category, id) {
  return db('categories')
      .where({id})
      .update(category)
}

function remove(id) {
  return db('categories')
      .where({id})
      .del()
}

function assignCategory(combo) {
  return db('task-categories')
    .insert(combo)
}

// (id) below is the category id
function findTasks(id) {
  return db('task-categories as tc')
    .join('tasks as t', 't.id', 'tc.task_id')
    .join('categories', 'categories.id', 'tc.category_id')
    .select('t.name', 't.status', 't.date', 't.start_time', 't.end_time', 't.task_icon', 't.timeLeft', 't.initialNotify', 't.notifyOn')
    .where({category_id: id})
}
