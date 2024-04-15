import { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  port: Number(process.env.PGPORT),
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool
  .connect()
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("error conencting to database: ", err.message);
  });

export async function query(
  text: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any[]
): Promise<QueryResult<QueryResultRow>> {
  const start = Date.now();
  let client: PoolClient | undefined;
  try {
    client = await pool.connect();
    const res = await client.query<QueryResultRow>(text, params);
    const duration = Date.now() - start;
    console.log("Executed query:", { text, duration, rows: res.rowCount });
    return res;
  } finally {
    if (client) client.release();
  }
}
