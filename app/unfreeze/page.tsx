"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { EvidenceUpload } from "@/components/EvidenceUpload";
import { Icon } from "@/components/Icon";
import { useLocale } from "@/components/LocaleProvider";
import { useMockData } from "@/components/MockDataProvider";
import { FieldError, PageSection, RequiredMark, buttonPrimaryClass } from "@/components/ui";
import type { EvidenceFile } from "@/lib/types";

export default function UnfreezePage() {
  const router = useRouter();
  const { t } = useLocale();
  const { createGrievance } = useMockData();
  const [accountNumber, setAccountNumber] = useState("");
  const [reason, setReason] = useState("");
  const [evidence, setEvidence] = useState<EvidenceFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

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
      <div className="animate-reveal mx-auto max-w-2xl">
        <p className="font-mono text-sm font-semibold text-navy">{t("Self-service grievance")}</p>
        <h1 className="mt-1 text-3xl font-bold text-ink sm:text-4xl">{t("Unfreeze my account")}</h1>
        <p className="mt-2 text-ink-muted">
          {t(
            "If your account was frozen because it received funds later flagged as part of someone else’s fraud case, petition here instead of visiting a bank branch. You’ll book a remote video-KYC slot yourself once this is submitted."
          )}
        </p>
      </div>
      <form
        className="animate-reveal mx-auto mt-6 max-w-2xl border-2 border-line-bold rounded-card bg-white p-5"
        style={{ animationDelay: "70ms" }}
        noValidate
        onSubmit={async (event) => {
          event.preventDefault();
          setSubmitError("");
          if (!isValid || isSubmitting) return;
          setIsSubmitting(true);
          try {
            const petition = await createGrievance({ accountNumber: accountNumber.trim(), reason: reason.trim(), evidence });
            router.push(`/unfreeze/${petition.id}`);
          } catch {
            setSubmitError("We couldn't reach the tracking service. Please check your connection and try again.");
            setIsSubmitting(false);
          }
        }}
      >
        <div className="grid gap-5">
          <div>
            <label className="block text-sm font-semibold text-ink" htmlFor="accountNumber">
              {t("Frozen account number")}<RequiredMark />
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
              {t("Why should this account be released?")}<RequiredMark />
            </label>
            <textarea
              className="focus-ring mt-2 min-h-28 w-full rounded-input border border-line bg-white px-3 py-3 text-ink"
              id="reason"
              onChange={(event) => setReason(event.target.value)}
              placeholder={t("Example: I received this payment for a legitimate sale on a marketplace and had no involvement in the fraud complaint.")}
              value={reason}
            />
            <div className="mt-1 flex justify-between gap-3 text-sm text-ink-muted">
              <span>{t("Minimum 30 characters.")}</span>
              <span className={`font-mono transition-colors duration-200 ${reason.trim().length >= 30 ? "text-teal" : ""}`}>
                {reason.trim().length}/30
              </span>
            </div>
            <FieldError id="reason-error">{errors.reason}</FieldError>
          </div>
          <div>
            <EvidenceUpload files={evidence} onChange={setEvidence} />
            <FieldError id="evidence-error">{errors.evidence}</FieldError>
          </div>
          <FieldError id="submit-error">{submitError}</FieldError>
          <button className={buttonPrimaryClass} disabled={!isValid || isSubmitting} type="submit">
            <Icon className="h-4 w-4" name="unlock" />
            {isSubmitting ? t("Submitting...") : t("Submit petition")}
          </button>
        </div>
      </form>
    </PageSection>
  );
}
