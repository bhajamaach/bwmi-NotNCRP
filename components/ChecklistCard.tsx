"use client";

import { useState } from "react";
import { CallButton } from "@/components/CallButton";
import { Icon } from "@/components/Icon";
import { bankDirectory, nationalHelplineFor } from "@/lib/bank-directory";
import { lookupIfsc, type BankBranch } from "@/lib/ifsc";

const exampleIfscCodes = ["SBIN0000691", "HDFC0000001", "ICIC0000001"];

type LookupMode = "ifsc" | "name";

export function ChecklistCard({
  transactionId,
  onTransactionIdChange
}: {
  transactionId: string;
  onTransactionIdChange: (value: string) => void;
}) {
  const [called, setCalled] = useState(false);
  const [mode, setMode] = useState<LookupMode>("ifsc");
  const [ifsc, setIfsc] = useState("");
  const [branch, setBranch] = useState<BankBranch | null>(null);
  const [lookupError, setLookupError] = useState("");
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [pickedBankCode, setPickedBankCode] = useState("");
  const [contacted, setContacted] = useState(false);

  async function runLookup(code: string) {
    setIfsc(code);
    setLookupError("");
    setIsLookingUp(true);
    try {
      const result = await lookupIfsc(code);
      setBranch(result);
    } catch (error) {
      setBranch(null);
      setLookupError(error instanceof Error ? error.message : "Couldn't look that up — check the code and try again.");
    } finally {
      setIsLookingUp(false);
    }
  }

  const pickedBank = bankDirectory.find((entry) => entry.code === pickedBankCode);

  return (
    <aside className="border border-line rounded-card bg-white p-5">
      <h2 className="text-lg font-bold text-ink">Do these in parallel</h2>
      <p className="mt-1 text-sm text-ink-muted">This app doesn't place calls or contact anyone for you — these are the actions to take yourself, right now.</p>
      <div className="mt-5 space-y-4">
        <div className="border border-line rounded-control p-4">
          <div className="flex items-start gap-3">
            <Icon className="mt-1 h-5 w-5 text-navy" name={called ? "check" : "phone"} />
            <div className="min-w-0 flex-1">
              <h3 className={`font-semibold transition-colors duration-200 ${called ? "text-ink-muted line-through" : "text-ink"}`}>Call 1930</h3>
              <p className="text-sm text-ink-muted">India&rsquo;s national cyber fraud helpline.</p>
              <div className="mt-3 flex items-center gap-2">
                <CallButton label="Call 1930" number="1930" />
                <button
                  className="focus-ring rounded-control border border-line px-3 py-2 text-sm font-semibold text-navy hover:bg-bg-subtle"
                  onClick={() => setCalled(true)}
                  type="button"
                >
                  {called ? "Marked called" : "Mark call attempted"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-line rounded-control p-4">
          <div className="flex items-start gap-3">
            <Icon className="mt-1 h-5 w-5 text-navy" name={contacted ? "check" : "bank"} />
            <div className="min-w-0 flex-1">
              <h3 className={`font-semibold transition-colors duration-200 ${contacted ? "text-ink-muted line-through" : "text-ink"}`}>Contact your bank</h3>

              <div className="mt-2 flex gap-1 rounded-control border border-line bg-bg-subtle p-1 text-sm">
                <button
                  className={`flex-1 rounded-input px-2 py-1.5 font-semibold transition-colors ${mode === "ifsc" ? "bg-white text-navy shadow-sm" : "text-ink-muted"}`}
                  onClick={() => setMode("ifsc")}
                  type="button"
                >
                  I know my IFSC
                </button>
                <button
                  className={`flex-1 rounded-input px-2 py-1.5 font-semibold transition-colors ${mode === "name" ? "bg-white text-navy shadow-sm" : "text-ink-muted"}`}
                  onClick={() => setMode("name")}
                  type="button"
                >
                  Just my bank name
                </button>
              </div>

              {mode === "ifsc" ? (
                <div className="mt-3">
                  <label className="block text-sm text-ink-muted" htmlFor="bankLookup">
                    Look up the receiving branch by IFSC code
                  </label>
                  <div className="mt-1 flex gap-2">
                    <input
                      className="focus-ring w-full rounded-input border border-line bg-white px-3 py-2 font-mono uppercase text-ink"
                      id="bankLookup"
                      maxLength={11}
                      onChange={(event) => setIfsc(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          runLookup(ifsc);
                        }
                      }}
                      placeholder="e.g. SBIN0000691"
                      value={ifsc}
                    />
                    <button
                      className="focus-ring shrink-0 rounded-control border border-line px-3 py-2 text-sm font-semibold text-navy hover:bg-bg-subtle disabled:opacity-50"
                      disabled={isLookingUp || !ifsc.trim()}
                      onClick={() => runLookup(ifsc)}
                      type="button"
                    >
                      {isLookingUp ? "Looking up…" : "Look up"}
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {exampleIfscCodes.map((code) => (
                      <button
                        className="focus-ring rounded-control border border-line px-2 py-1 font-mono text-xs text-ink-muted hover:bg-white"
                        key={code}
                        onClick={() => runLookup(code)}
                        type="button"
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                  {lookupError ? <p className="mt-2 text-sm font-medium text-error">{lookupError}</p> : null}
                  {branch ? (
                    <div className="mt-3 flex items-start justify-between gap-3 border border-line rounded-input bg-white p-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-ink">{branch.bankName}</p>
                        <p className="text-sm text-ink-muted">
                          {branch.branch} branch · {branch.city}, {branch.state}
                        </p>
                        {branch.contact ? (
                          <p className="mt-2 font-mono text-sm font-semibold text-navy">{branch.contact}</p>
                        ) : nationalHelplineFor(branch.bankCode) ? (
                          <>
                            <p className="mt-2 font-mono text-sm font-semibold text-navy">{nationalHelplineFor(branch.bankCode)}</p>
                            <p className="mt-1 text-xs text-ink-muted">
                              {branch.bankName}&rsquo;s national customer-care line — confirm it on the bank&rsquo;s site if you have any doubt.
                            </p>
                          </>
                        ) : (
                          <p className="mt-2 text-sm text-ink-muted">
                            No number on file for this bank yet — use the one on the back of your card or in your bank&rsquo;s app.
                          </p>
                        )}
                      </div>
                      {branch.contact || nationalHelplineFor(branch.bankCode) ? (
                        <CallButton number={branch.contact ?? (nationalHelplineFor(branch.bankCode) as string)} />
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="mt-3">
                  <label className="block text-sm text-ink-muted" htmlFor="bankPicker">
                    Which bank is this?
                  </label>
                  <select
                    className="focus-ring mt-1 w-full rounded-input border border-line bg-white px-3 py-2 text-ink"
                    id="bankPicker"
                    onChange={(event) => setPickedBankCode(event.target.value)}
                    value={pickedBankCode}
                  >
                    <option value="">Select a bank</option>
                    {bankDirectory.map((entry) => (
                      <option key={entry.code} value={entry.code}>
                        {entry.name}
                      </option>
                    ))}
                  </select>
                  {pickedBank ? (
                    <div className="mt-3 flex items-start justify-between gap-3 border border-line rounded-input bg-white p-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-ink">{pickedBank.name}</p>
                        {pickedBank.helpline ? (
                          <>
                            <p className="mt-2 font-mono text-sm font-semibold text-navy">{pickedBank.helpline}</p>
                            <p className="mt-1 text-xs text-ink-muted">National customer-care line — confirm it on the bank&rsquo;s site if you have any doubt.</p>
                          </>
                        ) : (
                          <p className="mt-2 text-sm text-ink-muted">
                            No number on file for this bank yet — use the one on the back of your card or in your bank&rsquo;s app.
                          </p>
                        )}
                      </div>
                      {pickedBank.helpline ? <CallButton number={pickedBank.helpline} /> : null}
                    </div>
                  ) : null}
                </div>
              )}

              <button
                className="focus-ring mt-3 rounded-control border border-line px-3 py-2 text-sm font-semibold text-navy hover:bg-bg-subtle"
                onClick={() => setContacted(true)}
                type="button"
              >
                {contacted ? "Marked contacted" : "Mark bank contacted"}
              </button>
            </div>
          </div>
        </div>
        <div className="border border-line rounded-control p-4">
          <div className="flex items-start gap-3">
            <Icon className="mt-1 h-5 w-5 text-navy" name={transactionId ? "check" : "file"} />
            <div className="min-w-0 flex-1">
              <label
                className={`font-semibold transition-colors duration-200 ${transactionId ? "text-ink-muted line-through" : "text-ink"}`}
                htmlFor="checklistTransactionId"
              >
                Keep transaction ID / UTR ready
              </label>
              <input
                className="focus-ring mt-2 w-full rounded-input border border-line bg-white px-3 py-2 font-mono text-ink"
                id="checklistTransactionId"
                onChange={(event) => onTransactionIdChange(event.target.value)}
                placeholder="Type once; form uses it"
                value={transactionId}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
