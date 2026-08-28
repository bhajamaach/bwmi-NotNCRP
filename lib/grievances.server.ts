import { pool } from "@/lib/db.server";
import type { GrievancePetition } from "@/lib/types";

export async function loadGrievance(id: string): Promise<GrievancePetition | null> {
  const result = await pool.query("SELECT data FROM grievances WHERE id = $1", [id]);
  return result.rows[0]?.data ?? null;
}

export async function saveGrievance(petition: GrievancePetition) {
  await pool.query("UPDATE grievances SET stage = $2, data = $3 WHERE id = $1", [petition.id, petition.stage, petition]);
}
