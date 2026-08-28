import { pool } from "@/lib/db.server";
import type { EvidenceFile } from "@/lib/types";

/**
 * Takes draft evidence (each item carrying a `dataUrl` with the actual file
 * content, from the browser) and moves the bytes into the `evidence` table,
 * returning lightweight metadata only — this is what actually gets stored in
 * a complaint/grievance's JSONB `data` column, so that column stays small
 * regardless of how many/how large the attached files are.
 */
export async function persistEvidence(
  ownerType: "complaint" | "grievance",
  ownerId: string,
  files: EvidenceFile[]
): Promise<EvidenceFile[]> {
  const stored: EvidenceFile[] = [];
  for (const file of files) {
    const id = `ev-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    if (file.dataUrl) {
      const base64 = file.dataUrl.split(",")[1] ?? "";
      const buffer = Buffer.from(base64, "base64");
      await pool.query(
        `INSERT INTO evidence (id, owner_type, owner_id, name, size, type, hash, hashed_at, data)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [id, ownerType, ownerId, file.name, file.size, file.type, file.hash ?? null, file.hashedAt ?? null, buffer]
      );
    }
    stored.push({ id, name: file.name, size: file.size, type: file.type, hash: file.hash, hashedAt: file.hashedAt });
  }
  return stored;
}
