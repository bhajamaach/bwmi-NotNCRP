"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ComplaintThread } from "@/components/ComplaintThread";
import { Icon } from "@/components/Icon";
import { LienComparison } from "@/components/LienComparison";
import { useMockData } from "@/components/MockDataProvider";
import { StatusTimeline } from "@/components/StatusTimeline";
import { FieldChip, PageSection, PrimaryLink, SecondaryLink } from "@/components/ui";
import { formatDateTime, statusLabel } from "@/lib/status";
import type { ComplaintStatus } from "@/lib/types";

const nextStatus: Record<ComplaintStatus, ComplaintStatus> = {
  RECEIVED: "ASSIGNED",
  ASSIGNED: "BANK_NOTIFIED",
  BANK_NOTIFIED: "INVESTIGATING",
  INVESTIGATING: "RESOLVED",
  RESOLVED: "RESOLVED"
};

export default function AdminComplaintDetailPage() {
  const params = useParams<{ id: string }>();
  const { complaints, updateStatus, sendMessage } = useMockData();
  const complaint = complaints.find((item) => item.id === params.id);
  const [confirmed, setConfirmed] = useState(false);

  if (!complaint) {
    return (
      <PageSection>
        <div className="border-2 border-line-bold rounded-card bg-white p-6">
          <h1 className="text-2xl font-bold text-ink">Complaint not found</h1>
          <div className="mt-5">
            <PrimaryLink href="/admin">Return to dashboard</PrimaryLink>
          </div>
        </div>
      </PageSection>
    );
  }

  const target = nextStatus[complaint.status];

  return (
    <PageSection>
      <SecondaryLink className="!px-3 !py-2" href="/admin">
        Back to dashboard
      </SecondaryLink>
      <div className="animate-reveal mt-4 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <section className="border-2 border-line-bold rounded-card bg-white p-5">
          <div className="flex flex-wrap items-center gap-2">
            <FieldChip>{complaint.ackNumber}</FieldChip>
            {complaint.isAnonymous ? (
              <span className="rounded-input border border-line-strong bg-bg-subtle px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                Anonymous report — no filer identity attached
              </span>
            ) : null}
          </div>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-ink">{complaint.category}</h1>
          <p className="mt-2 text-ink-muted">
            {complaint.subCategory} · Current status: {statusLabel(complaint.status)}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 border border-line rounded-control bg-bg-subtle p-4">
            <button
              className="focus-ring rounded-control border border-line bg-white px-4 py-2 text-sm font-semibold text-navy transition-all duration-150 hover:bg-bg-subtle active:scale-95 disabled:opacity-50"
              disabled={complaint.status === "RESOLVED"}
              onClick={() => {
                updateStatus(complaint.id, target, `The cyber cell updated the status to ${statusLabel(target)}.`).catch(() => {});
                setConfirmed(true);
                window.setTimeout(() => setConfirmed(false), 1500);
              }}
              type="button"
            >
              {complaint.status === "RESOLVED" ? "Done" : `Advance to ${statusLabel(target)}`}
            </button>
            {confirmed ? (
              <span className="flex items-center gap-1 text-sm font-medium text-teal">
                <Icon className="h-3.5 w-3.5 animate-pop" name="check" />
                Status updated.
              </span>
            ) : null}
          </div>

          <div className="mt-6">
            <StatusTimeline complaint={complaint} />
          </div>
        </section>
        <aside className="grid gap-4">
          <ComplaintThread
            complaint={complaint}
            onSend={(text) => sendMessage(complaint.id, "cyberCell", text)}
            role="cyberCell"
          />
          <LienComparison complaint={complaint} />
          <div className="border-2 border-line-bold rounded-card bg-white p-5">
            <h2 className="font-bold text-ink">Complaint summary</h2>
            <dl className="mt-4 grid gap-3 text-sm">
              <div>
                <dt className="font-semibold text-ink">Incident time</dt>
                <dd className="font-mono text-ink-muted">{formatDateTime(complaint.incidentAt)}</dd>
              </div>
              {complaint.amount ? (
                <div>
                  <dt className="font-semibold text-ink">Amount</dt>
                  <dd className="font-mono text-ink-muted">Rs. {complaint.amount.toLocaleString("en-IN")}</dd>
                </div>
              ) : null}
              {complaint.transactionId ? (
                <div>
                  <dt className="font-semibold text-ink">Transaction ID / UTR</dt>
                  <dd className="break-all font-mono text-ink-muted">{complaint.transactionId}</dd>
                </div>
              ) : null}
            </dl>
            <p className="mt-4 text-ink-muted">{complaint.description}</p>
            {complaint.evidence?.length ? (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-ink">Evidence selected</h3>
                <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
                  {complaint.evidence.map((file) => (
                    <li className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5" key={`${file.name}-${file.size}`}>
                      <span className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-navy" name="file" />
                        {file.name}
                      </span>
                      {file.hash ? (
                        <span className="font-mono text-xs text-teal" title={`SHA-256: ${file.hash}`}>
                          SHA-256 {file.hash.slice(0, 12)}&hellip;
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    </PageSection>
  );
}
