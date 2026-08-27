"use client";

import { useLocale } from "@/components/LocaleProvider";
import { PageSection } from "@/components/ui";

const tips = [
  {
    title: "Banks never ask for your OTP or PIN",
    body: "No genuine bank, UPI app, or payment provider will call, message, or email you asking for your OTP, PIN, or card CVV. Treat any such request as fraud."
  },
  {
    title: "Verify before you pay",
    body: "Before sending money for a job offer, refund, or investment, independently verify the requester through an official number or website you looked up yourself — not one they gave you."
  },
  {
    title: "Unknown links and QR codes",
    body: "Scanning a QR code or opening a link to 'receive' money is a common trick — QR codes and payment links are for sending money, not receiving it."
  },
  {
    title: "Screenshot and note details immediately",
    body: "If something looks wrong, screenshot the chat, note the transaction ID / UTR, and the exact time. This makes both the 1930 call and the complaint faster to act on."
  },
  {
    title: "Slow down on urgency and authority",
    body: "Scams often combine a fake deadline with a fake authority (police, bank, court). Real institutions do not pressure you to act within minutes over chat or call."
  }
];

export default function SafetyTipsPage() {
  const { t } = useLocale();
  return (
    <PageSection className="max-w-3xl">
      <div className="animate-reveal">
        <p className="text-sm font-medium text-navy">{t("Resources")}</p>
        <h1 className="mt-2 text-3xl font-bold text-ink">{t("Cyber safety tips")}</h1>
        <p className="mt-4 text-ink-muted">{t("General, plain-language guidance to reduce the chance of financial fraud and account compromise.")}</p>
      </div>
      <ol className="mt-6 space-y-4">
        {tips.map((tip, index) => (
          <li
            className="animate-reveal flex gap-4 rounded-card border border-line bg-white p-5"
            key={tip.title}
            style={{ animationDelay: `${70 + index * 60}ms` }}
          >
            <span className="font-mono text-sm text-ink-muted">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p className="font-semibold text-ink">{t(tip.title)}</p>
              <p className="mt-1 text-sm text-ink-muted">{t(tip.body)}</p>
            </div>
          </li>
        ))}
      </ol>
    </PageSection>
  );
}
