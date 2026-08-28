"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { FieldError, PageSection, buttonPrimaryClass } from "@/components/ui";

export default function LookupPage() {
  const router = useRouter();
  const [ackNumber, setAckNumber] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!ackNumber.trim()) {
      setError("Enter the acknowledgement number you were given when you filed.");
      return;
    }
    setIsSubmitting(true);
    const result = await api.lookupAnonymousComplaint(ackNumber.trim());
    setIsSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(`/track/${result.complaint.id}`);
  }

  return (
    <PageSection>
      <div className="animate-reveal mx-auto max-w-xl border-2 border-line-bold rounded-card bg-white p-6">
        <h1 className="text-2xl font-bold text-ink">Find an anonymous report</h1>
        <p className="mt-2 text-ink-muted">
          If you filed anonymously, this is the only way to check its status — no login is possible since no account is attached to it.
          Enter the acknowledgement number you were given when you submitted it.
        </p>
        <form className="mt-6 grid gap-3" noValidate onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-ink" htmlFor="ackNumber">
            Acknowledgement number
          </label>
          <input
            className="focus-ring w-full rounded-input border border-line bg-white px-3 py-3 font-mono"
            id="ackNumber"
            onChange={(event) => setAckNumber(event.target.value)}
            placeholder="NCRP-2026-08-XXXXXX"
            value={ackNumber}
          />
          <FieldError id="lookup-error">{error}</FieldError>
          <button className={buttonPrimaryClass} disabled={isSubmitting} type="submit">
            {isSubmitting ? "Looking up..." : "Find my report"}
          </button>
        </form>
      </div>
    </PageSection>
  );
}
