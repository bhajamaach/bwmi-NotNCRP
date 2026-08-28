import { NextRequest, NextResponse } from "next/server";
import { pool, ready } from "@/lib/db.server";
import { generateAckNumber, generateComplaintId } from "@/lib/ids";
import { buildSlaDeadline } from "@/lib/sla-config";
import type { Complaint, ComplaintDraft } from "@/lib/types";

// GET /api/complaints?userId=xyz -> that user's own complaints.
// GET /api/complaints (no userId) -> the admin view; anonymous complaints are
// excluded at the source, not just filtered client-side, so the anonymity
// guarantee holds even if a future client forgets to filter.
export async function GET(request: NextRequest) {
  await ready();
  const userId = request.nextUrl.searchParams.get("userId") ?? undefined;
  const result = userId
    ? await pool.query<{ data: Complaint }>("SELECT data FROM complaints WHERE user_id = $1 ORDER BY created_at DESC", [userId])
    : await pool.query<{ data: Complaint }>("SELECT data FROM complaints WHERE is_anonymous = false ORDER BY created_at DESC");
  return NextResponse.json(result.rows.map((row) => row.data));
}

export async function POST(request: NextRequest) {
  await ready();
  const draft = (await request.json()) as ComplaintDraft & { requestedUserId?: string };
  const createdAt = new Date();
  const userId = draft.isAnonymous ? "anonymous" : draft.requestedUserId ?? "user-demo-active";
  const isFinancialLien = draft.isUrgent && typeof draft.amount === "number" && draft.amount > 0;

  const complaint: Complaint = {
    id: generateComplaintId(),
    ackNumber: generateAckNumber(),
    userId,
    category: draft.category,
    subCategory: draft.subCategory,
    isUrgent: draft.isUrgent,
    description: draft.description,
    incidentAt: draft.incidentAt,
    amount: draft.amount,
    transactionId: draft.transactionId,
    evidence: draft.evidence,
    status: "RECEIVED",
    statusHistory: [
      {
        status: "RECEIVED",
        timestamp: createdAt.toISOString(),
        note: "Your complaint has been received and the acknowledgement number is active."
      }
    ],
    slaDeadline: buildSlaDeadline(draft.category, createdAt),
    escalated: false,
    createdAt: createdAt.toISOString(),
    lienAmount: isFinancialLien ? draft.amount : undefined,
    accountBalanceAtRisk: isFinancialLien ? (draft.amount as number) + Math.floor(20000 + Math.random() * 60000) : undefined,
    isAnonymous: draft.isAnonymous
  };

  await pool.query(
    `INSERT INTO complaints (id, user_id, ack_number, status, is_anonymous, created_at, data)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [complaint.id, complaint.userId, complaint.ackNumber, complaint.status, Boolean(complaint.isAnonymous), complaint.createdAt, complaint]
  );

  return NextResponse.json(complaint, { status: 201 });
}
