import { pool } from "../db";
import { demoUsers, seededComplaints, seededGrievances } from "./seed-data";

// Runs once at server boot. Render's free Postgres starts empty on first
// deploy — this seeds the same demo data `npm run seed` would, but only if
// the users table has nothing in it yet, so it's a no-op on every later boot.
export async function seedIfEmpty() {
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
