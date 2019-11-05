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
  };