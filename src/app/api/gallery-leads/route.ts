import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Use API_BASE_URL (server-side private var) with fallback to NEXT_PUBLIC variant
    // API_BASE_URL is not exposed to the client — correct for server-side route calls
    const backendUrl = (
      process.env.API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "http://localhost:8000"
    ).replace(/\/$/, "")

    const endpoint = `${backendUrl}/api/events/gallery-leads`

    const payload = {
      event_slug: (body.event_slug || "cio-100-awards-conference").trim(),
      first_name: (body.first_name || "").trim(),
      last_name: (body.last_name || "").trim(),
      email: (body.email || "").trim().toLowerCase(),
      company: (body.company || "").trim(),
      consent: body.consent ?? true,
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      return NextResponse.json({ success: true, database: "neon" })
    }

    // Surface the backend error so we can diagnose it
    const errorText = await res.text().catch(() => "unknown")
    console.error(`[gallery-leads] Backend responded ${res.status}: ${errorText}`)
    return NextResponse.json(
      { success: false, error: `Backend error ${res.status}: ${errorText}` },
      { status: res.status }
    )
  } catch (error: any) {
    console.error("[gallery-leads] Unexpected error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error." },
      { status: 500 }
    )
  }
}
