const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
    find,
    findById,
    findPosts,
    add,
    update,
    remove
};

function find() {
    return db('users');
}

function findById(id) {
    return db('posts')
        .where({ id })
        .first()
}

function findPosts(id) {
    return db('posts')
        .where({ user_id: id })
        .orderBy('id')
}

function add(post) {
    return db('posts')
        .insert(post)
}

function update(post, id) {
    return db('posts')
        .where({ id })
        .update(post)
}

function remove(id) {
    return db('posts')
        .where({ id })
        .del()
}