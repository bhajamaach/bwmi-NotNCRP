"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { ChoiceLetter, PageSection, choiceListClass, choiceRowClass } from "@/components/ui";

const choices = [
  {
    letter: "A",
    title: "Yes — help me now",
    rationale: "Financial fraud in progress. Opens the Golden Hour fast-track flow.",
    href: "/report/urgent"
  },
  {
    letter: "B",
    title: "No — I want to report something that already happened",
    rationale: "Use a plain-language guided complaint flow.",
    href: "/report/standard"
  },
  {
    letter: "C",
    title: "Not sure",
    rationale: "Start with the guided questions; there is a path forward either way.",
    href: "/report/standard"
  }
];

const featureCards: [string, string][] = [
  ["Recognize urgency", "The first decision is time sensitivity, not government taxonomy."],
  ["Act in parallel", "1930 guidance, bank contact, and filing sit together."],
  ["Track clearly", "A staged timeline with SLA escalation replaces a silent pending state."]
];

export default function HomePage() {
  const { t } = useLocale();

  return (
    <PageSection>
      <h1 className="max-w-4xl text-4xl font-bold leading-tight text-ink sm:text-6xl">
        {t("Is this happening right now, or did you just lose money?")}
      </h1>
      <p className="mt-3 max-w-2xl text-ink-muted">
        {t(
          "Financial fraud can often still be slowed if you act quickly. We ask about urgency first, then guide reporting and tracking with less uncertainty than a single long form."
        )}
      </p>

      <div className={`mt-8 ${choiceListClass}`}>
        {choices.map((choice) => (
          <Link
            className={`${choiceRowClass} gap-4 p-5 sm:gap-6`}
            href={choice.href}
            key={choice.letter}
          >
            <ChoiceLetter letter={choice.letter} />
            <span>
              <span className="block text-lg font-semibold text-ink">{t(choice.title)}</span>
              <span className="mt-1 block text-sm text-ink-muted">{t(choice.rationale)}</span>
            </span>
          </Link>
        ))}
      </div>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {featureCards.map(([title, copy]) => (
          <div className="border border-line rounded-card bg-white p-5" key={title}>
            <h2 className="font-bold text-ink">{t(title)}</h2>
            <p className="mt-2 text-sm text-ink-muted">{t(copy)}</p>
          </div>
        ))}
      </section>
    </PageSection>
  );
}
