import { Icon } from "@/components/Icon";
import { PrimaryLink } from "@/components/ui";

export function EmptyState() {
  return (
    <div className="border border-line rounded-card bg-white p-8 text-center">
      <Icon className="mx-auto h-8 w-8 text-ink-muted" name="file" />
      <h2 className="mt-3 text-xl font-bold text-ink">No complaints yet</h2>
      <p className="mx-auto mt-2 max-w-xl text-ink-muted">Complaints you file will show up here.</p>
      <div className="mt-5">
        <PrimaryLink href="/">Start a report</PrimaryLink>
      </div>
    </div>
  );
}
