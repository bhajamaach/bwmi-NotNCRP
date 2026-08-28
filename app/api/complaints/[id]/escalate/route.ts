import { NextResponse } from "next/server";
import { ready } from "@/lib/db.server";
import { loadComplaint, saveComplaint } from "@/lib/complaints.server";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  await ready();
  const { id } = await params;
  const complaint = await loadComplaint(id);
  if (!complaint) return NextResponse.json({ error: "Complaint not found" }, { status: 404 });

  complaint.escalated = true;
  await saveComplaint(complaint);
  return NextResponse.json(complaint);
}
