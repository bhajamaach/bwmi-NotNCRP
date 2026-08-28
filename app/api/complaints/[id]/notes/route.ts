import { NextRequest, NextResponse } from "next/server";
import { ready } from "@/lib/db.server";
import { loadComplaint, saveComplaint } from "@/lib/complaints.server";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await ready();
  const { id } = await params;
  const complaint = await loadComplaint(id);
  if (!complaint) return NextResponse.json({ error: "Complaint not found" }, { status: 404 });

  const body = (await request.json()) as { note?: string };
  const note = String(body.note ?? "").trim();
  if (!note) return NextResponse.json({ error: "Note text is required" }, { status: 400 });

  complaint.citizenNotes = [...(complaint.citizenNotes ?? []), { timestamp: new Date().toISOString(), note }];
  await saveComplaint(complaint);
  return NextResponse.json(complaint);
}
