"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { generatePetitionNumber, grievanceStageLabel, nextGrievanceStage } from "@/lib/grievance";
import { buildSlaDeadline } from "@/lib/sla-config";
import { demoUsers, seededComplaints, seededGrievances } from "@/lib/seed-data";
import type {
  Complaint,
  ComplaintDraft,
  ComplaintStatus,
  DemoUser,
  EvidenceFile,
  GrievancePetition,
  GrievanceStage
} from "@/lib/types";

interface MockDataContextValue {
  currentUser: DemoUser | null;
  complaints: Complaint[];
  grievances: GrievancePetition[];
  isLoaded: boolean;
  loginAs: (userId: string) => void;
  logout: () => void;
  createComplaint: (draft: ComplaintDraft) => Complaint;
  updateStatus: (id: string, status: ComplaintStatus, note: string) => void;
  markEscalated: (id: string) => void;
  addCitizenNote: (id: string, note: string) => void;
  createGrievance: (input: { accountNumber: string; reason: string; evidence: EvidenceFile[] }) => GrievancePetition;
  scheduleKycSlot: (id: string, slot: string) => void;
  advanceGrievance: (id: string, note: string) => void;
}

const MockDataContext = createContext<MockDataContextValue | null>(null);
const STORAGE_KEY = "ncrp-prototype-state-v1";

function generateAckNumber() {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replaceAll("-", "");
  const random = Math.floor(100000 + Math.random() * 900000);
  return `NCRP-${datePart}-${random}`;
}

function generateComplaintId() {
  return `cmp-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function generateGrievanceId() {
  return `grm-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function MockDataProvider({ children }: { children: React.ReactNode }) {
  const [complaints, setComplaints] = useState<Complaint[]>(seededComplaints);
  const [grievances, setGrievances] = useState<GrievancePetition[]>(seededGrievances);
  const [currentUser, setCurrentUser] = useState<DemoUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as {
          complaints: Complaint[];
          grievances?: GrievancePetition[];
          userId?: string;
        };
        setComplaints(Array.isArray(parsed.complaints) ? parsed.complaints : seededComplaints);
        setGrievances(Array.isArray(parsed.grievances) ? parsed.grievances : seededGrievances);
        setCurrentUser(demoUsers.find((user) => user.id === parsed.userId) ?? null);
      } catch {
        setComplaints(seededComplaints);
        setGrievances(seededGrievances);
      }
    }
    const timer = window.setTimeout(() => setIsLoaded(true), 350);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ complaints, grievances, userId: currentUser?.id })
    );
  }, [complaints, grievances, currentUser, isLoaded]);

  const value = useMemo<MockDataContextValue>(
    () => ({
      currentUser,
      complaints,
      grievances,
      isLoaded,
      loginAs: (userId) => {
        setCurrentUser(demoUsers.find((user) => user.id === userId) ?? null);
      },
      logout: () => setCurrentUser(null),
      createComplaint: (draft) => {
        const createdAt = new Date();
        const userId = draft.isAnonymous ? "anonymous" : currentUser?.id ?? "user-demo-active";
        const isFinancialLien = draft.isUrgent && typeof draft.amount === "number" && draft.amount > 0;
        const complaint: Complaint = {
          ...draft,
          id: generateComplaintId(),
          ackNumber: generateAckNumber(),
          userId,
          status: "RECEIVED",
          statusHistory: [
            {
              status: "RECEIVED",
              timestamp: createdAt.toISOString(),
              note: "Your complaint has been received and the acknowledgement number is active."
            }
          ],
          slaDeadline: buildSlaDeadline(draft.category, createdAt),
          escalated: false,
          createdAt: createdAt.toISOString(),
          // Illustrative only: models the proportional-lien concept against a plausible
          // full balance, contrasted with the legacy blanket-freeze behaviour on /track/[id].
          lienAmount: isFinancialLien ? draft.amount : undefined,
          accountBalanceAtRisk: isFinancialLien
            ? (draft.amount as number) + Math.floor(20000 + Math.random() * 60000)
            : undefined
        };
        setComplaints((items) => [complaint, ...items]);
        return complaint;
      },
      updateStatus: (id, status, note) => {
        setComplaints((items) =>
          items.map((complaint) =>
            complaint.id === id
              ? {
                  ...complaint,
                  status,
                  statusHistory: [
                    ...complaint.statusHistory,
                    { status, note, timestamp: new Date().toISOString() }
                  ]
                }
              : complaint
          )
        );
      },
      markEscalated: (id) => {
        setComplaints((items) =>
          items.map((complaint) =>
            complaint.id === id ? { ...complaint, escalated: true } : complaint
          )
        );
      },
      addCitizenNote: (id, note) => {
        setComplaints((items) =>
          items.map((complaint) =>
            complaint.id === id
              ? {
                  ...complaint,
                  citizenNotes: [
                    ...(complaint.citizenNotes ?? []),
                    { timestamp: new Date().toISOString(), note }
                  ]
                }
              : complaint
          )
        );
      },
      createGrievance: ({ accountNumber, reason, evidence }) => {
        const createdAt = new Date();
        const userId = currentUser?.id ?? "user-demo-active";
        const petition: GrievancePetition = {
          id: generateGrievanceId(),
          petitionNumber: generatePetitionNumber(),
          userId,
          accountNumber,
          reason,
          evidence,
          stage: "SUBMITTED",
          createdAt: createdAt.toISOString(),
          stageHistory: [
            {
              stage: "SUBMITTED",
              timestamp: createdAt.toISOString(),
              note: "Petition submitted with proof of legitimacy."
            }
          ]
        };
        setGrievances((items) => [petition, ...items]);
        return petition;
      },
      scheduleKycSlot: (id, slot) => {
        setGrievances((items) =>
          items.map((petition) =>
            petition.id === id
              ? {
                  ...petition,
                  kycSlot: slot,
                  stage: "KYC_SCHEDULED",
                  stageHistory: [
                    ...petition.stageHistory,
                    {
                      stage: "KYC_SCHEDULED",
                      timestamp: new Date().toISOString(),
                      note: `Video-KYC slot booked for ${slot}.`
                    }
                  ]
                }
              : petition
          )
        );
      },
      advanceGrievance: (id, note) => {
        setGrievances((items) =>
          items.map((petition) => {
            if (petition.id !== id) return petition;
            const stage: GrievanceStage = nextGrievanceStage[petition.stage];
            return {
              ...petition,
              stage,
              stageHistory: [...petition.stageHistory, { stage, timestamp: new Date().toISOString(), note }]
            };
          })
        );
      }
    }),
    [complaints, grievances, currentUser, isLoaded]
  );

  return <MockDataContext.Provider value={value}>{children}</MockDataContext.Provider>;
}

export function useMockData() {
  const context = useContext(MockDataContext);
  if (!context) {
    throw new Error("useMockData must be used inside MockDataProvider");
  }
  return context;
}
