"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { EscalationPrompt } from "@/components/EscalationPrompt";
import { FundRestorationCard } from "@/components/FundRestorationCard";
import { Icon } from "@/components/Icon";
import { LienComparison } from "@/components/LienComparison";
import { useMockData } from "@/components/MockDataProvider";
import { StatusTimeline } from "@/components/StatusTimeline";
import { Button, CopyButton, FieldChip, PageSection, PrimaryLink, SecondaryLink } from "@/components/ui";
import { getSlaForCategory } from "@/lib/sla-config";
import { formatDateTime, statusLabel } from "@/lib/status";

function ComplaintDetailContent() {
  const params = useSearchParams();
  const { complaints, addCitizenNote } = useMockData();
  const complaint = complaints.find((item) => item.id === params.get("id"));
  const [noteText, setNoteText] = useState("");
  const [noteConfirmed, setNoteConfirmed] = useState(false);

  if (!complaint) {
    return (
      <PageSection>
        <div className="border border-line rounded-card bg-white p-6">
          <h1 className="text-2xl font-bold text-ink">Complaint not found</h1>
          <p className="mt-2 text-ink-muted">
            This can happen if your browser data was cleared, or the acknowledgement link is from a different browser or device.
          </p>
          <div className="mt-5">
            <PrimaryLink href="/track">Return to dashboard</PrimaryLink>
          </div>
        </div>
      </PageSection>
    );
  }

  const sla = getSlaForCategory(complaint.category);
  const notes = [...(complaint.citizenNotes ?? [])].reverse();
  const firDrafted = complaint.status !== "RECEIVED" && (complaint.amount ?? 0) > 50000;

  function handleAddNote() {
    const trimmed = noteText.trim();
    if (!trimmed) return;
    addCitizenNote(complaint!.id, trimmed);
    setNoteText("");
    setNoteConfirmed(true);
    window.setTimeout(() => setNoteConfirmed(false), 2000);
  }

  return (
    <PageSection>
      <SecondaryLink className="!px-3 !py-2" href="/track">
        Back to dashboard
      </SecondaryLink>
      <div className="mt-4 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <section className="border border-line rounded-card bg-white p-5">
          <div className="flex flex-wrap items-center gap-2">
            <FieldChip>{complaint.ackNumber}</FieldChip>
            <CopyButton value={complaint.ackNumber} />
            {complaint.isAnonymous ? (
              <span className="rounded-input border border-line bg-bg-subtle px-2.5 py-1 text-xs font-semibold text-ink-muted">
                Anonymous report
              </span>
            ) : null}
          </div>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-ink">{complaint.category}</h1>
          <p className="mt-2 text-ink-muted">{complaint.subCategory} · Current status: {statusLabel(complaint.status)}</p>
          <div className="mt-5 border border-line rounded-control bg-bg-subtle p-4">
            <p className="text-sm font-semibold text-ink">{sla.label}</p>
            <p className="mt-1 text-sm text-ink-muted">
              Deadline: <span className="font-mono">{formatDateTime(complaint.slaDeadline)}</span>. Expected turnaround for this category, not a guarantee.
            </p>
          </div>
          {firDrafted ? (
            <div className="mt-3 flex items-start gap-3 border border-line border-l-4 border-l-navy rounded-control bg-bg-subtle p-4">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-navy" name="id" />
              <p className="text-sm text-ink">
                <span className="font-semibold">Draft FIR auto-generated</span> under IT Act §66C/66D and BNS §318, pending the
                investigating officer&rsquo;s signature.
              </p>
            </div>
          ) : null}
          <div className="mt-6">
            <StatusTimeline complaint={complaint} />
          </div>
        </section>
        <aside className="grid gap-4">
          <EscalationPrompt complaint={complaint} />
          <FundRestorationCard complaint={complaint} />
          <LienComparison complaint={complaint} />
          <div className="border border-line rounded-card bg-white p-5">
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
          <div className="border border-line rounded-card bg-white p-5">
            <h2 className="font-bold text-ink">Add your own update</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Add notes for your own record, such as follow-up calls or new information. This is for your reference only and doesn't notify the cyber cell.
            </p>
            <textarea
              className="focus-ring mt-3 min-h-24 w-full rounded-input border border-line bg-white px-3 py-3 text-ink"
              onChange={(event) => setNoteText(event.target.value)}
              placeholder="Example: Called the bank again, they asked for an FIR copy."
              value={noteText}
            />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Button onClick={handleAddNote} type="button">
                Add update
              </Button>
              {noteConfirmed ? <span className="text-sm font-medium text-teal">Update added.</span> : null}
            </div>
            {notes.length > 0 ? (
              <ul className="mt-4 space-y-3 border-t border-line pt-4">
                {notes.map((note, index) => (
                  <li key={`${note.timestamp}-${index}`}>
                    <p className="font-mono text-xs text-ink-muted">{formatDateTime(note.timestamp)}</p>
                    <p className="mt-1 text-sm text-ink">{note.note}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </aside>
      </div>
    </PageSection>
  );
}

export default function ComplaintDetailPage() {
  return (
    <Suspense
      fallback={
        <PageSection>
          <div className="h-72 border border-line rounded-card bg-bg-subtle" />
        </PageSection>
      }
    >
      <ComplaintDetailContent />
    </Suspense>
  );
}
