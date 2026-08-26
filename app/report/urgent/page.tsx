"use client";

import { useState } from "react";
import { ChecklistCard } from "@/components/ChecklistCard";
import { ComplaintForm } from "@/components/ComplaintForm";
import { UrgencyBanner } from "@/components/UrgencyBanner";
import { PageSection } from "@/components/ui";

export default function UrgentReportPage() {
  const [transactionId, setTransactionId] = useState("");

  return (
    <PageSection>
      <div className="mb-6">
        <UrgencyBanner />
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <ChecklistCard transactionId={transactionId} onTransactionIdChange={setTransactionId} />
        <ComplaintForm
          category="Financial Fraud"
          isUrgent
          onTransactionIdChange={setTransactionId}
          transactionId={transactionId}
        />
      </div>
    </PageSection>
  );
}
