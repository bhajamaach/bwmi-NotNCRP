"use client";

import { Icon } from "@/components/Icon";
import { useLocale } from "@/components/LocaleProvider";
import { PrimaryLink } from "@/components/ui";

export function EmptyState() {
  const { t } = useLocale();
  return (
    <div className="animate-reveal border border-line rounded-card bg-white p-8 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-bg-subtle">
        <Icon className="h-7 w-7 text-teal" name="shield" />
      </span>
      <h2 className="mt-4 text-xl font-bold text-ink">{t("Nothing to report — and that's the good outcome")}</h2>
      <p className="mx-auto mt-2 max-w-xl text-ink-muted">{t("Anything you file will show up here, tracked from the moment it's received.")}</p>
      <div className="mt-5">
        <PrimaryLink href="/">{t("Start a report")}</PrimaryLink>
      </div>
    </div>
  );
}
