import { NextRequest, NextResponse } from "next/server";
import { ready } from "@/lib/db.server";
import { loadComplaint, saveComplaint } from "@/lib/complaints.server";
import type { ComplaintStatus } from "@/lib/types";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await ready();
  const { id } = await params;
  const complaint = await loadComplaint(id);
  if (!complaint) return NextResponse.json({ error: "Complaint not found" }, { status: 404 });

  const body = (await request.json()) as { status: ComplaintStatus; note: string };
  complaint.status = body.status;
  complaint.statusHistory = [...complaint.statusHistory, { status: body.status, note: body.note ?? "", timestamp: new Date().toISOString() }];
  await saveComplaint(complaint);
  return NextResponse.json(complaint);
}
