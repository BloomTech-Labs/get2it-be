const { Client } = require("pg");

const db = process.env.NODE_ENV === "test" ? "get2it_test" : "get2it";

client = new Client({
    connectionString: `postgresql://localhost/${db}`
});

client.connect();

module.exports = client;

