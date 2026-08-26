import { Icon } from "@/components/Icon";
import type { Complaint } from "@/lib/types";

export function FundRestorationCard({ complaint }: { complaint: Complaint }) {
  if (!complaint.lienAmount || complaint.status !== "RESOLVED") return null;

  return (
    <div className="flex items-start gap-3 border border-line border-l-4 border-l-teal rounded-card bg-white p-5">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-teal" name="unlock" />
      <div>
        <h2 className="font-bold text-teal">Funds restored</h2>
        <p className="mt-1 text-sm text-ink-muted">
          The held amount of Rs. {complaint.lienAmount.toLocaleString("en-IN")} moved from the beneficiary bank into escrow while the
          complaint was investigated, and has now been disbursed back to your account under court order.
        </p>
      </div>
    </div>
  );
}
