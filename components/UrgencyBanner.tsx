"use client";

import { Icon } from "@/components/Icon";
import { useLocale } from "@/components/LocaleProvider";

export function UrgencyBanner() {
  const { t } = useLocale();
  return (
    <aside className="animate-reveal border-2 border-line-bold border-l-4 border-l-urgent rounded-card bg-white p-4">
      <div className="flex gap-3">
        <Icon className="mt-1 h-5 w-5 shrink-0 text-urgent" name="clock" />
        <div>
          <h2 className="font-bold text-urgent">{t("Golden Hour Fast Track")}</h2>
          <p className="mt-1 text-sm text-ink">
            {t(
              "Acting quickly can improve the chances of stopping further movement of funds. Call 1930, contact your bank, and file your complaint together instead of one after another."
            )}
          </p>
        </div>
      </div>
    </aside>
  );
}
