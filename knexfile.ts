import { config } from "dotenv";
config();

console.log(process.env.PGUSER);
module.exports = {
  client: "pg",
  connection: {
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: "./db/migrations",
    tableName: "knex_migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};
