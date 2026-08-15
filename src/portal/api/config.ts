// NEXT_PUBLIC_* environment variables are inlined at build time by Next.js.
const rawBase = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ?? '';

export const API_BASE_URL = rawBase.replace(/\/$/, '');

/** When true and a base URL is set, login/bootstrap use HTTP instead of local mock session. */
export const USE_API_AUTH: boolean =
  (process.env.NEXT_PUBLIC_USE_API_AUTH ?? 'true') !== 'false';

// ---------------------------------------------------------------------------
// Cal.com URLs — driven strictly by environment variables
// ---------------------------------------------------------------------------

const rawCalcomUrl = (process.env.NEXT_PUBLIC_CALCOM_URL as string | undefined)?.trim();
export const CALCOM_URL: string = (rawCalcomUrl && rawCalcomUrl.length > 0
  ? rawCalcomUrl
  : ''
).replace(/\/$/, '');

const rawCalcomAdminUrl = (process.env.NEXT_PUBLIC_CALCOM_ADMIN_URL as string | undefined)?.trim();
export const CALCOM_ADMIN_URL: string = (rawCalcomAdminUrl && rawCalcomAdminUrl.length > 0
  ? rawCalcomAdminUrl
  : ''
).replace(/\/$/, '');

const rawCalcomIframeSrc = (process.env.NEXT_PUBLIC_CALCOM_IFRAME_SRC as string | undefined)?.trim();
export const CALCOM_IFRAME_SRC: string = (rawCalcomIframeSrc && rawCalcomIframeSrc.length > 0
  ? rawCalcomIframeSrc
  : ''
).replace(/\/$/, '');
