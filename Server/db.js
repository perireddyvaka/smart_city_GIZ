const { Pool } = require("pg");

const client = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "bypldb",
  password: "Postgres",
  port: 5432, // Default PostgreSQL port
});


module.exports = client;