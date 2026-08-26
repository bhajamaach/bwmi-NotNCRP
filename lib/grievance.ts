import type { GrievancePetition, GrievanceStage } from "@/lib/types";

export const grievanceStages: { stage: GrievanceStage; label: string; description: string; emptyNote: string }[] = [
  {
    stage: "SUBMITTED",
    label: "Petition submitted",
    description: "Your proof of legitimacy has been logged against the frozen account.",
    emptyNote: "Petition acknowledgement created"
  },
  {
    stage: "KYC_SCHEDULED",
    label: "Video-KYC scheduled",
    description: "A remote verification slot is booked with an investigating officer.",
    emptyNote: "Book a slot below"
  },
  {
    stage: "IO_REVIEW",
    label: "Investigating officer review",
    description: "The officer is reviewing your evidence and the video-KYC session.",
    emptyNote: "Awaiting officer review"
  },
  {
    stage: "NOC_ISSUED",
    label: "NOC issued",
    description: "A digitally signed No Objection Certificate has been sent to your bank; the lien is released.",
    emptyNote: "Released once the officer approves"
  }
];

export function grievanceStageLabel(stage: GrievanceStage) {
  return grievanceStages.find((item) => item.stage === stage)?.label ?? stage;
}

export function generatePetitionNumber() {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replaceAll("-", "");
  const random = Math.floor(10000 + Math.random() * 90000);
  return `GRM-${datePart}-${random}`;
}

export const nextGrievanceStage: Record<GrievanceStage, GrievanceStage> = {
  SUBMITTED: "KYC_SCHEDULED",
  KYC_SCHEDULED: "IO_REVIEW",
  IO_REVIEW: "NOC_ISSUED",
  NOC_ISSUED: "NOC_ISSUED"
};

export const kycSlots = ["Tomorrow, 10:30 AM", "Tomorrow, 3:00 PM", "Thu, 11:00 AM", "Thu, 4:30 PM"];

export function isNocIssued(petition: GrievancePetition) {
  return petition.stage === "NOC_ISSUED";
}
