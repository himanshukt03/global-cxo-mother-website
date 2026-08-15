"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function WaitlistRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/membership")
  }, [router])

  return (
    <div style={{ fontFamily: "sans-serif", display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "#f8f9fa", color: "#333" }}>
      <p style={{ fontSize: "16px", fontWeight: 500 }}>
        Redirecting to <a href="/membership/" style={{ color: "#0A3CC2", textDecoration: "underline" }}>Membership</a>...
      </p>
    </div>
  )
}
