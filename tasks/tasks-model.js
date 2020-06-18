const db = require('../database/dbConfig.js');

module.exports = {
    find,
    findById,
    findTasks,
    add,
    update,
    remove
};

function find() {
    return db('users');
}

function findById(id) {
    return db('tasks')
        .where({ id })
        .first()
}

function findTasks(id) {
    return db('tasks')
        .where({ user_id: id })
        .orderBy('id')
}

function add(task) {
    return db('tasks')
        .insert(task, 'id')
        .then(([id]) => {
            return findById(id);
        })
}

function update(task, id) {
    return db('tasks')
        .where({ id })
        .update(task)
}

function remove(id) {
    return db('tasks')
        .where({ id })
        .delete()
}
