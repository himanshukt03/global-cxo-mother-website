import { NextResponse } from "next/server"

const BACKEND_ENDPOINT = "https://gcio-backend-production.up.railway.app/api/events/gallery-leads"

/**
 * POST /api/log-gallery-failure
 *
 * Called client-side when both the primary proxy and the direct fallback have
 * failed to record a gallery lead. This route:
 *   1. Logs the full submission + error context to the server console
 *      (visible in Vercel → Functions → Logs).
 *   2. Makes one final server-side attempt to save the lead to the Railway
 *      backend (server → Railway bypasses any client-side firewall/CORS issues).
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

  // ── 1. Server-side log (visible in Vercel Function Logs) ──────────────────
  console.error(
    "[GALLERY-FAILURE] Failed gallery lead submission — granting silent access.",
    JSON.stringify({
      timestamp: timestamp || new Date().toISOString(),
      primaryHttpStatus: primaryStatus ?? "null (network failure)",
      fallbackHttpStatus: fallbackStatus ?? "null (network failure)",
      submission: payload ?? null,
    }, null, 2)
  )

  // ── 2. Server-side re-attempt to Railway (bypasses client firewall) ───────
  let savedOnServer = false
  if (payload?.email) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      const res = await fetch(BACKEND_ENDPOINT, {
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

      clearTimeout(timeoutId)
      savedOnServer = res.ok

      if (res.ok) {
        console.log(
          `[GALLERY-FAILURE] Server-side re-attempt succeeded for ${payload.email}`
        )
      } else {
        const errText = await res.text().catch(() => "")
        console.error(
          `[GALLERY-FAILURE] Server-side re-attempt also failed (${res.status}) for ${payload.email}:`,
          errText
        )
      }
    } catch (err: any) {
      console.error(
        `[GALLERY-FAILURE] Server-side re-attempt threw for ${payload?.email}:`,
        err?.message
      )
    }
  }

  return NextResponse.json({ logged: true, savedOnServer })
}
