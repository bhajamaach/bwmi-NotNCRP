import { Router } from "express";
import { pool } from "../db";
import { generateGrievanceId } from "../lib/ids";
import { nextGrievanceStage } from "../lib/grievance";
import type { EvidenceFile, GrievancePetition, GrievanceStage } from "../lib/types";

export const grievancesRouter = Router();

function generatePetitionNumber() {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replaceAll("-", "");
  const random = Math.floor(10000 + Math.random() * 90000);
  return `GRM-${datePart}-${random}`;
}

grievancesRouter.get("/", async (req, res) => {
  const userId = typeof req.query.userId === "string" ? req.query.userId : undefined;
  const result = userId
    ? await pool.query("SELECT data FROM grievances WHERE user_id = $1 ORDER BY created_at DESC", [userId])
    : await pool.query("SELECT data FROM grievances ORDER BY created_at DESC");
  res.json(result.rows.map((row) => row.data as GrievancePetition));
});

grievancesRouter.post("/", async (req, res) => {
  const body = req.body as { accountNumber: string; reason: string; evidence: EvidenceFile[]; requestedUserId?: string };
  const createdAt = new Date();
  const userId = body.requestedUserId ?? "user-demo-active";

  const petition: GrievancePetition = {
    id: generateGrievanceId(),
    petitionNumber: generatePetitionNumber(),
    userId,
    accountNumber: body.accountNumber,
    reason: body.reason,
    evidence: body.evidence ?? [],
    stage: "SUBMITTED",
    createdAt: createdAt.toISOString(),
    stageHistory: [
      { stage: "SUBMITTED", timestamp: createdAt.toISOString(), note: "Petition submitted with proof of legitimacy." }
    ]
  };

  await pool.query(
    `INSERT INTO grievances (id, user_id, petition_number, stage, created_at, data)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [petition.id, petition.userId, petition.petitionNumber, petition.stage, petition.createdAt, petition]
  );

  res.status(201).json(petition);
});

async function loadGrievance(id: string): Promise<GrievancePetition | null> {
  const result = await pool.query("SELECT data FROM grievances WHERE id = $1", [id]);
  return result.rows[0]?.data ?? null;
}

async function saveGrievance(petition: GrievancePetition) {
  await pool.query("UPDATE grievances SET stage = $2, data = $3 WHERE id = $1", [petition.id, petition.stage, petition]);
}

grievancesRouter.post("/:id/kyc-slot", async (req, res) => {
  const petition = await loadGrievance(req.params.id);
  if (!petition) return res.status(404).json({ error: "Petition not found" });

  const slot = String(req.body.slot ?? "");
  petition.kycSlot = slot;
  petition.stage = "KYC_SCHEDULED";
  petition.stageHistory = [
    ...petition.stageHistory,
    { stage: "KYC_SCHEDULED", timestamp: new Date().toISOString(), note: `Video-KYC slot booked for ${slot}.` }
  ];
  await saveGrievance(petition);
  res.json(petition);
});

grievancesRouter.post("/:id/advance", async (req, res) => {
  const petition = await loadGrievance(req.params.id);
  if (!petition) return res.status(404).json({ error: "Petition not found" });

  const note = String(req.body.note ?? "");
  const stage: GrievanceStage = nextGrievanceStage[petition.stage];
  petition.stage = stage;
  petition.stageHistory = [...petition.stageHistory, { stage, timestamp: new Date().toISOString(), note }];
  await saveGrievance(petition);
  res.json(petition);
});

