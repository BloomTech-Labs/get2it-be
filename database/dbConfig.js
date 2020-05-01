const knex = require('knex');

const knexConfig = require('../knexfile.js');

const environment = process.env.DATABASE_URL || "development"

module.exports = knex(knexConfig[environment]);


// Finally got it up to date
