import { PageSection } from "@/components/ui";

const faqs = [
  {
    q: "Is this the official cybercrime reporting portal?",
    a: "No. NotNCRP is an independent project, not affiliated with or endorsed by cybercrime.gov.in or any government body."
  },
  {
    q: "Why does the app ask about urgency before anything else?",
    a: "Active financial fraud and an older complaint need different handling. Recognizing urgency first routes you to the Golden Hour flow, where guidance and filing happen in parallel instead of one long form."
  },
  {
    q: "What happens after I submit a complaint?",
    a: "You get an acknowledgement number immediately and are taken straight to the complaint's timeline, where you can see its current stage and any escalation."
  },
  {
    q: "What does the SLA and escalation mean?",
    a: "Each complaint has an expected resolution window for its category. If that window passes without the complaint moving forward, an escalation option appears on the complaint's detail page."
  },
  {
    q: "Where is my data stored?",
    a: "Locally, in your browser. Login, bank contact, 1930, and complaint data stay on this device and aren't sent anywhere."
  }
];

export default function FaqPage() {
  return (
    <PageSection className="max-w-3xl">
      <p className="text-sm font-medium text-navy">Resources</p>
      <h1 className="mt-2 text-3xl font-bold text-ink">Frequently asked questions</h1>
      <div className="mt-6 divide-y divide-line rounded-card border border-line bg-white">
        {faqs.map((item) => (
          <details className="group p-5" key={item.q}>
            <summary className="focus-ring cursor-pointer list-none font-semibold text-ink">{item.q}</summary>
            <p className="mt-2 text-sm text-ink-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </PageSection>
  );
}
