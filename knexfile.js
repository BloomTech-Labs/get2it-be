require("dotenv").config();

module.exports = {
    development: {
      client: 'mysql',
      version: '2.17.1',
      useNullAsDefault: true,
      connection: {
        host: "localhost",
        user: "root",
        password: "get2itlabs",
        database: "get2it",
      },
      // pool: {
      //   afterCreate: (conn, done) => {
      //     conn.run('PRAGMA foreign_keys = ON', done);
      //   },
      // },
      migrations: {
        directory: './database/migrations',
      },
      seeds: {
        directory: './database/seeds',
      },
    },
    production: {
      client: 'mysql',
      version: '2.17.1',
      useNullAsDefault: true,
      connection: {
        host: "us-cdbr-iron-east-05.cleardb.net",
        user: "b98d8364ee5a1c",
        password: "7920ee1e",
        database: "heroku_d1dd11759650ef7",
      }
    }
  };