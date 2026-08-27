"use client";

import { useState } from "react";
import { ComplaintCard } from "@/components/ComplaintCard";
import { EmptyState } from "@/components/EmptyState";
import { useLocale } from "@/components/LocaleProvider";
import { useMockData } from "@/components/MockDataProvider";
import { PageSection, PrimaryLink, SecondaryLink } from "@/components/ui";

type FilterId = "all" | "active" | "resolved" | "escalated";

const filters: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "resolved", label: "Resolved" },
  { id: "escalated", label: "Escalated" }
];

export default function TrackPage() {
  const { t } = useLocale();
  const { currentUser, complaints, isLoaded } = useMockData();
  const [filter, setFilter] = useState<FilterId>("all");

  if (!currentUser) {
    return (
      <PageSection>
        <div className="animate-reveal border border-line rounded-card bg-white p-6">
          <h1 className="text-2xl font-bold text-ink">{t("Login to view complaints")}</h1>
          <p className="mt-2 text-ink-muted">{t("Reporting is open to anyone, but tracking your complaints requires signing in.")}</p>
          <div className="mt-5">
            <PrimaryLink href="/login">{t("Login")}</PrimaryLink>
          </div>
        </div>
      </PageSection>
    );
  }

  const userComplaints = complaints.filter((complaint) => complaint.userId === currentUser.id);
  const filteredComplaints = userComplaints.filter((complaint) => {
    if (filter === "active") return complaint.status !== "RESOLVED";
    if (filter === "resolved") return complaint.status === "RESOLVED";
    if (filter === "escalated") return complaint.escalated === true;
    return true;
  });

  return (
    <PageSection>
      <div className="animate-reveal flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-ink">{t("Complaint tracking")}</h1>
          <p className="mt-2 text-ink-muted">
            {t("Signed in as")} {currentUser.name}.
          </p>
        </div>
        <SecondaryLink href="/">{t("New report")}</SecondaryLink>
      </div>
      {userComplaints.length > 0 ? (
        <div className="animate-reveal mt-6 flex flex-wrap gap-2">
          {filters.map((item) => {
            const selected = filter === item.id;
            return (
              <button
                className={`focus-ring rounded-control border px-3 py-2 text-sm font-semibold transition-all duration-150 active:scale-95 ${
                  selected ? "border-navy border-l-4 border-l-navy bg-bg-subtle text-navy" : "border-line text-ink-muted hover:bg-bg-subtle"
                }`}
                key={item.id}
                onClick={() => setFilter(item.id)}
                type="button"
              >
                {t(item.label)}
              </button>
            );
          })}
        </div>
      ) : null}
      <div className="mt-6">
        {!isLoaded ? (
          <div className="grid gap-4">
            {[0, 1, 2].map((item) => (
              <div className="skeleton-shimmer h-36 border border-line rounded-card bg-bg-subtle" key={item} />
            ))}
          </div>
        ) : userComplaints.length === 0 ? (
          <EmptyState />
        ) : filteredComplaints.length > 0 ? (
          <div className="grid gap-4">
            {filteredComplaints.map((complaint, index) => (
              <ComplaintCard complaint={complaint} index={index} key={complaint.id} />
            ))}
          </div>
        ) : (
          <div className="animate-reveal border border-line rounded-card bg-white p-6 text-center text-ink-muted">
            {t("No complaints match this filter.")}
          </div>
        )}
      </div>
    </PageSection>
  );
}
