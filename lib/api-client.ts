import type { Complaint, ComplaintDraft, ComplaintStatus, DemoUser, EvidenceFile, GrievancePetition } from "@/lib/types";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers }
  });
  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export const api = {
  getUsers: () => request<DemoUser[]>("/api/users"),
  getComplaints: (userId?: string) => request<Complaint[]>(`/api/complaints${userId ? `?userId=${encodeURIComponent(userId)}` : ""}`),
  createComplaint: (draft: ComplaintDraft, requestedUserId: string) =>
    request<Complaint>("/api/complaints", { method: "POST", body: JSON.stringify({ ...draft, requestedUserId }) }),
  updateComplaintStatus: (id: string, status: ComplaintStatus, note: string) =>
    request<Complaint>(`/api/complaints/${id}/status`, { method: "PATCH", body: JSON.stringify({ status, note }) }),
  escalateComplaint: (id: string) => request<Complaint>(`/api/complaints/${id}/escalate`, { method: "POST" }),
  addComplaintNote: (id: string, note: string) =>
    request<Complaint>(`/api/complaints/${id}/notes`, { method: "POST", body: JSON.stringify({ note }) }),
  getGrievances: (userId?: string) => request<GrievancePetition[]>(`/api/grievances${userId ? `?userId=${encodeURIComponent(userId)}` : ""}`),
  createGrievance: (input: { accountNumber: string; reason: string; evidence: EvidenceFile[] }, requestedUserId: string) =>
    request<GrievancePetition>("/api/grievances", { method: "POST", body: JSON.stringify({ ...input, requestedUserId }) }),
  scheduleKycSlot: (id: string, slot: string) =>
    request<GrievancePetition>(`/api/grievances/${id}/kyc-slot`, { method: "POST", body: JSON.stringify({ slot }) }),
  advanceGrievance: (id: string, note: string) =>
    request<GrievancePetition>(`/api/grievances/${id}/advance`, { method: "POST", body: JSON.stringify({ note }) })
};
