const knex = require('knex');
const config = require('../knexfile');
const environment = process.env.ENVIRONMENT || "production"
const db = knex(config[environment]);

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
        .insert(task)
}

function update(task, id) {
    return db('tasks')
        .where({ id })
        .update(task)
}

function remove(id) {
    return db('tasks')
        .where({ id })
        .del()
}