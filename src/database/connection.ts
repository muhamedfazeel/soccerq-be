import { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";
import { config } from "../config/config";

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  port: +config.db.port,
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
