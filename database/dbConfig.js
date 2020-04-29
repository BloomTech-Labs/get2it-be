const knex = require('knex');

const knexConfig = require('../knexfile.js');

const environment = process.env.ENVIRONMENT || "production"

module.exports = knex(knexConfig[environment]);