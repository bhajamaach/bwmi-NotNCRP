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
  lienAmount?: number;
  accountBalanceAtRisk?: number;
  isAnonymous?: boolean;
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
