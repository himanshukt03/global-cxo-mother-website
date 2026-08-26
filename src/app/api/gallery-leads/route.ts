import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const databaseUrl = process.env.DATABASE_URL
    if (!databaseUrl) {
      console.error("[gallery-leads] DATABASE_URL env var is not set")
      return NextResponse.json(
        { success: false, error: "Server configuration error." },
        { status: 500 }
      )
    }

    const sql = neon(databaseUrl)

    // Ensure table exists (safe no-op if already created)
    await sql`
      CREATE TABLE IF NOT EXISTS gallery_leads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        event_slug VARCHAR(160) NOT NULL,
        first_name VARCHAR(120) NOT NULL,
        last_name VARCHAR(120) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        consent BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `

    const eventSlug = (body.event_slug || "cio-100-awards-conference").trim()
    const firstName = (body.first_name || "").trim()
    const lastName = (body.last_name || "").trim()
    const email = (body.email || "").trim().toLowerCase()
    const company = (body.company || "").trim()
    const consent = body.consent ?? true

    await sql`
      INSERT INTO gallery_leads (event_slug, first_name, last_name, email, company, consent)
      VALUES (${eventSlug}, ${firstName}, ${lastName}, ${email}, ${company}, ${consent})
    `

    return NextResponse.json({ success: true, database: "neon" })
  } catch (error: any) {
    console.error("[gallery-leads] Error:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error." },
      { status: 500 }
    )
  }
}
