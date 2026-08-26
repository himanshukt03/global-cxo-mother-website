/** Wire format from FastAPI `EventRead` (snake_case). */
export interface ApiEventJson {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  date_start: string;
  date_end: string;
  location: string;
  description: string;
  overview: string;
  hero_image: string;
  banner_image: string;
  registration_open: boolean;
  lifecycle_status: string;
  luma_event_url: string | null;
  gallery_url: string | null;
  visibility_setting: Record<string, unknown>;
  event_metadata: Record<string, unknown>;
  venue: Record<string, unknown>;
  cta_config: Record<string, unknown> | null;
  speakers_json: unknown[] | null;
  sponsors_json: unknown[] | null;
  itinerary_json: unknown[] | null;
  created_at: string;
  updated_at: string;
}

export interface ApiStartupJson {
  id: string;
  company_name: string;
  company_website: string;
  company_domain: string;
  description: string;
  logo_url: string | null;
  registered_by_id: string;
  is_verified: boolean;
  custom_fields: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ApiEventRegistrationJson {
  id: string;
  user_id: string;
  event_id: string;
  startup_id: string | null;
  status: string;
  registered_at: string;
}

export interface ApiEventDeleteImpactJson {
  deleted_event_id: string;
  slug: string;
  title: string;
  registration_count: number;
  event_session_count: number;
  meeting_request_count: number;
  scheduled_meeting_count: number;
  luma_record_count: number;
  cancellation_email_count: number;
}

export interface ApiEventDeleteResultJson {
  deleted_event_id: string;
  slug: string;
  title: string;
  registration_count: number;
  event_session_count: number;
  meeting_request_count: number;
  scheduled_meeting_count: number;
  luma_record_count: number;
  queued_email_count: number;
}

export interface ApiUserStartupLinkJson {
  id: string;
  user_id: string;
  startup_id: string;
  link_role: string;
  linked_at: string;
}

export interface ApiTaskJson {
  id: string;
  title: string;
  description: string | null;
  status: string;
  assignee_user_id: string | null;
  due_at: string | null;
  onboarding_case_id: string | null;
  related_user_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiOnboardingCaseJson {
  id: string;
  user_id: string;
  case_role: string;
  source: string;
  status: string;
  owner_label: string;
  owner_user_id: string | null;
  submitted_at: string;
  completion_percent: number;
  next_action: string;
  materials: unknown[];
  created_at: string;
  updated_at: string;
}

export interface ApiTokenPairJson {
  access_token: string;
  token_type: string;
  expires_in: number;
}

/** `/ops/meeting-requests` wire shape */
export interface ApiMeetingRequestJson {
  id: string;
  requester_id: string;
  recipient_id: string;
  event_id: string | null;
  event_session_id: string | null;
  topic: string;
  message: string | null;
  status: string;
  proposed_slots: Record<string, unknown>[];
  created_at: string;
  updated_at: string;
}

/** Microsoft Graph / Teams-oriented session metadata (optional on list/detail responses). */
export type ApiMeetingSource = 'teams' | 'google_meet' | 'zoom' | 'in_person' | 'manual' | 'calcom' | 'unknown';

export type ApiTranscriptStatus = 'none' | 'pending' | 'recording' | 'processing' | 'ready' | 'failed';

export type ApiNotesProcessingStatus = 'idle' | 'queued' | 'processing' | 'complete' | 'failed';

export type ApiMeetingSummaryStatus = 'none' | 'draft' | 'published' | 'failed';

export type ApiGraphSyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

export type ApiMomentumHealth = 'cold' | 'warming' | 'active' | 'hot' | 'unknown';

export interface ApiMeetingParticipantIdentity {
  user_id: string;
  display_name: string | null;
  email_redacted: string | null;
  role: string | null;
}

/** `/ops/scheduled-meetings/*` wire shape */
/** Per-attendee post-meeting feedback status (CXO time-share sessions). */
export type ApiFeedbackStatus = 'not_required' | 'pending' | 'submitted' | 'overdue';

/** Hours-discrepancy escalation bucket for admin triage. */
export type ApiHoursEscalationStatus = 'none' | 'pending_admin' | 'resolved';

/** Post-meeting feedback + hour-report for a single participant. */
export interface ApiSessionAttendeeReport {
  user_id: string;
  role: 'cio' | 'startup';
  display_name: string;
  feedback_status: ApiFeedbackStatus;
  feedback_submitted_at?: string | null;
  /** Hours the attendee self-reported as consumed during this session. */
  reported_hours?: number | null;
  reported_at?: string | null;
}

/** Full content of one MeetingFeedback row, surfaced to the admin panel. */
export interface ApiSessionFeedback {
  id: string;
  user_id: string;
  display_name: string;
  role: 'cxo' | 'startup';
  rating: number; // 1-5
  comment: string | null;
  something_wrong: boolean;
  wrong_description: string | null;
  extra_time_offered: number | null;
  submitted_at: string;
}

/** Cancellation metadata for cancelled meetings. */
export interface ApiSessionCancellation {
  cancelled_by_id: string | null;
  cancelled_by_name: string | null;
  reason: string | null;
  created_at: string | null;
}

/** Per-user feedback received history for the rating profile modal. */
export interface ApiUserFeedbackHistory {
  user_id: string;
  user_name: string;
  user_tier: string;
  user_company: string | null;
  summary: {
    total_feedback: number;
    average_rating: number | null;
    flagged_count: number;
    rating_distribution: Record<'1' | '2' | '3' | '4' | '5', number>;
  };
  recent: Array<{
    id: string;
    rating: number;
    comment: string | null;
    something_wrong: boolean;
    wrong_description: string | null;
    submitted_by_id: string;
    submitted_by_name: string;
    submitted_by_role: 'cxo' | 'startup';
    submitted_at: string | null;
    ledger_entry_id: string;
  }>;
}

export interface ApiScheduledMeetingJson {
  id: string;
  meeting_request_id: string | null;
  event_id: string;
  event_session_id: string | null;
  organizer_user_id: string;
  participant_user_id: string;
  starts_at: string;
  ends_at: string;
  location: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  /** Enriched fields -- present when backend exposes Teams / Graph session tracking. */
  meeting_source?: ApiMeetingSource;
  teams_online_meeting_id?: string | null;
  teams_join_url?: string | null;
  teams_join_url_present?: boolean;
  transcript_status?: ApiTranscriptStatus;
  notes_processing_status?: ApiNotesProcessingStatus;
  summary_status?: ApiMeetingSummaryStatus;
  graph_sync_status?: ApiGraphSyncStatus;
  graph_last_synced_at?: string | null;
  participants?: ApiMeetingParticipantIdentity[];
  action_items_total?: number;
  action_items_completed?: number;
  momentum_health?: ApiMomentumHealth;
  momentum_score?: number | null;
  needs_notes?: boolean;
  outcome_present?: boolean;
  notes?: ApiMeetingSessionNoteJson[];
  outcome?: ApiMeetingOutcomeJson | null;
  action_items?: ApiMeetingActionItemJson[];
  /** Session title (auto-generated or admin-set). */
  title?: string | null;
  /** Program this session belongs to (time-share accounting). */
  program_id?: string | null;
  program_name?: string | null;
  /** Circle (cohort) this session belongs to. */
  cohort_id?: string | null;
  cohort_name?: string | null;
  /** Scheduled duration in hours (decimal, e.g. 0.5 for 30 min). */
  scheduled_hours?: number | null;
  /** Per-attendee feedback + hour-report rows. */
  attendee_reports?: ApiSessionAttendeeReport[];
  /** Full content of every feedback row for this meeting (stars, comment, flags). */
  feedback?: ApiSessionFeedback[];
  /** Hours discrepancy metadata — non-null only when ledger.status in {disputed, admin_resolved}. */
  hours_discrepancy?: {
    cio_reported_hours: number;
    startup_reported_hours: number;
    gap_hours: number;
    reported_by: 'cio' | 'startup' | 'both';
    reason: string | null;
    escalation_status: ApiHoursEscalationStatus;
    escalated_at?: string | null;
    resolved_at?: string | null;
  } | null;
  /** Cancellation details — non-null only when status === 'cancelled'. */
  cancellation?: ApiSessionCancellation | null;
}

/** Normalized scheduled meeting row for the admin session console (defaults applied client-side). */
export type ApiMemberSessionMeetingJson = ApiScheduledMeetingJson;

/** Query for `GET /ops/member-sessions/meetings`. */
export interface ApiMemberSessionMeetingsQuery {
  session_filter?: 'upcoming' | 'completed' | 'cancelled' | 'needs_notes' | 'all';
  event_id?: string;
  scope?: 'mine' | 'event' | 'all';
  search?: string;
  page_size?: number;
}

export interface ApiGraphSyncResultJson {
  status: string;
  detail?: string | null;
  synced_at?: string | null;
}

export interface ApiMeetingRefreshArtifactsBody {
  include_transcript?: boolean;
  include_summary?: boolean;
  include_action_items?: boolean;
}

export interface ApiMeetingRefreshArtifactsResultJson {
  status: string;
  detail?: string | null;
  job_id?: string | null;
}

export interface ApiMeetingsWebhookRenewResultJson {
  status: string;
  subscriptions_updated?: number;
  detail?: string | null;
}

export interface ApiMeetingCancellationJson {
  id: string;
  scheduled_meeting_id: string;
  cancelled_by_id: string;
  reason: string | null;
  created_at: string;
}

export interface ApiMeetingSessionNoteJson {
  id: string;
  scheduled_meeting_id: string;
  author_id: string;
  body: string;
  note_kind: string;
  created_at: string;
  updated_at: string;
}

export interface ApiMeetingOutcomeJson {
  id: string;
  scheduled_meeting_id: string;
  summary: string;
  recorded_by_id: string;
  created_at: string;
  updated_at: string;
}

export interface ApiMeetingActionItemJson {
  id: string;
  scheduled_meeting_id: string;
  title: string;
  assignee_user_id: string | null;
  due_at: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ApiOnboardingCasePatchJson {
  status?: string;
  owner_label?: string;
  owner_user_id?: string | null;
  completion_percent?: number;
  next_action?: string;
  materials?: unknown[];
}

export interface ApiProfileNoteJson {
  id: string;
  author_id: string;
  subject_kind: string;
  subject_id: string;
  body: string;
  created_at: string;
}

export interface ApiMomentumSignalJson {
  id: string;
  subject_kind: string;
  subject_id: string;
  signal_key: string;
  numeric_value: number | null;
  payload: Record<string, unknown>;
  recorded_at: string;
}

export interface ApiAvailabilityWindowJson {
  id: string;
  user_id: string;
  window_start: string;
  window_end: string;
  label: string | null;
  timezone: string;
  created_at: string;
}

export interface ApiLumaRecordJson {
  id: string;
  event_id: string | null;
  external_event_id: string;
  sync_status: string;
  last_synced_at: string | null;
  last_error: string | null;
  raw_state: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface ApiMeetingRequestAcceptBody {
  starts_at: string;
  ends_at: string;
  location?: string | null;
  event_id?: string | null;
}

export interface ApiMeetingCancellationBody {
  reason?: string | null;
}

export interface ApiMeetingSessionNoteBody {
  body: string;
  note_kind?: string;
}

export interface ApiMeetingSessionNotePatchBody {
  body?: string;
  note_kind?: string;
}

export interface ApiMeetingOutcomeBody {
  summary: string;
}

export interface ApiMeetingActionItemCreateBody {
  title: string;
  assignee_user_id?: string | null;
  due_at?: string | null;
}

export interface ApiMeetingActionItemPatchBody {
  title?: string;
  assignee_user_id?: string | null;
  due_at?: string | null;
  status?: string;
}

export interface ApiProfileNoteCreateBody {
  subject_kind: 'user' | 'startup';
  subject_id: string;
  body: string;
}

export interface ApiMomentumSignalCreateBody {
  subject_kind: 'user' | 'startup';
  subject_id: string;
  signal_key: string;
  numeric_value?: number | null;
  payload?: Record<string, unknown>;
}

export interface ApiAvailabilityWindowCreateBody {
  window_start: string;
  window_end: string;
  label?: string | null;
  timezone?: string;
}

export interface ApiLumaRecordCreateBody {
  event_id?: string | null;
  external_event_id: string;
  sync_status: string;
  raw_state?: Record<string, unknown>;
}

export interface ApiLumaRecordPatchBody {
  sync_status?: string;
  last_error?: string | null;
  raw_state?: Record<string, unknown>;
  last_synced_at?: string | null;
}

// ---------------------------------------------------------------------------
// Cal.com Integration Types
// ---------------------------------------------------------------------------

export interface CalcomOnboardingStatus {
  onboarding_step: 'pending' | 'calendar_connected' | 'availability_set' | 'complete';
  calcom_user_id: number | null;
  calcom_profile_url: string | null;
  connected_calendars: CalcomConnectedCalendar[];
  meeting_preferences: CalcomMeetingPreference[];
}

export interface CalcomConnectedCalendar {
  provider: string; // 'google' | 'apple' | 'microsoft' | 'caldav'
  email: string;
  connected_at: string;
}

export interface CalcomAvailabilitySlot {
  day: string; // 'monday' | 'tuesday' | ... | 'sunday'
  enabled: boolean;
  start_time: string; // 'HH:mm' format
  end_time: string; // 'HH:mm' format
}

export interface CalcomAvailability {
  schedule_id: number | null;
  slots: CalcomAvailabilitySlot[];
  timezone: string;
}

export interface CalcomMeetingPreference {
  type: 'video' | 'phone' | 'in_person';
  enabled: boolean;
  provider: string | null; // 'google_meet' | 'zoom' | 'teams' | null
  details: string | null; // phone number or address
}

export interface CalcomBooking {
  booking_uid: string;
  title: string;
  starts_at: string;
  ends_at: string;
  status: 'accepted' | 'cancelled' | 'pending' | 'rescheduled';
  meeting_url: string | null;
  location_type: string | null;
  attendee_email: string;
}

// ---------------------------------------------------------------------------
// Advisory Program Types
// ---------------------------------------------------------------------------

export interface ProgramResponse {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  status: string;
  max_cxos: number;
  max_startups: number;
  total_hours: number;
  hours_per_cxo: number;
  hours_per_pairing: number;
  duration_months: number;
  max_cios_per_startup: number;
  max_hours_per_startup: number;
  enforcement_period_months: number;
  starts_at: string | null;
  ends_at: string | null;
  created_at: string;
  cxo_count: number;
  startup_count: number;
  hours_used: number;
}

export interface EnrollmentResponse {
  id: string;
  program_id: string;
  user_id: string;
  user_name: string | null;
  user_email: string | null;
  role: string;
  status: string;
  pricing_tier: string | null;
  pricing_locked: boolean;
  hours_committed: number;
  hours_used: number;
  hours_paid: number;
  contract_signed: boolean;
  invoice_sent: boolean;
  enrolled_at: string | null;
  activated_at: string | null;
  created_at: string;
}

export interface AssignmentResponse {
  id: string;
  program_id: string;
  cxo_user_id: string;
  cxo_name: string | null;
  cxo_company: string | null;
  startup_user_id: string;
  startup_name: string | null;
  startup_company: string | null;
  hours_allocated: number;
  hours_used: number;
  status: string;
  request_type: string | null;
  request_status: string | null;
  deny_reason: string | null;
  created_at: string;
}

export interface UserHourSummary {
  user_id: string;
  user_name: string | null;
  role: string;
  hours_committed: number;
  hours_used: number;
  hours_remaining: number;
}

export interface ProgramHourSummary {
  program_id: string;
  total_hours: number;
  hours_used: number;
  hours_remaining: number;
  per_user: UserHourSummary[];
}

// ---------------------------------------------------------------------------
// Program Onboarding Types
// ---------------------------------------------------------------------------

export interface OnboardingPartner {
  id: string;
  name: string;
  email: string;
  company: string | null;
  role: string | null;
}

export interface OnboardingProgramInfo {
  id: string;
  name: string;
  description: string | null;
  duration_months: number;
  hours_per_cxo: number;
  hours_per_pairing: number;
  starts_at: string | null;
  ends_at: string | null;
}

export interface OnboardingInfo {
  enrollment_id: string;
  program: OnboardingProgramInfo;
  user: {
    id: string;
    name: string;
    email: string;
    role?: string | null;
    company_affiliation?: string | null;
    linkedin?: string | null;
    phone?: string | null;
    about_me?: string | null;
  };
  role: string;
  status: string;
  hours_committed: number;
  partners: OnboardingPartner[];
}

// Hour Tracking Types

export interface LedgerEntryResponse {
  id: string;
  program_id: string;
  assignment_id: string;
  cxo_user_id: string;
  cxo_name: string | null;
  startup_user_id: string;
  startup_name: string | null;
  scheduled_duration: number;
  credited_duration: number;
  status: string;
  cxo_confirmed: boolean | null;
  startup_confirmed: boolean | null;
  meeting_date: string;
  created_at: string;
}

export interface FeedbackResponse {
  id: string;
  ledger_entry_id: string;
  submitted_by_id: string;
  role: string;
  rating: number;
  comment: string | null;
  something_wrong: boolean;
  extra_time_offered: number | null;
  submitted_at: string;
}

export interface CreditResponse {
  id: string;
  program_id: string;
  startup_user_id: string;
  hours_credited: number;
  reason: string;
  redeemed: boolean;
  created_at: string;
}

export interface CohortResponse {
  id: string;
  program_id: string;
  name: string;
  slug: string;
  description: string | null;
  status: string;
  max_participants: number | null;
  max_team_members: number;
  startup_industry: string | null;
  startup_description: string | null;
  startup_stage: string | null;
  startup_ask: string | null;
  starts_at: string | null;
  ends_at: string | null;
  created_at: string;
  enrollment_count: number;
}

export interface CohortEnrollmentResponse {
  id: string;
  cohort_id: string;
  user_id: string;
  user_name: string | null;
  user_email: string | null;
  role: string;
  status: string;
  enrolled_at: string | null;
  created_at: string;
}

// ---------------------------------------------------------------------------
// Time-Share Marketplace
// ---------------------------------------------------------------------------

export interface TimeShareRequestResponse {
  id: string;
  program_id: string;
  requester_id: string;
  requester_name: string | null;
  requester_company: string | null;
  recipient_id: string;
  recipient_name: string | null;
  recipient_company: string | null;
  request_type: string;
  hours_requested: number;
  message: string | null;
  status: string;
  deny_reason: string | null;
  assignment_id: string | null;
  created_at: string;
  expires_at: string | null;
  resolved_at: string | null;
}

export interface PricingTierResponse {
  id: string;
  program_id: string;
  tier_name: string;
  price_per_hour: number;
  accessible_cio_types: string[];
  max_hours: number | null;
  description: string | null;
  created_at: string;
}

export interface StartupUsageSummary {
  hours_used: number;
  hours_remaining: number;
  cios_count: number;
  max_cios: number;
  max_hours: number;
  warning: boolean;
}

// ---------------------------------------------------------------------------
// Per-user Program Dashboard
// ---------------------------------------------------------------------------

export interface MyProgramPartner {
  user_id: string;
  name: string | null;
  company: string | null;
  role: string;
  calcom_username: string | null;
  calcom_team_slug: string | null;
  linkedin: string | null;
  about_me: string | null;
  avatar_url: string | null;
  user_role: string | null;
  created_at: string | null;
  startup_website: string | null;
  startup_description: string | null;
  startup_logo_url: string | null;
}

export interface UpcomingSession {
  id: string;
  title: string | null;
  starts_at: string;
  ends_at: string;
  status: string;
  organizer_user_id: string;
  participant_user_id: string;
  organizer_name: string | null;
  participant_name: string | null;
  scheduled_hours?: number;
}

export interface MyProgramContext {
  program: ProgramResponse | null;
  enrollment: EnrollmentResponse | null;
  assignments: AssignmentResponse[];
  partners: MyProgramPartner[];
  upcoming_sessions?: UpcomingSession[];
  all_sessions?: UpcomingSession[];
}
