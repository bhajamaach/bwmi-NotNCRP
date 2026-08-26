"use client";

import { useLocale } from "@/components/LocaleProvider";
import { locales } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-1 rounded-control border border-white/40 p-0.5">
      {locales.map((item) => (
        <button
          className={`focus-ring-invert rounded-input px-2 py-1 text-xs font-semibold transition-colors ${
            locale === item.code ? "bg-white text-navy" : "text-white/80 hover:text-white"
          }`}
          key={item.code}
          onClick={() => setLocale(item.code)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
