import { NextRequest, NextResponse } from "next/server";
import { ready } from "@/lib/db.server";
import { nextGrievanceStage } from "@/lib/grievance";
import { loadGrievance, saveGrievance } from "@/lib/grievances.server";
import type { GrievanceStage } from "@/lib/types";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await ready();
  const { id } = await params;
  const petition = await loadGrievance(id);
  if (!petition) return NextResponse.json({ error: "Petition not found" }, { status: 404 });

  const body = (await request.json()) as { note?: string };
  const stage: GrievanceStage = nextGrievanceStage[petition.stage];
  petition.stage = stage;
  petition.stageHistory = [...petition.stageHistory, { stage, timestamp: new Date().toISOString(), note: body.note ?? "" }];
  await saveGrievance(petition);
  return NextResponse.json(petition);
}
