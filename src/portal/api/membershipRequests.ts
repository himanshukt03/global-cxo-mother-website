import { apiFetch } from '@/portal/api/client';

export interface MembershipRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  linkedin: string | null;
  company: string;
  role: string;
  about_me: string | null;
  tier: string;
  status: string;
  linked_intent_request_id: string | null;
  created_at: string;
  reviewed_at: string | null;
}

export function listMembershipRequestsApi(statusFilter?: string) {
  const params = statusFilter ? `?status_filter=${statusFilter}` : '';
  return apiFetch<MembershipRequest[]>(`/admin/membership-requests${params}`);
}

export function updateMembershipRequestApi(id: string, body: { status: string }) {
  return apiFetch<MembershipRequest>(`/admin/membership-requests/${id}`, { method: 'PATCH', body });
}

export function createMembershipRequestApi(body: {
  name: string; email: string; phone?: string; linkedin?: string;
  company: string; role: string; about_me?: string; tier: string;
  source?: string; created_at?: string;
}) {
  return apiFetch<MembershipRequest>('/membership-requests', { method: 'POST', body, skipAuthHeader: true });
}

