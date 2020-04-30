const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  deleteUser
};

function find() {
  return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
  return db('users').where(filter);
}

function add(user) {
  return db('users')
    .insert(user, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function update(changes, id) {
  return db('users')
    .where({ id })
    .update(changes)
}

function deleteUser(id) {
  return db('users')
    .where('id', id)
    .delete()
}
