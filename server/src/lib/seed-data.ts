import type { Complaint, DemoUser, GrievancePetition } from "./types";

const now = new Date();
const hoursAgo = (hours: number) => new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString();
const hoursFromNow = (hours: number) => new Date(now.getTime() + hours * 60 * 60 * 1000).toISOString();

export const demoUsers: DemoUser[] = [
  {
    id: "user-demo-active",
    name: "Kanishka Das",
    mobile: "9000000001",
    isDemo: true
  },
  {
    id: "user-demo-empty",
    name: "Nancy Shilal",
    mobile: "9000000002",
    isDemo: true
  }
];

export const seededComplaints: Complaint[] = [
  {
    id: "cmp-new-financial",
    ackNumber: "NCRP-2026-08-120481",
    userId: "user-demo-active",
    category: "Financial Fraud",
    subCategory: "UPI fraud",
    isUrgent: true,
    description:
      "A caller pretending to be bank support convinced me to approve a UPI collect request and money left my account immediately.",
    incidentAt: hoursAgo(3),
    amount: 18500,
    transactionId: "UTR908172635441",
    status: "RECEIVED",
    statusHistory: [
      {
        status: "RECEIVED",
        timestamp: hoursAgo(2),
        note: "Your complaint has been received and the acknowledgement number is active."
      }
    ],
    slaDeadline: hoursFromNow(70),
    escalated: false,
    createdAt: hoursAgo(2),
    lienAmount: 18500,
    accountBalanceAtRisk: 64200
  },
  {
    id: "cmp-investigating",
    ackNumber: "NCRP-2026-08-118204",
    userId: "user-demo-active",
    category: "Account or Device Compromise",
    subCategory: "Account hacking",
    isUrgent: false,
    description:
      "My email account was accessed without permission and password reset messages appeared for multiple services connected to it.",
    incidentAt: hoursAgo(92),
    status: "INVESTIGATING",
    statusHistory: [
      {
        status: "RECEIVED",
        timestamp: hoursAgo(88),
        note: "Your complaint has been received."
      },
      {
        status: "ASSIGNED",
        timestamp: hoursAgo(70),
        note: "The complaint has been assigned to the cyber cell for review."
      },
      {
        status: "INVESTIGATING",
        timestamp: hoursAgo(24),
        note: "The cyber cell is reviewing the account access details you provided."
      }
    ],
    slaDeadline: hoursFromNow(8),
    escalated: false,
    createdAt: hoursAgo(88)
  },
  {
    id: "cmp-sla-passed",
    ackNumber: "NCRP-2026-08-109776",
    userId: "user-demo-active",
    category: "Financial Fraud",
    subCategory: "Investment scam",
    isUrgent: false,
    description:
      "I transferred money to a fake investment platform after seeing forged returns in the app dashboard and then withdrawals were blocked.",
    incidentAt: hoursAgo(190),
    amount: 72000,
    transactionId: "UTR661209745802",
    status: "ASSIGNED",
    statusHistory: [
      {
        status: "RECEIVED",
        timestamp: hoursAgo(170),
        note: "Your complaint has been received."
      },
      {
        status: "ASSIGNED",
        timestamp: hoursAgo(150),
        note: "The complaint was assigned to the relevant cyber cell."
      }
    ],
    slaDeadline: hoursAgo(78),
    escalated: false,
    createdAt: hoursAgo(170)
  }
];

export const seededGrievances: GrievancePetition[] = [
  {
    id: "grm-seed-1",
    petitionNumber: "GRM-20260819-40217",
    userId: "user-demo-active",
    accountNumber: "XXXXXXXX4821",
    reason:
      "Received payment for a legitimate marketplace sale; account was frozen after the buyer's funds were later flagged in an unrelated fraud case.",
    evidence: [{ name: "sale_invoice.pdf", size: 184320, type: "application/pdf" }],
    stage: "KYC_SCHEDULED",
    kycSlot: "Thu, 11:00 AM",
    createdAt: hoursAgo(30),
    stageHistory: [
      { stage: "SUBMITTED", timestamp: hoursAgo(30), note: "Petition submitted with proof of legitimacy." },
      { stage: "KYC_SCHEDULED", timestamp: hoursAgo(28), note: "Video-KYC slot booked for Thu, 11:00 AM." }
    ]
  }
];
