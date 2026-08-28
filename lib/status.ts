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

/**
 * The single definition of "escalated" for the whole app — a complaint is
 * escalated either because the citizen explicitly escalated it, or because
 * it has silently blown its SLA. Every screen that shows an Escalated
 * count/filter/badge should use this instead of re-deriving it.
 */
export function isEscalated(complaint: Complaint) {
  return complaint.escalated || isSlaExceeded(complaint);
}

export function formatDurationShort(ms: number) {
  const totalMinutes = Math.max(0, Math.round(Math.abs(ms) / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
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
