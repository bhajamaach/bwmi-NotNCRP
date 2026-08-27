"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { EvidenceUpload } from "@/components/EvidenceUpload";
import { useLocale } from "@/components/LocaleProvider";
import { useMockData } from "@/components/MockDataProvider";
import { FieldError, RequiredMark, buttonPrimaryClass } from "@/components/ui";
import type { EvidenceFile } from "@/lib/types";

const urgentSubCategories = [
  "UPI fraud",
  "Card fraud",
  "Investment scam",
  "Bank impersonation / phishing",
  "Other"
];

export function ComplaintForm({
  category,
  subCategory,
  isUrgent,
  transactionId,
  onTransactionIdChange,
  otherCategory,
  isAnonymous
}: {
  category: string;
  subCategory?: string;
  isUrgent: boolean;
  transactionId?: string;
  onTransactionIdChange?: (value: string) => void;
  otherCategory?: string;
  isAnonymous?: boolean;
}) {
  const router = useRouter();
  const { t } = useLocale();
  const { createComplaint } = useMockData();
  const [selectedSubCategory, setSelectedSubCategory] = useState(subCategory ?? urgentSubCategories[0]);
  const [amount, setAmount] = useState("");
  const [internalTransactionId, setInternalTransactionId] = useState(transactionId ?? "");
  const [incidentAt, setIncidentAt] = useState("");
  const [description, setDescription] = useState("");
  const [evidence, setEvidence] = useState<EvidenceFile[]>([]);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const effectiveCategory = otherCategory?.trim() || category;
  const effectiveTransactionId = transactionId ?? internalTransactionId;
  const setTransactionId = (value: string) => {
    if (onTransactionIdChange) onTransactionIdChange(value);
    setInternalTransactionId(value);
  };

  const errors = useMemo(() => {
    const next: Record<string, string> = {};
    if (!effectiveCategory.trim()) next.category = "Enter a category so the complaint has a valid path forward.";
    if (!selectedSubCategory.trim()) next.subCategory = "Select a subcategory.";
    if (isUrgent) {
      if (!amount.trim()) {
        next.amount = "Enter the amount involved.";
      } else if (Number.isNaN(Number(amount)) || Number(amount) <= 0) {
        next.amount = "Amount must be a number greater than zero.";
      }
      if (!effectiveTransactionId.trim()) next.transactionId = "Transaction ID or UTR is required for urgent financial fraud.";
    }
    if (!incidentAt) next.incidentAt = "Enter when the incident happened.";
    if (description.trim().length < 45) next.description = "Add at least 45 characters so the cyber cell has enough context.";
    return next;
  }, [amount, description, effectiveCategory, effectiveTransactionId, incidentAt, isUrgent, selectedSubCategory]);

  const isValid = Object.keys(errors).length === 0;

  return (
    <form
      className="border border-line rounded-card bg-white p-5"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitError("");
        if (!isValid || isSubmitting) return;
        setIsSubmitting(true);
        window.setTimeout(() => {
          if (description.toLowerCase().includes("simulate error")) {
            setSubmitError("We couldn't save this complaint. Please try submitting again.");
            setIsSubmitting(false);
            return;
          }
          const complaint = createComplaint({
            category: effectiveCategory,
            subCategory: selectedSubCategory,
            isUrgent,
            amount: amount ? Number(amount) : undefined,
            transactionId: effectiveTransactionId || undefined,
            incidentAt: new Date(incidentAt).toISOString(),
            description: description.trim(),
            evidence,
            isAnonymous
          });
          window.sessionStorage.setItem("last-ack", complaint.ackNumber);
          router.push(isUrgent ? `/track/${complaint.id}` : `/report/confirm?id=${complaint.id}`);
        }, 650);
      }}
    >
      <div className="border-b border-line pb-4">
        <h2 className="text-xl font-bold leading-tight text-ink">{t("Complaint details")}</h2>
        <p className="mt-1 text-sm text-ink-muted">{t("Required fields are marked. Validation appears beside each field before submission.")}</p>
      </div>

      {isAnonymous ? (
        <div className="animate-reveal mt-4 border border-line border-l-4 border-l-navy rounded-control bg-bg-subtle p-3 text-sm text-ink">
          {t(
            "Filed anonymously — no name, account, or login is attached. Save your acknowledgement number after submitting; it’s the only way to check this report’s status later."
          )}
        </div>
      ) : null}

      <div className="mt-5 grid gap-5">
        <div>
          <label className="block text-sm font-semibold text-ink" htmlFor="category">
            {t("Category")}<RequiredMark />
          </label>
          <input
            className="mt-2 w-full rounded-input border border-line bg-bg-subtle px-3 py-3 text-ink"
            id="category"
            readOnly
            value={effectiveCategory}
          />
          <FieldError id="category-error">{errors.category}</FieldError>
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink" htmlFor="subCategory">
            {t("Subcategory")}<RequiredMark />
          </label>
          {isUrgent ? (
            <select
              className="focus-ring mt-2 w-full rounded-input border border-line bg-white px-3 py-3 text-ink"
              id="subCategory"
              onChange={(event) => setSelectedSubCategory(event.target.value)}
              value={selectedSubCategory}
            >
              {urgentSubCategories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          ) : (
            <input
              className="focus-ring mt-2 w-full rounded-input border border-line bg-white px-3 py-3 text-ink"
              id="subCategory"
              onChange={(event) => setSelectedSubCategory(event.target.value)}
              value={selectedSubCategory}
            />
          )}
          <FieldError id="subCategory-error">{errors.subCategory}</FieldError>
        </div>

        {isUrgent ? (
          <div className="animate-reveal grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-ink" htmlFor="amount">
                {t("Amount lost")}<RequiredMark />
              </label>
              <input
                className="focus-ring mt-2 w-full rounded-input border border-line bg-white px-3 py-3 font-mono text-ink"
                id="amount"
                inputMode="decimal"
                onChange={(event) => setAmount(event.target.value)}
                placeholder="18500"
                value={amount}
              />
              <FieldError id="amount-error">{errors.amount}</FieldError>
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink" htmlFor="transactionId">
                {t("Transaction ID / UTR")}<RequiredMark />
              </label>
              <input
                className="focus-ring mt-2 w-full rounded-input border border-line bg-white px-3 py-3 font-mono text-ink"
                id="transactionId"
                onChange={(event) => setTransactionId(event.target.value)}
                placeholder="UTR1234567890"
                value={effectiveTransactionId}
              />
              <FieldError id="transactionId-error">{errors.transactionId}</FieldError>
            </div>
          </div>
        ) : null}

        <div>
          <label className="block text-sm font-semibold text-ink" htmlFor="incidentAt">
            {t("Incident date and time")}<RequiredMark />
          </label>
          <input
            className="focus-ring mt-2 w-full rounded-input border border-line bg-white px-3 py-3 text-ink"
            id="incidentAt"
            onChange={(event) => setIncidentAt(event.target.value)}
            type="datetime-local"
            value={incidentAt}
          />
          <FieldError id="incidentAt-error">{errors.incidentAt}</FieldError>
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink" htmlFor="description">
            {t("Description")}<RequiredMark />
          </label>
          <textarea
            className="focus-ring mt-2 min-h-32 w-full rounded-input border border-line bg-white px-3 py-3 text-ink"
            id="description"
            onChange={(event) => setDescription(event.target.value)}
            placeholder={t("Explain what happened, who contacted you, what changed in your account, and what evidence you have.")}
            value={description}
          />
          <div className="mt-1 flex justify-between gap-3 text-sm text-ink-muted">
            <span>{t("Minimum 45 characters.")}</span>
            <span className={`font-mono transition-colors duration-200 ${description.trim().length >= 45 ? "text-teal" : ""}`}>
              {description.trim().length}/45
            </span>
          </div>
          <FieldError id="description-error">{errors.description}</FieldError>
        </div>

        <EvidenceUpload files={evidence} onChange={setEvidence} onDetectedReference={isUrgent ? setTransactionId : undefined} />

        {submitError ? (
          <div
            className="animate-reveal border border-line border-l-4 border-l-error rounded-control bg-white px-4 py-3 text-sm font-medium text-error"
            role="alert"
          >
            {submitError}
          </div>
        ) : null}

        <button className={buttonPrimaryClass} disabled={!isValid || isSubmitting} type="submit">
          {isSubmitting ? (
            <>
              <span aria-hidden className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              {t("Submitting...")}
            </>
          ) : (
            t("Submit complaint")
          )}
        </button>
      </div>
    </form>
  );
}
