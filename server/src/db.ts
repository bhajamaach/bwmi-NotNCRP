import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "false" ? undefined : { rejectUnauthorized: false }
});

export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT UNIQUE NOT NULL,
  is_demo BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS complaints (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  ack_number TEXT NOT NULL,
  status TEXT NOT NULL,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL,
  data JSONB NOT NULL
);
CREATE INDEX IF NOT EXISTS complaints_user_id_idx ON complaints (user_id);
CREATE INDEX IF NOT EXISTS complaints_is_anonymous_idx ON complaints (is_anonymous);

CREATE TABLE IF NOT EXISTS grievances (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  petition_number TEXT NOT NULL,
  stage TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  data JSONB NOT NULL
);
CREATE INDEX IF NOT EXISTS grievances_user_id_idx ON grievances (user_id);
`;

export async function ensureSchema() {
  await pool.query(SCHEMA_SQL);
}
