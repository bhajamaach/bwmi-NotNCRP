import { NextResponse } from "next/server";
import { pool, ready } from "@/lib/db.server";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  await ready();
  const { id } = await params;
  const result = await pool.query<{ data: Buffer; type: string; name: string }>(
    "SELECT data, type, name FROM evidence WHERE id = $1",
    [id]
  );
  const row = result.rows[0];
  if (!row) return NextResponse.json({ error: "Evidence not found" }, { status: 404 });

  return new NextResponse(new Uint8Array(row.data), {
    headers: {
      "Content-Type": row.type,
      "Content-Disposition": `inline; filename="${encodeURIComponent(row.name)}"`,
      "Cache-Control": "private, max-age=31536000, immutable"
    }
  });
}
