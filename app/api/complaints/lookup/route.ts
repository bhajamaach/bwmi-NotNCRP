import { NextRequest, NextResponse } from "next/server";
import { pool, ready } from "@/lib/db.server";
import type { Complaint } from "@/lib/types";

// Public, no-login lookup for anonymous reports only — this is the security
// boundary. It must never resolve a non-anonymous complaint's ack number, or
// it becomes a way to bypass /track's login requirement.
export async function GET(request: NextRequest) {
  await ready();
  const ackNumber = request.nextUrl.searchParams.get("ackNumber")?.trim();
  if (!ackNumber) return NextResponse.json({ error: "ackNumber is required" }, { status: 400 });

  const result = await pool.query<{ data: Complaint }>(
    "SELECT data FROM complaints WHERE is_anonymous = true AND ack_number ILIKE $1",
    [ackNumber]
  );
  if (result.rows.length === 0) {
    return NextResponse.json({ error: "No anonymous report found with that acknowledgement number" }, { status: 404 });
  }
  return NextResponse.json(result.rows[0].data);
}
