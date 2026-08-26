"use client";

import { useState } from "react";
import { ComplaintForm } from "@/components/ComplaintForm";
import { Icon } from "@/components/Icon";
import { ChoiceLetter, choiceListClass, choiceRowClass, choiceRowSelectedClass } from "@/components/ui";
import { categoryChoices } from "@/lib/seed-data";

const letters = ["A", "B", "C", "D", "E"];

const subChoicesByCategoryId: Record<string, string[]> = {
  "money-account": ["UPI fraud", "Card fraud", "Investment scam", "Bank impersonation or phishing"],
  "device-hacked": ["Email or social media account", "Phone or laptop compromise", "Cloud account compromise"],
  harassed: ["Fake profile impersonating me", "Repeated threats or abuse", "Identity misuse elsewhere"]
};

export function CategoryQA() {
  const [choiceId, setChoiceId] = useState("");
  const [subChoice, setSubChoice] = useState<string | null>(null);
  const [otherCategory, setOtherCategory] = useState("");
  const [reportAnonymously, setReportAnonymously] = useState(true);
  const choice = categoryChoices.find((item) => item.id === choiceId);
  const subOptions = choiceId ? subChoicesByCategoryId[choiceId] : undefined;
  const showForm = Boolean(choice) && (!subOptions || Boolean(subChoice));
  const effectiveSubCategory = subOptions ? subChoice ?? subOptions[0] : choice?.subCategory;
  const supportsAnonymous = choice?.id === "private-content";

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="border border-line rounded-card bg-white p-5">
        <h1 className="text-3xl font-bold leading-tight text-ink sm:text-4xl">What happened?</h1>
        <p className="mt-2 text-ink-muted">Choose the plain-language description closest to your situation. We map it to a complaint category in the background.</p>
        <div className={`mt-5 ${choiceListClass}`}>
          {categoryChoices.map((item, index) => {
            const selected = choiceId === item.id;
            const itemSubOptions = subChoicesByCategoryId[item.id];
            return (
              <div key={item.id}>
                <button
                  className={`${choiceRowClass} p-4 ${selected ? choiceRowSelectedClass : ""}`}
                  onClick={() => {
                    setChoiceId(item.id);
                    setSubChoice(null);
                  }}
                  type="button"
                >
                  <ChoiceLetter active={selected} letter={letters[index] ?? String(index + 1)} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink">{item.label}</span>
                    <span className="mt-1 block text-sm text-ink-muted">{item.description}</span>
                  </span>
                  {selected ? <Icon className="mt-1 h-5 w-5 shrink-0 text-navy" label="Selected" name="check" /> : null}
                </button>
                {selected && itemSubOptions ? (
                  <div className="border-t border-line bg-bg-subtle p-4 pl-8">
                    <p className="text-sm font-semibold text-ink">Which of these best matches?</p>
                    <div className={`mt-2 ${choiceListClass}`}>
                      {itemSubOptions.map((option, subIndex) => {
                        const subSelected = subChoice === option;
                        return (
                          <button
                            className={`${choiceRowClass} p-3 text-sm ${subSelected ? choiceRowSelectedClass : ""}`}
                            key={option}
                            onClick={() => setSubChoice(option)}
                            type="button"
                          >
                            <ChoiceLetter active={subSelected} letter={letters[subIndex] ?? String(subIndex + 1)} size="sm" />
                            <span className="min-w-0 flex-1 font-medium text-ink">{option}</span>
                            {subSelected ? <Icon className="mt-0.5 h-4 w-4 shrink-0 text-navy" label="Selected" name="check" /> : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        {choice?.id === "something-else" ? (
          <div className="mt-5">
            <label className="block text-sm font-semibold text-ink" htmlFor="otherCategory">
              Brief category name
            </label>
            <input
              className="focus-ring mt-2 w-full rounded-input border border-line bg-white px-3 py-3"
              id="otherCategory"
              onChange={(event) => setOtherCategory(event.target.value)}
              placeholder="Example: fake job offer"
              value={otherCategory}
            />
          </div>
        ) : null}
        {supportsAnonymous ? (
          <label className="mt-5 flex items-start gap-3 border border-line rounded-control bg-bg-subtle p-4 text-sm">
            <input
              checked={reportAnonymously}
              className="mt-0.5 h-4 w-4 accent-navy"
              onChange={(event) => setReportAnonymously(event.target.checked)}
              type="checkbox"
            />
            <span>
              <span className="block font-semibold text-ink">Report anonymously</span>
              <span className="mt-0.5 block text-ink-muted">
                No name, account, or login is attached to this report. You&rsquo;ll get an acknowledgement number to check its status —
                that&rsquo;s the only way to find it again, since it won&rsquo;t appear in any dashboard.
              </span>
            </span>
          </label>
        ) : null}
      </section>
      <div>
        {showForm && choice ? (
          <ComplaintForm
            category={choice.category}
            isAnonymous={supportsAnonymous ? reportAnonymously : undefined}
            isUrgent={false}
            otherCategory={choice.id === "something-else" ? otherCategory : undefined}
            subCategory={effectiveSubCategory}
          />
        ) : (
          <div className="border border-line rounded-card bg-white p-6">
            <h2 className="text-xl font-bold text-ink">Complaint form</h2>
            <p className="mt-2 text-ink-muted">
              {choice
                ? "Choose the closest match above to open the guided form."
                : "Select what happened to open the guided form. There is always a valid path forward, including \"Something else.\""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
