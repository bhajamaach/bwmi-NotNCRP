import { PageSection, PrimaryLink } from "@/components/ui";

export default function Helpline1930Page() {
  return (
    <PageSection className="max-w-3xl">
      <p className="text-sm font-medium text-navy">Resources</p>
      <h1 className="mt-2 text-3xl font-bold text-ink">Calling the 1930 helpline</h1>
      <p className="mt-4 text-ink-muted">
        1930 is the national helpline for reporting financial cyber fraud. Calling it quickly, alongside contacting
        your bank, can improve the chance of stopping further movement of funds — this is why the Golden Hour flow
        surfaces it as a parallel action rather than a step to finish before filing.
      </p>
      <div className="mt-6 space-y-4 rounded-card border border-line bg-white p-5">
        <div>
          <p className="text-sm font-semibold text-ink">Before you call</p>
          <p className="mt-1 text-sm text-ink-muted">Keep ready: the transaction ID / UTR, the approximate amount, and the date and time of the transaction.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">What the helpline can do</p>
          <p className="mt-1 text-sm text-ink-muted">
            Flag the transaction to the payment channel involved so it can attempt to hold or trace the funds. It does
            not replace filing a complaint — you still need to file one, in parallel.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">One thing to know</p>
          <p className="mt-1 text-sm text-ink-muted">
            Marking "Call 1930" as done in the Golden Hour checklist only tracks the step for you — you still need to dial 1930 yourself.
          </p>
        </div>
      </div>
      <div className="mt-6">
        <PrimaryLink href="/report/urgent">Go to the Golden Hour flow</PrimaryLink>
      </div>
    </PageSection>
  );
}
