"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Icon } from "@/components/Icon";
import { useMockData } from "@/components/MockDataProvider";
import { CopyButton, PageSection, PrimaryLink, SecondaryLink } from "@/components/ui";

function ConfirmContent() {
  const params = useSearchParams();
  const { complaints } = useMockData();
  const id = params.get("id");
  const complaint = complaints.find((item) => item.id === id);

  return (
    <PageSection>
      <div className="animate-reveal mx-auto max-w-2xl border-2 border-line-bold rounded-card bg-white p-6 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-bg-subtle">
          <Icon className="h-8 w-8 animate-pop text-teal" name="check" />
        </span>
        <h1 className="mt-4 text-3xl font-bold text-ink">Complaint received</h1>
        <p className="mt-2 text-ink-muted">Your acknowledgement number is ready for tracking.</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-block border-2 border-line-bold rounded-input bg-bg-subtle px-6 py-5 font-mono text-3xl font-bold text-ink sm:text-4xl">
            {complaint?.ackNumber ?? "Acknowledgement unavailable"}
          </div>
          {complaint ? <CopyButton value={complaint.ackNumber} /> : null}
        </div>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          {complaint ? <PrimaryLink href={`/track/${complaint.id}`}>Open timeline</PrimaryLink> : null}
          <SecondaryLink href="/track">View dashboard</SecondaryLink>
        </div>
      </div>
    </PageSection>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense
      fallback={
        <PageSection>
          <div className="mx-auto h-72 max-w-2xl border border-line rounded-card bg-bg-subtle" />
        </PageSection>
      }
    >
      <ConfirmContent />
    </Suspense>
  );
}
