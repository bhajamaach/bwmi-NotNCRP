import { NextRequest, NextResponse } from "next/server";
import { ready } from "@/lib/db.server";
import { loadComplaint, saveComplaint } from "@/lib/complaints.server";
import type { ThreadMessage } from "@/lib/types";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await ready();
  const { id } = await params;
  const complaint = await loadComplaint(id);
  if (!complaint) return NextResponse.json({ error: "Complaint not found" }, { status: 404 });

  const body = (await request.json()) as { from?: ThreadMessage["from"]; text?: string };
  const text = String(body.text ?? "").trim();
  if (!text) return NextResponse.json({ error: "Message text is required" }, { status: 400 });
  if (body.from !== "citizen" && body.from !== "cyberCell") {
    return NextResponse.json({ error: "from must be 'citizen' or 'cyberCell'" }, { status: 400 });
  }

  const message: ThreadMessage = {
    id: `msg-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    from: body.from,
    text,
    timestamp: new Date().toISOString()
  };
  complaint.messages = [...(complaint.messages ?? []), message];
  await saveComplaint(complaint);
  return NextResponse.json(complaint);
}
