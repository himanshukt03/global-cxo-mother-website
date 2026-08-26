import { NextResponse } from "next/server"

const DEFAULT_BACKEND_URL = "https://gcio-backend-production.up.railway.app"

function getBackendEndpoint(): string {
  const raw = (
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    DEFAULT_BACKEND_URL
  ).trim().replace(/\/$/, "")

  // Normalize: if url already contains /api at the end, use /events/gallery-leads
  if (raw.endsWith("/api")) {
    return `${raw}/events/gallery-leads`
  }
  return `${raw}/api/events/gallery-leads`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const endpoint = getBackendEndpoint()

    const payload = {
      event_slug: (body.event_slug || "cio-100-awards-conference").trim(),
      first_name: (body.first_name || "").trim(),
      last_name: (body.last_name || "").trim(),
      email: (body.email || "").trim().toLowerCase(),
      company: (body.company || "").trim(),
      consent: body.consent ?? true,
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 12000)

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (res.ok) {
      const data = await res.json().catch(() => ({ success: true }))
      return NextResponse.json({ success: true, ...data })
    }

    const errorPayload = await res.json().catch(async () => {
      const text = await res.text().catch(() => "")
      return { detail: text || "Backend request failed" }
    })

    const errorMessage =
      typeof errorPayload.detail === "string"
        ? errorPayload.detail
        : Array.isArray(errorPayload.detail)
          ? errorPayload.detail.map((e: any) => e.msg || JSON.stringify(e)).join(", ")
          : "Failed to record lead response."

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: res.status }
    )
  } catch (error: any) {
    console.error("[gallery-leads] Proxy error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Failed to connect to backend service." },
      { status: 502 }
    )
  }
}
