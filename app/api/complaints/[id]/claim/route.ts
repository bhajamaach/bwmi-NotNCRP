import { NextRequest, NextResponse } from "next/server";
import { pool, ready } from "@/lib/db.server";
import { loadComplaint } from "@/lib/complaints.server";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await ready();
  const { id } = await params;
  const complaint = await loadComplaint(id);
  if (!complaint) return NextResponse.json({ error: "Complaint not found" }, { status: 404 });

  const body = (await request.json()) as { mobile?: string; otp?: string };
  const mobile = String(body.mobile ?? "").trim();
  const otp = String(body.otp ?? "").trim();
  if (!/^\d{6}$/.test(otp)) return NextResponse.json({ error: "Enter any six-digit code." }, { status: 400 });

  const userResult = await pool.query<{ id: string }>("SELECT id FROM users WHERE mobile = $1", [mobile]);
  const user = userResult.rows[0];
  if (!user) return NextResponse.json({ error: "Enter one of the sample mobile numbers." }, { status: 404 });

  // isAnonymous stays true — it's a historical fact about how this was filed.
  // Only userId changes, which is what /track's visibility filter keys on.
  complaint.userId = user.id;
  await pool.query("UPDATE complaints SET user_id = $2, data = $3 WHERE id = $1", [complaint.id, user.id, complaint]);
  return NextResponse.json(complaint);
}
