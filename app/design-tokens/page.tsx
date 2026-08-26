import { PageSection } from "@/components/ui";

const colorTokens: { name: string; className: string; note: string }[] = [
  { name: "Navy (primary)", className: "bg-navy", note: "Primary actions, headers, active states" },
  { name: "Navy hover", className: "bg-navy-hover", note: "Hover/active state of navy" },
  { name: "Urgent / danger", className: "bg-urgent", note: "Golden Hour context only — never decorative" },
  { name: "Error", className: "bg-error", note: "General form/validation errors" },
  { name: "Amber", className: "bg-amber", note: "Escalation / attention states" },
  { name: "Teal (success)", className: "bg-teal", note: "Resolved / positive status" },
  { name: "Background", className: "bg-bg border border-line", note: "Warm off-white page background" },
  { name: "Background subtle", className: "bg-bg-subtle border border-line", note: "Card/section background" },
  { name: "Ink (text)", className: "bg-ink", note: "Off-black body text" },
  { name: "Ink muted", className: "bg-ink-muted", note: "Secondary text" },
  { name: "Line", className: "bg-line", note: "Hairline card borders" },
  { name: "Line strong", className: "bg-line-strong", note: "Emphasized borders/badges" }
];

const typeScale = [
  { label: "Display", className: "text-3xl font-semibold" },
  { label: "Heading", className: "text-2xl font-semibold" },
  { label: "Subheading", className: "text-lg font-medium" },
  { label: "Body", className: "text-base font-normal" },
  { label: "Small / caption", className: "text-sm font-normal" }
];

export default function DesignTokensPage() {
  return (
    <PageSection>
      <h1 className="text-2xl font-semibold text-ink">Design tokens</h1>
      <p className="mt-2 max-w-2xl text-ink-muted">
        Reference sheet for the color palette, type scale, and radius tokens defined in{" "}
        <code className="font-mono text-sm">tailwind.config.ts</code> and{" "}
        <code className="font-mono text-sm">globals.css</code>. No component should use a hardcoded hex value or
        px font size outside this set.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-ink">Color</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {colorTokens.map((token) => (
          <div className="rounded-card border border-line bg-white p-4" key={token.name}>
            <div className={`h-12 w-full rounded-control ${token.className}`} />
            <p className="mt-3 text-sm font-semibold text-ink">{token.name}</p>
            <p className="text-sm text-ink-muted">{token.note}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold text-ink">Type scale</h2>
      <div className="mt-4 divide-y divide-line rounded-card border border-line bg-white">
        {typeScale.map((row) => (
          <div className="flex items-baseline justify-between gap-4 p-4" key={row.label}>
            <span className={`${row.className} text-ink`}>{row.label} — Report a cybercrime</span>
            <span className="shrink-0 font-mono text-sm text-ink-muted">{row.className}</span>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold text-ink">Corner radius</h2>
      <div className="mt-4 flex flex-wrap gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="h-16 w-16 rounded-input border border-line-strong bg-bg-subtle" />
          <span className="font-mono text-sm text-ink-muted">rounded-input (8px)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-16 w-16 rounded-control border border-line-strong bg-bg-subtle" />
          <span className="font-mono text-sm text-ink-muted">rounded-control (10px)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-16 w-16 rounded-card border border-line-strong bg-bg-subtle" />
          <span className="font-mono text-sm text-ink-muted">rounded-card (12px)</span>
        </div>
      </div>
    </PageSection>
  );
}
