import { Router } from "express";
import { pool } from "../db";
import { generateAckNumber, generateComplaintId } from "../lib/ids";
import { buildSlaDeadline } from "../lib/sla-config";
import type { Complaint, ComplaintDraft, ComplaintStatus } from "../lib/types";

export const complaintsRouter = Router();

// GET /api/complaints?userId=xyz -> that user's own complaints.
// GET /api/complaints (no userId) -> the admin view; anonymous complaints are
// excluded here at the source, not just filtered client-side, since the
// anonymity guarantee should hold even if a future client forgets to filter.
complaintsRouter.get("/", async (req, res) => {
  const userId = typeof req.query.userId === "string" ? req.query.userId : undefined;
  const result = userId
    ? await pool.query("SELECT data FROM complaints WHERE user_id = $1 ORDER BY created_at DESC", [userId])
    : await pool.query("SELECT data FROM complaints WHERE is_anonymous = false ORDER BY created_at DESC");
  res.json(result.rows.map((row) => row.data as Complaint));
});

complaintsRouter.post("/", async (req, res) => {
  const draft = req.body as ComplaintDraft & { requestedUserId?: string };
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

  res.status(201).json(complaint);
});

async function loadComplaint(id: string): Promise<Complaint | null> {
  const result = await pool.query("SELECT data FROM complaints WHERE id = $1", [id]);
  return result.rows[0]?.data ?? null;
}

async function saveComplaint(complaint: Complaint) {
  await pool.query("UPDATE complaints SET status = $2, data = $3 WHERE id = $1", [complaint.id, complaint.status, complaint]);
}

complaintsRouter.patch("/:id/status", async (req, res) => {
  const complaint = await loadComplaint(req.params.id);
  if (!complaint) return res.status(404).json({ error: "Complaint not found" });

  const status = req.body.status as ComplaintStatus;
  const note = String(req.body.note ?? "");
  complaint.status = status;
  complaint.statusHistory = [...complaint.statusHistory, { status, note, timestamp: new Date().toISOString() }];
  await saveComplaint(complaint);
  res.json(complaint);
});

complaintsRouter.post("/:id/escalate", async (req, res) => {
  const complaint = await loadComplaint(req.params.id);
  if (!complaint) return res.status(404).json({ error: "Complaint not found" });

  complaint.escalated = true;
  await saveComplaint(complaint);
  res.json(complaint);
});

complaintsRouter.post("/:id/notes", async (req, res) => {
  const complaint = await loadComplaint(req.params.id);
  if (!complaint) return res.status(404).json({ error: "Complaint not found" });

  const note = String(req.body.note ?? "").trim();
  if (!note) return res.status(400).json({ error: "Note text is required" });

  complaint.citizenNotes = [...(complaint.citizenNotes ?? []), { timestamp: new Date().toISOString(), note }];
  await saveComplaint(complaint);
  res.json(complaint);
});
