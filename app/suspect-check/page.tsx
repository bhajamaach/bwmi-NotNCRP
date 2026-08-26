"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { PageSection, buttonPrimaryClass } from "@/components/ui";
import { suspectRegistry } from "@/lib/seed-data";

export default function SuspectCheckPage() {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [result, setResult] = useState<(typeof suspectRegistry)[number] | null>(null);

  return (
    <PageSection>
      <div>
        <p className="font-mono text-sm font-semibold text-navy">Public suspect registry</p>
        <h1 className="mt-1 text-3xl font-bold text-ink sm:text-4xl">Check a suspect</h1>
        <p className="mt-2 max-w-2xl text-ink-muted">
          Search a UPI VPA, phone number, bank account, or email before you pay or share information. This checks a small starter list,
          not the live I4C Suspect Registry.
        </p>
      </div>
      <form
        className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault();
          const match = suspectRegistry.find((item) => item.value.toLowerCase() === query.trim().toLowerCase());
          setResult(match ?? null);
          setHasSearched(true);
        }}
      >
        <label className="sr-only" htmlFor="suspectQuery">
          UPI VPA, phone number, bank account, or email
        </label>
        <input
          className="focus-ring w-full rounded-input border border-line bg-white px-3 py-3 font-mono text-ink"
          id="suspectQuery"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="e.g. fastcashback@upi"
          value={query}
        />
        <button className={buttonPrimaryClass} type="submit">
          <Icon className="h-4 w-4" name="search" />
          Check
        </button>
      </form>

      {hasSearched ? (
        result ? (
          <div className="mt-6 flex max-w-xl items-start gap-3 border border-line border-l-4 border-l-urgent rounded-card bg-white p-5">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-urgent" name="alert" />
            <div>
              <h2 className="font-bold text-urgent">Flagged</h2>
              <p className="mt-1 text-sm text-ink">
                {result.identifierType}: <span className="font-mono">{result.value}</span>
              </p>
              <p className="mt-1 text-sm text-ink-muted">{result.flaggedFor}</p>
              <p className="mt-2 font-mono text-xs text-ink-muted">Flagged on {result.flaggedOn}</p>
              {result.identifierType === "Phone number" ? (
                <a
                  className="focus-ring mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-navy underline"
                  href="https://sancharsaathi.gov.in/"
                  rel="noreferrer"
                  target="_blank"
                >
                  Report this number on Sanchar Saathi (Chakshu) ↗
                </a>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="mt-6 flex max-w-xl items-start gap-3 border border-line border-l-4 border-l-teal rounded-card bg-white p-5">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-teal" name="check" />
            <div>
              <h2 className="font-bold text-teal">Not found</h2>
              <p className="mt-1 text-sm text-ink-muted">
                No match on this list. That's not a guarantee of legitimacy — stay cautious with unfamiliar payment requests regardless.
              </p>
            </div>
          </div>
        )
      ) : (
        <div className="mt-6 max-w-xl border border-line rounded-card bg-bg-subtle p-4 text-sm text-ink-muted">
          <p className="font-semibold text-ink">Try one of these flagged identifiers:</p>
          <ul className="mt-2 space-y-1 font-mono">
            {suspectRegistry.slice(0, 3).map((item) => (
              <li key={item.id}>{item.value}</li>
            ))}
          </ul>
        </div>
      )}
    </PageSection>
  );
}
