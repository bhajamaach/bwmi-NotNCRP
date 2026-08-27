"use client";

import { useLocale } from "@/components/LocaleProvider";
import { PageSection, PrimaryLink } from "@/components/ui";

export default function Helpline1930Page() {
  const { t } = useLocale();
  return (
    <PageSection className="max-w-3xl">
      <div className="animate-reveal">
        <p className="text-sm font-medium text-navy">{t("Resources")}</p>
        <h1 className="mt-2 text-3xl font-bold text-ink">{t("Calling the 1930 helpline")}</h1>
        <p className="mt-4 text-ink-muted">
          {t(
            "1930 is the national helpline for reporting financial cyber fraud. Calling it quickly, alongside contacting your bank, can improve the chance of stopping further movement of funds — this is why the Golden Hour flow surfaces it as a parallel action rather than a step to finish before filing."
          )}
        </p>
      </div>
      <div className="animate-reveal mt-6 space-y-4 rounded-card border border-line bg-white p-5" style={{ animationDelay: "70ms" }}>
        <div>
          <p className="text-sm font-semibold text-ink">{t("Before you call")}</p>
          <p className="mt-1 text-sm text-ink-muted">{t("Keep ready: the transaction ID / UTR, the approximate amount, and the date and time of the transaction.")}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{t("What the helpline can do")}</p>
          <p className="mt-1 text-sm text-ink-muted">
            {t(
              "Flag the transaction to the payment channel involved so it can attempt to hold or trace the funds. It does not replace filing a complaint — you still need to file one, in parallel."
            )}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{t("One thing to know")}</p>
          <p className="mt-1 text-sm text-ink-muted">
            {t("Marking \"Call 1930\" as done in the Golden Hour checklist only tracks the step for you — you still need to dial 1930 yourself.")}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <PrimaryLink href="/report/urgent">{t("Go to the Golden Hour flow")}</PrimaryLink>
      </div>
    </PageSection>
  );
}
