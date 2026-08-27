import { Icon } from "@/components/Icon";
import { useLocale } from "@/components/LocaleProvider";
import { formatDateTime, statusSteps } from "@/lib/status";
import type { Complaint } from "@/lib/types";

export function StatusTimeline({ complaint }: { complaint: Complaint }) {
  const { t } = useLocale();
  const currentIndex = statusSteps.findIndex((step) => step.status === complaint.status);

  return (
    <ol className="relative">
      {statusSteps.map((step, index) => {
        const update = complaint.statusHistory.find((item) => item.status === step.status);
        const isLast = index === statusSteps.length - 1;
        const state: "done" | "current" | "future" =
          index < currentIndex || (index === currentIndex && step.status === "RESOLVED")
            ? "done"
            : index === currentIndex
              ? "current"
              : "future";

        const circleClass =
          state === "done"
            ? "border-navy bg-navy text-white"
            : state === "current"
              ? "border-navy bg-white text-navy"
              : "border-line-strong bg-white text-ink-muted";

        return (
          <li
            className="animate-reveal relative flex gap-4 pb-8 last:pb-0"
            key={step.status}
            style={{ animationDelay: `${index * 90}ms` }}
          >
            {!isLast ? <span aria-hidden className="absolute left-4 top-8 bottom-0 w-px bg-line" /> : null}
            <span
              className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 font-mono text-sm transition-colors duration-150 ${circleClass} ${
                state === "current" ? "animate-pulse-ring" : ""
              }`}
            >
              {state === "done" ? <Icon className="h-4 w-4 animate-pop" name="check" /> : index + 1}
            </span>
            <div className="min-w-0 pt-0.5">
              <h3 className={`font-semibold ${state === "future" ? "text-ink-muted" : "text-ink"}`}>{t(step.label)}</h3>
              <p className="mt-0.5 text-sm text-ink">{t(step.description)}</p>
              <p className="mt-1 font-mono text-xs text-ink-muted">{update ? formatDateTime(update.timestamp) : t(step.emptyNote)}</p>
              {update?.note ? <p className="mt-1 text-sm text-ink-muted">{t(update.note)}</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
