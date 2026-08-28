export type ComplaintStatus =
  | "RECEIVED"
  | "ASSIGNED"
  | "BANK_NOTIFIED"
  | "INVESTIGATING"
  | "RESOLVED";

export interface StatusUpdate {
  status: ComplaintStatus;
  timestamp: string;
  note: string;
}

export interface ThreadMessage {
  id: string;
  from: "citizen" | "cyberCell";
  text: string;
  timestamp: string;
}

export interface EvidenceFile {
  name: string;
  size: number;
  type: string;
  hash?: string;
  hashedAt?: string;
}

export interface Complaint {
  id: string;
  ackNumber: string;
  userId: string;
  category: string;
  subCategory: string;
  isUrgent: boolean;
  description: string;
  incidentAt: string;
  amount?: number;
  transactionId?: string;
  evidence?: EvidenceFile[];
  status: ComplaintStatus;
  statusHistory: StatusUpdate[];
  slaDeadline: string;
  escalated: boolean;
  createdAt: string;
  citizenNotes?: { timestamp: string; note: string }[];
  /** Only set for urgent financial-fraud complaints — the amount actually held. */
  lienAmount?: number;
  /** Mocked full balance the legacy blanket-freeze approach would have locked instead. */
  accountBalanceAtRisk?: number;
  /** Women/Child-safety reports filed without attaching an account — no citizen dashboard entry. */
  isAnonymous?: boolean;
  /** Shared two-way thread with Cyber Cell, visible to both sides once the complaint is past RECEIVED. */
  messages?: ThreadMessage[];
}

export type GrievanceStage = "SUBMITTED" | "KYC_SCHEDULED" | "IO_REVIEW" | "NOC_ISSUED";

export interface GrievancePetition {
  id: string;
  petitionNumber: string;
  userId: string;
  accountNumber: string;
  reason: string;
  evidence: EvidenceFile[];
  stage: GrievanceStage;
  kycSlot?: string;
  createdAt: string;
  stageHistory: { stage: GrievanceStage; timestamp: string; note: string }[];
}

export interface SuspectRecord {
  id: string;
  identifierType: "UPI VPA" | "Phone number" | "Bank account" | "Email";
  value: string;
  flaggedFor: string;
  flaggedOn: string;
}

export interface DemoUser {
  id: string;
  name: string;
  mobile: string;
  isDemo: boolean;
}

export interface ComplaintDraft {
  category: string;
  subCategory: string;
  isUrgent: boolean;
  description: string;
  incidentAt: string;
  amount?: number;
  transactionId?: string;
  evidence?: EvidenceFile[];
  isAnonymous?: boolean;
}

export interface CategoryChoice {
  id: string;
  label: string;
  description: string;
  category: string;
  subCategory: string;
}
