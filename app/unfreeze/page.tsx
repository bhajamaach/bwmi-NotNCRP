"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { EvidenceUpload } from "@/components/EvidenceUpload";
import { Icon } from "@/components/Icon";
import { useMockData } from "@/components/MockDataProvider";
import { FieldError, PageSection, RequiredMark, buttonPrimaryClass } from "@/components/ui";
import type { EvidenceFile } from "@/lib/types";

export default function UnfreezePage() {
  const router = useRouter();
  const { createGrievance } = useMockData();
  const [accountNumber, setAccountNumber] = useState("");
  const [reason, setReason] = useState("");
  const [evidence, setEvidence] = useState<EvidenceFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const errors = useMemo(() => {
    const next: Record<string, string> = {};
    if (!/^\d{4,18}$/.test(accountNumber.trim())) next.accountNumber = "Enter the frozen account number (digits only).";
    if (reason.trim().length < 30) next.reason = "Add at least 30 characters explaining why this account should be released.";
    if (evidence.length === 0) next.evidence = "Attach at least one proof of legitimacy, such as an invoice or order confirmation.";
    return next;
  }, [accountNumber, reason, evidence]);

  const isValid = Object.keys(errors).length === 0;

  return (
    <PageSection>
      <div>
        <p className="font-mono text-sm font-semibold text-navy">Self-service grievance</p>
        <h1 className="mt-1 text-3xl font-bold text-ink sm:text-4xl">Unfreeze my account</h1>
        <p className="mt-2 max-w-2xl text-ink-muted">
          If your account was frozen because it received funds later flagged as part of someone else&rsquo;s fraud case, petition here
          instead of visiting a bank branch. You&rsquo;ll book a remote video-KYC slot yourself once this is submitted.
        </p>
      </div>
      <form
        className="mt-6 max-w-2xl border border-line rounded-card bg-white p-5"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (!isValid || isSubmitting) return;
          setIsSubmitting(true);
          window.setTimeout(() => {
            const petition = createGrievance({ accountNumber: accountNumber.trim(), reason: reason.trim(), evidence });
            router.push(`/unfreeze/${petition.id}`);
          }, 500);
        }}
      >
        <div className="grid gap-5">
          <div>
            <label className="block text-sm font-semibold text-ink" htmlFor="accountNumber">
              Frozen account number<RequiredMark />
            </label>
            <input
              className="focus-ring mt-2 w-full rounded-input border border-line bg-white px-3 py-3 font-mono text-ink"
              id="accountNumber"
              inputMode="numeric"
              onChange={(event) => setAccountNumber(event.target.value)}
              placeholder="e.g. 000104214821"
              value={accountNumber}
            />
            <FieldError id="accountNumber-error">{errors.accountNumber}</FieldError>
          </div>
          <div>
            <label className="block text-sm font-semibold text-ink" htmlFor="reason">
              Why should this account be released?<RequiredMark />
            </label>
            <textarea
              className="focus-ring mt-2 min-h-28 w-full rounded-input border border-line bg-white px-3 py-3 text-ink"
              id="reason"
              onChange={(event) => setReason(event.target.value)}
              placeholder="Example: I received this payment for a legitimate sale on a marketplace and had no involvement in the fraud complaint."
              value={reason}
            />
            <div className="mt-1 flex justify-between gap-3 text-sm text-ink-muted">
              <span>Minimum 30 characters.</span>
              <span className="font-mono">{reason.trim().length}/30</span>
            </div>
            <FieldError id="reason-error">{errors.reason}</FieldError>
          </div>
          <div>
            <EvidenceUpload files={evidence} onChange={setEvidence} />
            <FieldError id="evidence-error">{errors.evidence}</FieldError>
          </div>
          <button className={buttonPrimaryClass} disabled={!isValid || isSubmitting} type="submit">
            <Icon className="h-4 w-4" name="unlock" />
            {isSubmitting ? "Submitting..." : "Submit petition"}
          </button>
        </div>
      </form>
    </PageSection>
  );
}
