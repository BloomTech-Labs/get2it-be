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
      .insert(category, 'id')
      .then(([id]) => {
        return findById(id)
      })
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
