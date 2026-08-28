import { pool } from "@/lib/db.server";
import type { Complaint } from "@/lib/types";

export async function loadComplaint(id: string): Promise<Complaint | null> {
  const result = await pool.query("SELECT data FROM complaints WHERE id = $1", [id]);
  return result.rows[0]?.data ?? null;
}

export async function saveComplaint(complaint: Complaint) {
  await pool.query("UPDATE complaints SET status = $2, data = $3 WHERE id = $1", [complaint.id, complaint.status, complaint]);
}
