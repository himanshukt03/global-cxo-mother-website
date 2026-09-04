import { NextResponse } from "next/server"

const DEFAULT_BACKEND_URL = "https://gcio-backend-production.up.railway.app"

function getBackendEndpoint(): string {
  const raw = (
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    DEFAULT_BACKEND_URL
  ).trim().replace(/\/$/, "")

  if (raw.endsWith("/api")) {
    return `${raw}/events/gallery-leads`
  }
  return `${raw}/api/events/gallery-leads`
}

function maskEmail(email?: string): string {
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return "[redacted]"
  }
  const [local, domain] = email.split("@")
  if (!domain) return "[redacted]"
  const maskedLocal =
    local.length > 2
      ? `${local[0]}${"*".repeat(Math.min(local.length - 2, 4))}${local.slice(-1)}`
      : `${local[0]}*`
  return `${maskedLocal}@${domain}`
}

function maskString(str?: string): string {
  if (!str || typeof str !== "string") return ""
  if (str.length <= 2) return `${str[0]}*`
  return `${str[0]}${"*".repeat(Math.min(str.length - 2, 4))}${str.slice(-1)}`
}

function sanitizeSubmissionForLog(payload: any) {
  if (!payload || typeof payload !== "object") return null
  return {
    event_slug: payload.event_slug,
    first_name: maskString(payload.first_name),
    last_name: maskString(payload.last_name),
    email: maskEmail(payload.email),
    has_company_or_linkedin: Boolean(payload.company),
    consent: payload.consent,
  }
}

/**
 * POST /api/log-gallery-failure
 *
 * Called client-side when both the primary proxy and the direct fallback have
 * failed to record a gallery lead. This route:
 *   1. Logs diagnostic failure context with masked PII to server console
 *      (visible in Vercel -> Functions -> Logs).
 *   2. Makes one final server-side attempt to save the full lead to the
 *      backend (server -> backend bypasses client-side firewall/CORS issues).
 *
 * The client always grants gallery access regardless of what this route returns,
 * so users are never blocked by infrastructure failures.
 */
export async function POST(request: Request) {
  let body: any = {}
  try {
    body = await request.json()
  } catch {
    // ignore parse errors — log whatever we have
  }

  const { payload, primaryStatus, fallbackStatus, timestamp } = body

  // ── 1. Server-side log with masked PII (visible in Vercel Function Logs) ─
  console.error(
    "[GALLERY-FAILURE] Failed gallery lead submission — granting silent access.",
    JSON.stringify(
      {
        timestamp: timestamp || new Date().toISOString(),
        primaryHttpStatus: primaryStatus ?? "null (network failure)",
        fallbackHttpStatus: fallbackStatus ?? "null (network failure)",
        submission: sanitizeSubmissionForLog(payload),
      },
      null,
      2
    )
  )

  // ── 2. Server-side re-attempt to backend (bypasses client firewall) ──────
  let savedOnServer = false
  if (payload?.email) {
    const endpoint = getBackendEndpoint()
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          event_slug: payload.event_slug || "cio-100-awards-conference",
          first_name: payload.first_name || "",
          last_name: payload.last_name || "",
          email: payload.email || "",
          company: payload.company || "",
          consent: payload.consent ?? true,
        }),
        signal: controller.signal,
      })

      savedOnServer = res.ok

      if (res.ok) {
        console.log(
          `[GALLERY-FAILURE] Server-side re-attempt succeeded for ${maskEmail(payload.email)}`
        )
      } else {
        const errText = await res.text().catch(() => "")
        console.error(
          `[GALLERY-FAILURE] Server-side re-attempt failed (${res.status}) for ${maskEmail(payload.email)}:`,
          errText
        )
      }
    } catch (err: any) {
      console.error(
        `[GALLERY-FAILURE] Server-side re-attempt threw for ${maskEmail(payload?.email)}:`,
        err?.message
      )
    } finally {
      clearTimeout(timeoutId)
    }
  }

  return NextResponse.json({ logged: true, savedOnServer })
}
