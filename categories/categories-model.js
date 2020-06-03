const db = require('../database/dbConfig.js');

module.exports = {
  find,
  findById,
  findCategories,
  add,
  update,
  remove
};

function find() {
  return db('users');
}

function findById(id) {
  return db('categories')
      .where({id})
      .first()
}

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
      .update(task)
}

function remove(id) {
  return db('categories')
      .where({id})
      .del()
}
