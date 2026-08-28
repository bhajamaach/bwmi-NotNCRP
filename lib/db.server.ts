import { Pool } from "pg";
import { demoUsers, seededComplaints, seededGrievances } from "@/lib/seed-data";

// Server-only — never import this from a "use client" component. Route
// handlers run in the Node.js runtime, so a plain `pg` Pool is fine here;
// point DATABASE_URL at a pooled connection string (e.g. Neon's "-pooler"
// host) so serverless cold starts don't exhaust the database's connection limit.
const globalForPool = globalThis as unknown as { pgPool?: Pool };

export const pool =
  globalForPool.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === "false" ? undefined : { rejectUnauthorized: false },
    max: 3
  });

if (process.env.NODE_ENV !== "production") globalForPool.pgPool = pool;

const SCHEMA_SQL = `
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

let readyPromise: Promise<void> | null = null;

async function seedIfEmpty() {
  const { rows } = await pool.query("SELECT COUNT(*)::int AS count FROM users");
  if (rows[0].count > 0) return;

  for (const user of demoUsers) {
    await pool.query(`INSERT INTO users (id, name, mobile, is_demo) VALUES ($1, $2, $3, $4)`, [
      user.id,
      user.name,
      user.mobile,
      user.isDemo
    ]);
  }
  for (const complaint of seededComplaints) {
    await pool.query(
      `INSERT INTO complaints (id, user_id, ack_number, status, is_anonymous, created_at, data)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        complaint.id,
        complaint.userId,
        complaint.ackNumber,
        complaint.status,
        Boolean(complaint.isAnonymous),
        complaint.createdAt,
        complaint
      ]
    );
  }
  for (const grievance of seededGrievances) {
    await pool.query(
      `INSERT INTO grievances (id, user_id, petition_number, stage, created_at, data)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [grievance.id, grievance.userId, grievance.petitionNumber, grievance.stage, grievance.createdAt, grievance]
    );
  }
  console.log("Seeded initial demo data (first boot).");
}

// Every route handler awaits this before touching the database — cheap after
// the first call (Postgres no-ops `CREATE TABLE IF NOT EXISTS`, and the seed
// check is a single indexed count), and it means there's no separate deploy
// step to run a migration/seed script against a fresh database.
export function ready() {
  if (!readyPromise) {
    readyPromise = pool.query(SCHEMA_SQL).then(() => seedIfEmpty());
  }
  return readyPromise;
}
