import { NextRequest, NextResponse } from "next/server";
import { pool, ready } from "@/lib/db.server";
import { generatePetitionNumber } from "@/lib/grievance";
import { generateGrievanceId } from "@/lib/ids";
import type { EvidenceFile, GrievancePetition } from "@/lib/types";

export async function GET(request: NextRequest) {
  await ready();
  const userId = request.nextUrl.searchParams.get("userId") ?? undefined;
  const result = userId
    ? await pool.query<{ data: GrievancePetition }>("SELECT data FROM grievances WHERE user_id = $1 ORDER BY created_at DESC", [userId])
    : await pool.query<{ data: GrievancePetition }>("SELECT data FROM grievances ORDER BY created_at DESC");
  return NextResponse.json(result.rows.map((row) => row.data));
}

export async function POST(request: NextRequest) {
  await ready();
  const body = (await request.json()) as { accountNumber: string; reason: string; evidence: EvidenceFile[]; requestedUserId?: string };
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

  return NextResponse.json(petition, { status: 201 });
}
