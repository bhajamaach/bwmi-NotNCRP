import type { Complaint, ComplaintStatus } from "@/lib/types";

export const statusSteps: { status: ComplaintStatus; label: string; description: string; emptyNote: string }[] = [
  {
    status: "RECEIVED",
    label: "Received",
    description: "Your complaint is logged and an acknowledgement number is issued.",
    emptyNote: "Complaint acknowledgement created"
  },
  {
    status: "ASSIGNED",
    label: "Assigned to Cyber Cell",
    description: "The complaint is routed to a cyber cell officer for review.",
    emptyNote: "Awaiting assignment"
  },
  {
    status: "BANK_NOTIFIED",
    label: "Bank / PSP Notified",
    description: "Relevant banks or payment providers are alerted where applicable.",
    emptyNote: "Applies when financial channels need alerting"
  },
  {
    status: "INVESTIGATING",
    label: "Under Investigation",
    description: "The assigned officer is reviewing evidence and following up.",
    emptyNote: "Review and follow-up in progress"
  },
  {
    status: "RESOLVED",
    label: "Resolved",
    description: "The complaint has reached a resolution or final update.",
    emptyNote: "Resolution update pending"
  }
];

export function isSlaExceeded(complaint: Complaint) {
  return complaint.status !== "RESOLVED" && new Date(complaint.slaDeadline).getTime() < Date.now();
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export function statusLabel(status: ComplaintStatus) {
  return statusSteps.find((step) => step.status === status)?.label ?? status;
}
