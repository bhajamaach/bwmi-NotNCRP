import { NextRequest, NextResponse } from "next/server";
import { ready } from "@/lib/db.server";
import { loadGrievance, saveGrievance } from "@/lib/grievances.server";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await ready();
  const { id } = await params;
  const petition = await loadGrievance(id);
  if (!petition) return NextResponse.json({ error: "Petition not found" }, { status: 404 });

  const body = (await request.json()) as { slot?: string };
  const slot = String(body.slot ?? "");
  petition.kycSlot = slot;
  petition.stage = "KYC_SCHEDULED";
  petition.stageHistory = [
    ...petition.stageHistory,
    { stage: "KYC_SCHEDULED", timestamp: new Date().toISOString(), note: `Video-KYC slot booked for ${slot}.` }
  ];
  await saveGrievance(petition);
  return NextResponse.json(petition);
}
