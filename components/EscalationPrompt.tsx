"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { useMockData } from "@/components/MockDataProvider";
import { buttonPrimaryClass } from "@/components/ui";
import { formatDurationShort, isSlaExceeded } from "@/lib/status";
import type { Complaint } from "@/lib/types";

// Ticks the SLA countdown/overdue duration once a minute rather than
// re-rendering the whole app on a fast interval — the number needs to
// visibly move across a demo, not update in real time to the second.
function useNow(intervalMs: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return now;
}

export function EscalationPrompt({ complaint }: { complaint: Complaint }) {
  const { markEscalated } = useMockData();
  const [confirmed, setConfirmed] = useState(false);
  const now = useNow(30_000);
  const shouldShow = isSlaExceeded(complaint);
  const remainingMs = new Date(complaint.slaDeadline).getTime() - now;

  if (!shouldShow) {
    return (
      <div className="border-2 border-line-bold rounded-card bg-white p-5">
        <h2 className="flex items-center gap-2 font-bold text-ink">
          <span aria-hidden className="h-2 w-2 shrink-0 animate-pulse-ring rounded-full bg-navy" />
          SLA status
        </h2>
        <p className="mt-1 text-ink-muted">
          Still within its SLA window &mdash; <span className="font-mono font-semibold text-ink">{formatDurationShort(remainingMs)}</span> remaining.
        </p>
      </div>
    );
  }

  return (
    <div className="border-2 border-line-bold border-l-4 border-l-amber rounded-card bg-white p-5">
      <div className="flex gap-3">
        <Icon className="mt-1 h-5 w-5 shrink-0 text-amber" name="alert" />
        <div>
          <h2 className="flex items-center gap-2 font-bold text-amber">
            <span aria-hidden className="h-2 w-2 shrink-0 animate-pulse-ring rounded-full bg-amber" />
            Escalation available
          </h2>
          <p className="mt-1 text-ink">
            SLA window passed <span className="font-mono font-semibold">{formatDurationShort(remainingMs)}</span> ago without enough visible progress. You can escalate it to the district cyber cell head.
          </p>
          <button
            className={`${buttonPrimaryClass} mt-4 disabled:active:translate-y-0`}
            disabled={complaint.escalated}
            onClick={() => {
              markEscalated(complaint.id).catch(() => {});
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
