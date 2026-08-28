"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { useLocale } from "@/components/LocaleProvider";
import { useMockData } from "@/components/MockDataProvider";
import { PageSection } from "@/components/ui";
import { grievanceStageLabel } from "@/lib/grievance";
import { isEscalated, isSlaExceeded, statusLabel, statusSteps } from "@/lib/status";
import type { ComplaintStatus } from "@/lib/types";

const nextStatus: Record<ComplaintStatus, ComplaintStatus> = {
  RECEIVED: "ASSIGNED",
  ASSIGNED: "BANK_NOTIFIED",
  BANK_NOTIFIED: "INVESTIGATING",
  INVESTIGATING: "RESOLVED",
  RESOLVED: "RESOLVED"
};

const grievanceActionLabel: Record<string, string> = {
  SUBMITTED: "Waiting on citizen to book KYC",
  KYC_SCHEDULED: "Mark review complete",
  IO_REVIEW: "Issue NOC",
  NOC_ISSUED: "Done"
};

export default function AdminPage() {
  const { t } = useLocale();
  const { complaints, updateStatus, grievances, advanceGrievance } = useMockData();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | ComplaintStatus>("ALL");
  const [confirmedId, setConfirmedId] = useState<string | null>(null);
  const [confirmedGrievanceId, setConfirmedGrievanceId] = useState<string | null>(null);

  // Anonymous complaints have no name/account attached at the data level
  // regardless of who views them, so Cyber Cell sees them here — otherwise
  // they could never be assigned or acted on. What anonymity guarantees is
  // that they never appear on the filer's own /track dashboard, not that
  // investigators can't see they exist.
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch = complaint.ackNumber.toLowerCase().includes(search.trim().toLowerCase());
    const matchesStatus = statusFilter === "ALL" || complaint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const byCategory = complaints.reduce<Record<string, number>>((acc, complaint) => {
    acc[complaint.category] = (acc[complaint.category] ?? 0) + 1;
    return acc;
  }, {});
  const categoryBreakdown = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
  const escalatedCount = complaints.filter((complaint) => isEscalated(complaint)).length;
  const resolvedCount = complaints.filter((complaint) => complaint.status === "RESOLVED").length;
  const maxCategoryCount = Math.max(1, ...categoryBreakdown.map(([, count]) => count));

  return (
    <PageSection>
      <div className="animate-reveal">
        <p className="font-mono text-sm font-semibold text-navy">{t("Internal view")}</p>
        <h1 className="mt-1 text-3xl font-bold text-ink">{t("Cyber Cell dashboard")}</h1>
        <p className="mt-2 text-ink-muted">{t("Advance a complaint's status and it updates immediately on the citizen's tracking page.")}</p>
      </div>

      <div className="animate-reveal mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]" style={{ animationDelay: "60ms" }}>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="border border-line rounded-card bg-white p-3 transition-shadow duration-150 hover:shadow-md sm:p-4">
            <p className="font-mono text-xl font-bold text-ink sm:text-2xl">{complaints.length}</p>
            <p className="mt-1 whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-ink-muted sm:text-xs">{t("Total")}</p>
          </div>
          <div className="border border-line rounded-card bg-white p-3 transition-shadow duration-150 hover:shadow-md sm:p-4">
            <p className="font-mono text-xl font-bold text-amber sm:text-2xl">{escalatedCount}</p>
            <p className="mt-1 whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-ink-muted sm:text-xs">{t("Escalated")}</p>
          </div>
          <div className="border border-line rounded-card bg-white p-3 transition-shadow duration-150 hover:shadow-md sm:p-4">
            <p className="font-mono text-xl font-bold text-teal sm:text-2xl">{resolvedCount}</p>
            <p className="mt-1 whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-ink-muted sm:text-xs">{t("Resolved")}</p>
          </div>
        </div>
        <div className="border border-line rounded-card bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{t("Pattern by category")}</p>
          <p className="mt-1 text-xs text-ink-muted">
            {t(
              "This session’s complaints only — a local stand-in for the kind of cross-case pattern view a real Samanvay-style analytics layer would run over the full national caseload."
            )}
          </p>
          <div className="mt-3 space-y-2">
            {categoryBreakdown.map(([category, count]) => (
              <div className="flex items-center gap-3" key={category}>
                <span className="w-40 shrink-0 truncate text-sm text-ink-muted" title={category}>{category}</span>
                <div className="h-3 flex-1 overflow-hidden rounded-input bg-bg-subtle">
                  <div className="h-full rounded-input bg-navy" style={{ width: `${(count / maxCategoryCount) * 100}%` }} />
                </div>
                <span className="w-5 shrink-0 text-right font-mono text-sm text-ink">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-ink" htmlFor="adminSearch">
            {t("Search by acknowledgement number")}
          </label>
          <input
            className="focus-ring mt-2 w-full rounded-input border border-line bg-white px-3 py-2 font-mono text-ink"
            id="adminSearch"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="NCRP-..."
            value={search}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink" htmlFor="adminStatusFilter">
            {t("Filter by status")}
          </label>
          <select
            className="focus-ring mt-2 w-full rounded-input border border-line bg-white px-3 py-2 text-ink sm:w-56"
            id="adminStatusFilter"
            onChange={(event) => setStatusFilter(event.target.value as "ALL" | ComplaintStatus)}
            value={statusFilter}
          >
            <option value="ALL">{t("All statuses")}</option>
            {statusSteps.map((step) => (
              <option key={step.status} value={step.status}>
                {t(step.label)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-6 overflow-hidden border border-line rounded-card bg-white">
        <div className="grid grid-cols-1 border-b border-line bg-bg-subtle p-4 text-sm font-semibold text-ink md:grid-cols-[1fr_0.8fr_0.8fr_0.6fr]">
          <span>{t("Complaint")}</span>
          <span>{t("Category")}</span>
          <span>{t("Status")}</span>
          <span>{t("Action")}</span>
        </div>
        {filteredComplaints.length === 0 ? (
          <div className="p-4 text-ink-muted">{t("No complaints match this search or filter.")}</div>
        ) : (
          filteredComplaints.map((complaint) => {
            const target = nextStatus[complaint.status];
            return (
              <div className="animate-reveal grid grid-cols-1 gap-3 border-b border-line p-4 last:border-b-0 md:grid-cols-[1fr_0.8fr_0.8fr_0.6fr] md:items-center" key={complaint.id}>
                <div>
                  <p className="flex flex-wrap items-center gap-2 font-mono font-semibold text-ink">
                    {complaint.ackNumber}
                    {complaint.isAnonymous ? (
                      <span className="rounded-input border border-line-strong bg-bg-subtle px-2 py-0.5 font-sans text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                        {t("Anonymous")}
                      </span>
                    ) : null}
                  </p>
                  <p className="text-sm text-ink-muted">{isSlaExceeded(complaint) ? t("SLA exceeded") : t("Within SLA window")}</p>
                </div>
                <p className="text-ink-muted">{complaint.category}</p>
                <p className="text-ink-muted">{t(statusLabel(complaint.status))}</p>
                <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    className="focus-ring rounded-control border border-line px-3 py-2 text-sm font-semibold text-navy transition-all duration-150 hover:bg-bg-subtle active:scale-95"
                    href={`/admin/complaints/${complaint.id}`}
                  >
                    {t("View")}
                  </Link>
                  <button
                    className="focus-ring rounded-control border border-line px-3 py-2 text-sm font-semibold text-navy transition-all duration-150 hover:bg-bg-subtle active:scale-95 disabled:opacity-50"
                    disabled={complaint.status === "RESOLVED"}
                    onClick={() => {
                      updateStatus(complaint.id, target, `The cyber cell updated the status to ${statusLabel(target)}.`).catch(() => {});
                      setConfirmedId(complaint.id);
                      window.setTimeout(() => setConfirmedId(null), 1500);
                    }}
                    type="button"
                  >
                    {complaint.status === "RESOLVED" ? t("Done") : t("Advance")}
                  </button>
                </div>
                {confirmedId === complaint.id ? (
                  <p className="animate-reveal mt-1 flex items-center gap-1 text-sm font-medium text-teal">
                    <Icon className="h-3.5 w-3.5 animate-pop" name="check" />
                    {t("Status updated.")}
                  </p>
                ) : null}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-12">
        <p className="font-mono text-sm font-semibold text-navy">{t("Self-service grievance queue")}</p>
        <h2 className="mt-1 text-2xl font-bold text-ink">{t("Unfreezing petitions")}</h2>
        <p className="mt-2 text-ink-muted">
          {t(
            "Petitions move to \"Video-KYC scheduled\" on their own once the citizen books a slot. The remaining steps — review and NOC issuance — are officer actions from here, and mutate the same state the citizen sees on their petition page."
          )}
        </p>
      </div>
      <div className="mt-6 overflow-hidden border border-line rounded-card bg-white">
        <div className="grid grid-cols-1 border-b border-line bg-bg-subtle p-4 text-sm font-semibold text-ink md:grid-cols-[1fr_0.8fr_0.8fr_0.7fr]">
          <span>{t("Petition")}</span>
          <span>{t("Account")}</span>
          <span>{t("Stage")}</span>
          <span>{t("Action")}</span>
        </div>
        {grievances.length === 0 ? (
          <div className="p-4 text-ink-muted">{t("No unfreezing petitions yet.")}</div>
        ) : (
          grievances.map((petition) => {
            const canAdvance = petition.stage === "KYC_SCHEDULED" || petition.stage === "IO_REVIEW";
            return (
              <div
                className="animate-reveal grid grid-cols-1 gap-3 border-b border-line p-4 last:border-b-0 md:grid-cols-[1fr_0.8fr_0.8fr_0.7fr] md:items-center"
                key={petition.id}
              >
                <p className="font-mono font-semibold text-ink">{petition.petitionNumber}</p>
                <p className="font-mono text-ink-muted">&hellip;{petition.accountNumber.slice(-4)}</p>
                <p className="text-ink-muted">{t(grievanceStageLabel(petition.stage))}</p>
                <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    className="focus-ring rounded-control border border-line px-3 py-2 text-sm font-semibold text-navy transition-all duration-150 hover:bg-bg-subtle active:scale-95"
                    href={`/unfreeze/${petition.id}`}
                  >
                    {t("View")}
                  </Link>
                  <button
                    className="focus-ring rounded-control border border-line px-3 py-2 text-sm font-semibold text-navy transition-all duration-150 hover:bg-bg-subtle active:scale-95 disabled:opacity-50"
                    disabled={!canAdvance}
                    onClick={() => {
                      const note =
                        petition.stage === "KYC_SCHEDULED"
                          ? "The investigating officer completed the video-KYC review."
                          : "The investigating officer approved the petition and issued a digital NOC to the bank.";
                      advanceGrievance(petition.id, note).catch(() => {});
                      setConfirmedGrievanceId(petition.id);
                      window.setTimeout(() => setConfirmedGrievanceId(null), 1500);
                    }}
                    type="button"
                  >
                    {t(grievanceActionLabel[petition.stage])}
                  </button>
                </div>
                {confirmedGrievanceId === petition.id ? (
                    <p className="animate-reveal mt-1 flex items-center gap-1 text-sm font-medium text-teal">
                      <Icon className="h-3.5 w-3.5 animate-pop" name="check" />
                      {t("Updated.")}
                    </p>
                  ) : null}
                </div>
              </div>
            );
          })
        )}
      </div>
    </PageSection>
  );
}
