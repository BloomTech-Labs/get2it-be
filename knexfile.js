require("dotenv").config();
const pg = require("pg");
// pg.defaults.ssl = true;

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "get2it",
      database: "get2it"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
    useNullAsDefault: true
  },
  testing: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "test",
      password: "get2it",
      database: "get2it_test"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./database/seeds/test",
    },
  },
};