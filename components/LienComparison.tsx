import type { Complaint } from "@/lib/types";

export function LienComparison({ complaint }: { complaint: Complaint }) {
  if (!complaint.lienAmount || !complaint.accountBalanceAtRisk) return null;

  const lienShare = Math.max(6, Math.min(100, (complaint.lienAmount / complaint.accountBalanceAtRisk) * 100));
  const untouched = complaint.accountBalanceAtRisk - complaint.lienAmount;

  return (
    <div className="border border-line rounded-card bg-white p-5">
      <h2 className="font-bold text-ink">Financial lien</h2>
      <p className="mt-1 text-sm text-ink-muted">
        Only the disputed amount is held, instead of freezing the whole receiving account.
      </p>
      <div className="mt-4 grid gap-3">
        <div className="border border-line-strong border-dashed rounded-control p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">A blanket freeze would have held</p>
          <div className="mt-2 h-7 w-full overflow-hidden rounded-input bg-bg-subtle">
            <div className="flex h-full items-center bg-urgent px-2 font-mono text-xs font-semibold text-white" style={{ width: "100%" }}>
              Rs. {complaint.accountBalanceAtRisk.toLocaleString("en-IN")} frozen
            </div>
          </div>
        </div>
        <div className="border border-line-bold rounded-control p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal">What actually happened here</p>
          <div className="mt-2 h-7 w-full overflow-hidden rounded-input bg-bg-subtle">
            <div
              className="flex h-full items-center bg-navy px-2 font-mono text-xs font-semibold text-white"
              style={{ width: `${lienShare}%` }}
            >
              Rs. {complaint.lienAmount.toLocaleString("en-IN")}
            </div>
          </div>
          <p className="mt-2 text-sm text-ink-muted">
            Only the disputed amount is held. Rs. {untouched.toLocaleString("en-IN")} of the receiving account stays usable by its holder
            while the complaint is investigated.
          </p>
        </div>
      </div>
    </div>
  );
}
