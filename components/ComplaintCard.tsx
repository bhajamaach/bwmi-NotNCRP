import Link from "next/link";
import { Icon } from "@/components/Icon";
import { FieldChip } from "@/components/ui";
import { formatDateTime, isSlaExceeded, statusLabel } from "@/lib/status";
import type { Complaint } from "@/lib/types";

export function ComplaintCard({ complaint }: { complaint: Complaint }) {
  const exceeded = isSlaExceeded(complaint);
  const resolved = complaint.status === "RESOLVED";

  const accentClass = exceeded ? "border-l-amber" : resolved ? "border-l-teal" : "border-l-navy";
  const statusTextClass = exceeded ? "text-amber" : resolved ? "text-teal" : "text-navy";

  return (
    <Link
      className={`focus-ring block border border-line border-l-4 ${accentClass} rounded-card bg-white p-5 hover:border-navy`}
      href={`/track/${complaint.id}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <FieldChip>{complaint.ackNumber}</FieldChip>
          <h2 className="mt-2 text-lg font-semibold leading-tight text-ink">{complaint.category}</h2>
          <p className="mt-1 text-sm text-ink-muted">
            {complaint.subCategory} · Filed <span className="font-mono">{formatDateTime(complaint.createdAt)}</span>
          </p>
        </div>
        <span className={`inline-flex w-fit items-center gap-2 text-sm font-semibold ${statusTextClass}`}>
          <Icon className="h-4 w-4" name={exceeded ? "alert" : "clock"} />
          {exceeded ? "Escalation available" : statusLabel(complaint.status)}
        </span>
      </div>
      <p className="mt-4 line-clamp-2 text-sm text-ink-muted">{complaint.description}</p>
    </Link>
  );
}
