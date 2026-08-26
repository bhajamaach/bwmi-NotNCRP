"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { useMockData } from "@/components/MockDataProvider";
import { buttonPrimaryClass } from "@/components/ui";
import { formatDateTime, isSlaExceeded } from "@/lib/status";
import type { Complaint } from "@/lib/types";

export function EscalationPrompt({ complaint }: { complaint: Complaint }) {
  const { markEscalated } = useMockData();
  const [confirmed, setConfirmed] = useState(false);
  const shouldShow = isSlaExceeded(complaint);

  if (!shouldShow) {
    return (
      <div className="border border-line rounded-card bg-white p-5">
        <h2 className="font-bold text-ink">SLA status</h2>
        <p className="mt-1 text-ink-muted">
          This complaint is still within its SLA window, ending <span className="font-mono">{formatDateTime(complaint.slaDeadline)}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-line border-l-4 border-l-amber rounded-card bg-white p-5">
      <div className="flex gap-3">
        <Icon className="mt-1 h-5 w-5 shrink-0 text-amber" name="alert" />
        <div>
          <h2 className="font-bold text-amber">Escalation available</h2>
          <p className="mt-1 text-ink">
            This complaint has passed its SLA window without enough visible progress. You can escalate it to the district cyber cell head.
          </p>
          <button
            className={`${buttonPrimaryClass} mt-4 disabled:active:translate-y-0`}
            disabled={complaint.escalated}
            onClick={() => {
              markEscalated(complaint.id);
              setConfirmed(true);
              window.setTimeout(() => setConfirmed(false), 1500);
            }}
            type="button"
          >
            {complaint.escalated ? "Escalation requested" : "Escalate to nodal officer"}
          </button>
          {confirmed ? <p className="mt-2 text-sm font-medium text-teal">Escalation requested.</p> : null}
        </div>
      </div>
    </div>
  );
}
