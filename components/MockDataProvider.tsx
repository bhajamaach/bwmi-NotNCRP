"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api-client";
import { demoUsers as fallbackDemoUsers, seededComplaints, seededGrievances } from "@/lib/seed-data";
import type {
  Complaint,
  ComplaintDraft,
  ComplaintStatus,
  DemoUser,
  EvidenceFile,
  GrievancePetition,
  ThreadMessage
} from "@/lib/types";

interface MockDataContextValue {
  currentUser: DemoUser | null;
  demoUsers: DemoUser[];
  complaints: Complaint[];
  grievances: GrievancePetition[];
  isLoaded: boolean;
  /** Set only if the backend was unreachable and the app fell back to local seed data. */
  loadError: string | null;
  retryLoad: () => void;
  loginAs: (userId: string) => void;
  logout: () => void;
  createComplaint: (draft: ComplaintDraft) => Promise<Complaint>;
  updateStatus: (id: string, status: ComplaintStatus, note: string) => Promise<void>;
  markEscalated: (id: string) => Promise<void>;
  addCitizenNote: (id: string, note: string) => Promise<void>;
  createGrievance: (input: { accountNumber: string; reason: string; evidence: EvidenceFile[] }) => Promise<GrievancePetition>;
  scheduleKycSlot: (id: string, slot: string) => Promise<void>;
  advanceGrievance: (id: string, note: string) => Promise<void>;
  sendMessage: (id: string, from: ThreadMessage["from"], text: string) => Promise<void>;
  /** Links an anonymous complaint to a real account (mobile + demo OTP) and signs the filer in as that account. */
  claimComplaint: (id: string, mobile: string, otp: string) => Promise<{ ok: true } | { ok: false; error: string }>;
}

const MockDataContext = createContext<MockDataContextValue | null>(null);
const SESSION_STORAGE_KEY = "ncrp-prototype-session-v1";

export function MockDataProvider({ children }: { children: React.ReactNode }) {
  const [demoUsers, setDemoUsers] = useState<DemoUser[]>(fallbackDemoUsers);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [grievances, setGrievances] = useState<GrievancePetition[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    setCurrentUserId(window.localStorage.getItem(SESSION_STORAGE_KEY));
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoaded(false);
      try {
        const [users, fetchedComplaints, fetchedGrievances] = await Promise.all([
          api.getUsers(),
          api.getComplaints(),
          api.getGrievances()
        ]);
        if (cancelled) return;
        setDemoUsers(users);
        setComplaints(fetchedComplaints);
        setGrievances(fetchedGrievances);
        setLoadError(null);
      } catch {
        if (cancelled) return;
        setComplaints(seededComplaints);
        setGrievances(seededGrievances);
        setDemoUsers(fallbackDemoUsers);
        setLoadError("Couldn't reach the tracking service — showing local seed data until it's back.");
      } finally {
        if (!cancelled) setIsLoaded(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const currentUser = useMemo(() => demoUsers.find((user) => user.id === currentUserId) ?? null, [demoUsers, currentUserId]);

  const value = useMemo<MockDataContextValue>(
    () => ({
      currentUser,
      demoUsers,
      complaints,
      grievances,
      isLoaded,
      loadError,
      retryLoad: () => setReloadToken((token) => token + 1),
      loginAs: (userId) => {
        setCurrentUserId(userId);
        window.localStorage.setItem(SESSION_STORAGE_KEY, userId);
      },
      logout: () => {
        setCurrentUserId(null);
        window.localStorage.removeItem(SESSION_STORAGE_KEY);
      },
      createComplaint: async (draft) => {
        const complaint = await api.createComplaint(draft, currentUser?.id ?? "user-demo-active");
        setComplaints((items) => [complaint, ...items]);
        return complaint;
      },
      updateStatus: async (id, status, note) => {
        const updated = await api.updateComplaintStatus(id, status, note);
        setComplaints((items) => items.map((complaint) => (complaint.id === id ? updated : complaint)));
      },
      markEscalated: async (id) => {
        const updated = await api.escalateComplaint(id);
        setComplaints((items) => items.map((complaint) => (complaint.id === id ? updated : complaint)));
      },
      addCitizenNote: async (id, note) => {
        const updated = await api.addComplaintNote(id, note);
        setComplaints((items) => items.map((complaint) => (complaint.id === id ? updated : complaint)));
      },
      createGrievance: async ({ accountNumber, reason, evidence }) => {
        const petition = await api.createGrievance({ accountNumber, reason, evidence }, currentUser?.id ?? "user-demo-active");
        setGrievances((items) => [petition, ...items]);
        return petition;
      },
      scheduleKycSlot: async (id, slot) => {
        const updated = await api.scheduleKycSlot(id, slot);
        setGrievances((items) => items.map((petition) => (petition.id === id ? updated : petition)));
      },
      advanceGrievance: async (id, note) => {
        const updated = await api.advanceGrievance(id, note);
        setGrievances((items) => items.map((petition) => (petition.id === id ? updated : petition)));
      },
      sendMessage: async (id, from, text) => {
        const updated = await api.sendMessage(id, from, text);
        setComplaints((items) => items.map((complaint) => (complaint.id === id ? updated : complaint)));
      },
      claimComplaint: async (id, mobile, otp) => {
        const result = await api.claimComplaint(id, mobile, otp);
        if (!result.ok) return result;
        setComplaints((items) => items.map((complaint) => (complaint.id === id ? result.complaint : complaint)));
        const user = demoUsers.find((item) => item.mobile === mobile.trim());
        if (user) {
          setCurrentUserId(user.id);
          window.localStorage.setItem(SESSION_STORAGE_KEY, user.id);
        }
        return { ok: true };
      }
    }),
    [currentUser, demoUsers, complaints, grievances, isLoaded, loadError]
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
