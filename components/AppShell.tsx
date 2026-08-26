"use client";

import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/components/LocaleProvider";
import { useMockData } from "@/components/MockDataProvider";

const navLinkClass = "focus-ring-invert rounded-control px-2 py-2 font-semibold text-white/85 hover:text-white hover:underline";
const navyBarButtonClass =
  "focus-ring-invert inline-flex items-center justify-center gap-2 rounded-control border-2 border-white px-4 py-2 font-semibold text-white transition-colors hover:bg-white hover:text-navy";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { currentUser, logout } = useMockData();
  const { t } = useLocale();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-navy-hover bg-navy">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link className="focus-ring-invert flex items-baseline gap-2" href="/">
            <span className="text-lg font-bold tracking-tight text-white">{t("NotNCRP")}</span>
            <span className="hidden text-sm text-white/70 sm:inline">{t("Cybercrime reporting, urgency-first")}</span>
          </Link>
          <nav aria-label="Primary" className="flex flex-wrap items-center gap-4 text-sm">
            <Link className={navLinkClass} href="/track">
              {t("Track")}
            </Link>
            <Link className={navLinkClass} href="/unfreeze">
              {t("Unfreeze account")}
            </Link>
            <Link className={navLinkClass} href="/suspect-check">
              {t("Check a suspect")}
            </Link>
            <Link className={navLinkClass} href="/admin">
              {t("Cyber Cell")}
            </Link>
            <LanguageSwitcher />
            {currentUser ? (
              <button className={navyBarButtonClass} onClick={logout} type="button">
                {t("Sign out")}
              </button>
            ) : (
              <Link className={navyBarButtonClass} href="/login">
                {t("Login")}
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-line bg-bg-subtle">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-ink">{t("Report & track")}</p>
              <ul className="mt-2 space-y-1 text-sm text-ink-muted">
                <li><Link className="focus-ring hover:text-navy" href="/report/urgent">{t("Report active fraud")}</Link></li>
                <li><Link className="focus-ring hover:text-navy" href="/report/standard">{t("Report a cybercrime")}</Link></li>
                <li><Link className="focus-ring hover:text-navy" href="/track">{t("Track a complaint")}</Link></li>
                <li><Link className="focus-ring hover:text-navy" href="/unfreeze">{t("Unfreeze an account")}</Link></li>
                <li><Link className="focus-ring hover:text-navy" href="/suspect-check">{t("Check a suspect")}</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{t("Resources")}</p>
              <ul className="mt-2 space-y-1 text-sm text-ink-muted">
                <li><Link className="focus-ring hover:text-navy" href="/help/1930">{t("Calling 1930")}</Link></li>
                <li><Link className="focus-ring hover:text-navy" href="/help/safety-tips">{t("Cyber safety tips")}</Link></li>
                <li><Link className="focus-ring hover:text-navy" href="/help/faq">{t("FAQ")}</Link></li>
                <li>
                  <a className="focus-ring hover:text-navy" href="https://sancharsaathi.gov.in/" rel="noreferrer" target="_blank">
                    Report a fraud call/SMS (Sanchar Saathi) ↗
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{t("About")}</p>
              <ul className="mt-2 space-y-1 text-sm text-ink-muted">
                <li><Link className="focus-ring hover:text-navy" href="/login">{t("Login")}</Link></li>
                <li>
                  <details className="group">
                    <summary className="focus-ring cursor-pointer list-none hover:text-navy">{t("How this works")}</summary>
                    <p className="mt-2 max-w-xs text-ink-muted">
                      {t(
                        "Login, bank contact, 1930, evidence review, and fund liens run against a local session rather than live banking or government systems. Evidence fingerprints are real SHA-256 hashes, computed in your browser. English only for now."
                      )}
                    </p>
                  </details>
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-6 border-t border-line pt-4 text-sm font-semibold text-ink-muted">
            {t("NotNCRP is an independent project, not affiliated with or endorsed by cybercrime.gov.in or any government body.")}
          </p>
        </div>
      </footer>
    </div>
  );
}
