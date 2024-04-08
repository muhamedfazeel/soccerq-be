const env = process.env;

export const databaseConfig = {
  user: env.PGUSER,
  password: env.PGPASSWORD,
  host: env.PGHOST,
  database: env.PGDATABASE,
  port: env.PGPORT || 5432,
};
