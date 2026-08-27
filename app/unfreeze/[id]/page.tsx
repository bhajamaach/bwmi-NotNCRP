"use client";

import { useParams } from "next/navigation";
import { GrievanceTimeline } from "@/components/GrievanceTimeline";
import { Icon } from "@/components/Icon";
import { useMockData } from "@/components/MockDataProvider";
import { FieldChip, PageSection, PrimaryLink, SecondaryLink } from "@/components/ui";
import { kycSlots } from "@/lib/grievance";

export default function GrievanceDetailPage() {
  const params = useParams<{ id: string }>();
  const { grievances, scheduleKycSlot } = useMockData();
  const petition = grievances.find((item) => item.id === params.id);

  if (!petition) {
    return (
      <PageSection>
        <div className="border border-line rounded-card bg-white p-6">
          <h1 className="text-2xl font-bold text-ink">Petition not found</h1>
          <p className="mt-2 text-ink-muted">
            This can happen if your browser data was cleared, or the link is from a different browser or device.
          </p>
          <div className="mt-5">
            <PrimaryLink href="/unfreeze">Start a new petition</PrimaryLink>
          </div>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection>
      <SecondaryLink className="!px-3 !py-2" href="/track">
        Back to dashboard
      </SecondaryLink>
      <div className="mt-4 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <section className="border border-line rounded-card bg-white p-5">
          <FieldChip>{petition.petitionNumber}</FieldChip>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-ink">Account ending {petition.accountNumber.slice(-4)}</h1>
          <p className="mt-2 text-ink-muted">{petition.reason}</p>
          <div className="mt-6">
            <GrievanceTimeline petition={petition} />
          </div>
        </section>
        <aside className="grid gap-4">
          {petition.stage === "SUBMITTED" ? (
            <div className="border border-line rounded-card bg-white p-5">
              <h2 className="font-bold text-ink">Book your video-KYC slot</h2>
              <p className="mt-1 text-sm text-ink-muted">
                Pick a remote verification time with an investigating officer to move your petition forward.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {kycSlots.map((slot) => (
                  <button
                    className="focus-ring rounded-control border border-line px-3 py-2 text-sm font-semibold text-navy hover:bg-bg-subtle"
                    key={slot}
                    onClick={() => scheduleKycSlot(petition.id, slot)}
                    type="button"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          {petition.stage === "KYC_SCHEDULED" && petition.kycSlot ? (
            <div className="flex items-start gap-3 border border-line border-l-4 border-l-navy rounded-card bg-white p-5">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-navy" name="video" />
              <div>
                <h2 className="font-bold text-ink">Video-KYC booked</h2>
                <p className="mt-1 text-sm text-ink-muted">
                  Slot: <span className="font-mono">{petition.kycSlot}</span>. An officer will review your case afterward — no further
                  action needed from you here.
                </p>
              </div>
            </div>
          ) : null}
          {petition.stage === "IO_REVIEW" ? (
            <div className="flex items-start gap-3 border border-line border-l-4 border-l-amber rounded-card bg-white p-5">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-amber" name="clock" />
              <div>
                <h2 className="font-bold text-ink">Under officer review</h2>
                <p className="mt-1 text-sm text-ink-muted">Your video-KYC session is complete. The investigating officer is reviewing your evidence.</p>
              </div>
            </div>
          ) : null}
          {petition.stage === "NOC_ISSUED" ? (
            <div className="flex items-start gap-3 border border-line border-l-4 border-l-teal rounded-card bg-white p-5">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-teal" name="unlock" />
              <div>
                <h2 className="font-bold text-teal">NOC issued — lien released</h2>
                <p className="mt-1 text-sm text-ink-muted">
                  A digitally signed No Objection Certificate was sent to your bank via API. The hold on this account has been released.
                </p>
              </div>
            </div>
          ) : null}
          <div className="border border-line rounded-card bg-white p-5">
            <h2 className="font-bold text-ink">Evidence submitted</h2>
            <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
              {petition.evidence.map((file) => (
                <li className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5" key={`${file.name}-${file.size}`}>
                  <span className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-navy" name="file" />
                    {file.name}
                  </span>
                  {file.hash ? (
                    <span className="font-mono text-xs text-teal" title={`SHA-256: ${file.hash}`}>
                      SHA-256 {file.hash.slice(0, 12)}&hellip;
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </PageSection>
  );
}
