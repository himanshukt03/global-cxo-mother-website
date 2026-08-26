"use client"
import React, { useState, useEffect, useCallback } from "react"

const SHAREPOINT_LINK = "https://globalcxocircle.sharepoint.com/:f:/s/EventPics/IgAJqikt6aK0RbRi3Kj37uYrAfHomYc1KFuY3Lk0Yh0jTM4?e=8OUcPv"

interface MediaItem {
    id: string
    thumb: string
    full: string
}

const mediaItems: MediaItem[] = [
    { id: "1", thumb: "/events/cio100-gallery/CIO100%20Awards%20%26%20Conference-154.jpg", full: "/events/cio100-gallery/CIO100%20Awards%20%26%20Conference-154.jpg" },
    { id: "2", thumb: "/events/cio100-gallery/CIO100-2026-542.jpg", full: "/events/cio100-gallery/CIO100-2026-542.jpg" },
    { id: "3", thumb: "/events/cio100-gallery/CIO100%20Awards%20%26%20Conference-66.jpg", full: "/events/cio100-gallery/CIO100%20Awards%20%26%20Conference-66.jpg" },
    { id: "4", thumb: "/events/cio100-gallery/CIO100-2026-491.jpg", full: "/events/cio100-gallery/CIO100-2026-491.jpg" },
    { id: "5", thumb: "/events/cio100-gallery/CIO100%20Awards%20%26%20Conference-60.jpg", full: "/events/cio100-gallery/CIO100%20Awards%20%26%20Conference-60.jpg" },
    { id: "6", thumb: "/events/cio100-gallery/CIO100-2026-553.jpg", full: "/events/cio100-gallery/CIO100-2026-553.jpg" },
    { id: "7", thumb: "/events/cio100-gallery/CIO100%20Awards%20%26%20Conference-2.jpg", full: "/events/cio100-gallery/CIO100%20Awards%20%26%20Conference-2.jpg" },
    { id: "8", thumb: "/events/cio100-gallery/CIO100%20Awards%20%26%20Conference-131.jpg", full: "/events/cio100-gallery/CIO100%20Awards%20%26%20Conference-131.jpg" },
]

/* ---- Icons ---- */
const CloseIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
)

const ChevronIcon = ({ direction }: { direction: "left" | "right" }) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
)

export default function CIO100MediaAccess() {
    const [isUnlocked, setIsUnlocked] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [company, setCompany] = useState("")
    const [consent, setConsent] = useState(false)

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
    const [errorMsg, setErrorMsg] = useState("")
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    // Require form submission to unlock gallery for lead capture
    useEffect(() => {
        setIsUnlocked(false)
    }, [])

    const handlePrev = useCallback(() => {
        setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + mediaItems.length) % mediaItems.length))
    }, [])

    const handleNext = useCallback(() => {
        setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % mediaItems.length))
    }, [])

    const handleClose = useCallback(() => {
        setLightboxIndex(null)
    }, [])

    useEffect(() => {
        if (lightboxIndex === null) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose()
            if (e.key === "ArrowLeft") handlePrev()
            if (e.key === "ArrowRight") handleNext()
        }
        window.addEventListener("keydown", onKey)
        document.body.style.overflow = "hidden"
        return () => {
            window.removeEventListener("keydown", onKey)
            document.body.style.overflow = ""
        }
    }, [lightboxIndex, handleClose, handlePrev, handleNext])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !company.trim()) {
            setErrorMsg("Please fill in all required fields.")
            setStatus("error")
            return
        }
        if (!consent) {
            setErrorMsg("Please check the consent box to proceed.")
            setStatus("error")
            return
        }

        setStatus("submitting")
        setErrorMsg("")

        try {
            const res = await fetch("/api/gallery-leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    event_slug: "cio-100-awards-conference",
                    first_name: firstName.trim(),
                    last_name: lastName.trim(),
                    email: email.trim(),
                    company: company.trim(),
                    consent,
                }),
            })
            const data = (await res.json()) as { success?: boolean; error?: string }
            if (res.ok && data.success) {
                setStatus("success")
                sessionStorage.setItem("cio100_gallery_unlocked", "true")
                setIsUnlocked(true)
            } else {
                setErrorMsg(data.error || "Failed to record response. Please try again.")
                setStatus("error")
            }
        } catch {
            sessionStorage.setItem("cio100_gallery_unlocked", "true")
            setIsUnlocked(true)
        }
    }

    return (
        <section id="media-download" style={{ padding: "60px 0", background: "var(--tg-common-color-grey-1, #f8f9fa)" }}>
            <div className="container" style={{ maxWidth: "980px" }}>
                {!isUnlocked ? (
                    <div
                        style={{
                            background: "#ffffff",
                            borderRadius: "20px",
                            padding: "clamp(28px, 4vw, 48px)",
                            boxShadow: "0 8px 30px rgba(11,26,74,0.06)",
                            border: "1px solid var(--tg-border-1, #e2e8f0)",
                            maxWidth: "720px",
                            margin: "0 auto",
                        }}
                    >
                        <div className="text-center" style={{ marginBottom: "32px" }}>
                            <span
                                style={{
                                    background: "var(--tg-color-gradient)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "1.5px",
                                    fontSize: "12px",
                                    display: "block",
                                    marginBottom: "8px",
                                }}
                            >
                                CIO 100 AWARDS 2026
                            </span>
                            <h2
                                style={{
                                    fontSize: "clamp(24px, 3vw, 34px)",
                                    fontWeight: 800,
                                    color: "var(--tg-heading-color, #0b1020)",
                                    marginBottom: "12px",
                                }}
                            >
                                Download Your Event Photos &amp; Videos
                            </h2>
                            <p style={{ color: "var(--tg-body-color, #64748b)", fontSize: "15px", maxWidth: "520px", margin: "0 auto", lineHeight: 1.6 }}>
                                Enter your details to access and download exclusive photos and videos from the CIO 100 Awards 2026.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--tg-heading-color, #1e293b)", marginBottom: "6px", display: "block" }}>
                                        First Name <span style={{ color: "#e11d48" }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="John"
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "12px 16px",
                                            borderRadius: "12px",
                                            border: "1.5px solid var(--tg-border-1, #cbd5e1)",
                                            fontSize: "14.5px",
                                            outline: "none",
                                            background: "#f8fafc",
                                            color: "var(--tg-heading-color, #0f172a)",
                                        }}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--tg-heading-color, #1e293b)", marginBottom: "6px", display: "block" }}>
                                        Last Name <span style={{ color: "#e11d48" }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Doe"
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "12px 16px",
                                            borderRadius: "12px",
                                            border: "1.5px solid var(--tg-border-1, #cbd5e1)",
                                            fontSize: "14.5px",
                                            outline: "none",
                                            background: "#f8fafc",
                                            color: "var(--tg-heading-color, #0f172a)",
                                        }}
                                    />
                                </div>

                                <div className="col-12">
                                    <label style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--tg-heading-color, #1e293b)", marginBottom: "6px", display: "block" }}>
                                        Work Email Address <span style={{ color: "#e11d48" }}>*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="john.doe@company.com"
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "12px 16px",
                                            borderRadius: "12px",
                                            border: "1.5px solid var(--tg-border-1, #cbd5e1)",
                                            fontSize: "14.5px",
                                            outline: "none",
                                            background: "#f8fafc",
                                            color: "var(--tg-heading-color, #0f172a)",
                                        }}
                                    />
                                </div>

                                <div className="col-12">
                                    <label style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--tg-heading-color, #1e293b)", marginBottom: "6px", display: "block" }}>
                                        Organization / Company <span style={{ color: "#e11d48" }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        placeholder="Your Organization"
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "12px 16px",
                                            borderRadius: "12px",
                                            border: "1.5px solid var(--tg-border-1, #cbd5e1)",
                                            fontSize: "14.5px",
                                            outline: "none",
                                            background: "#f8fafc",
                                            color: "var(--tg-heading-color, #0f172a)",
                                        }}
                                    />
                                </div>

                                <div className="col-12" style={{ marginTop: "16px" }}>
                                    <label style={{ display: "flex", gap: "10px", alignItems: "flex-start", cursor: "pointer", fontSize: "13.5px", color: "var(--tg-body-color, #334155)", lineHeight: 1.5 }}>
                                        <input
                                            type="checkbox"
                                            checked={consent}
                                            onChange={(e) => setConsent(e.target.checked)}
                                            required
                                            style={{ marginTop: "3px", width: "16px", height: "16px", accentColor: "var(--tg-theme-primary, #0a3cc2)" }}
                                        />
                                        <span>
                                            I consent to receive notifications from Global CXO Circle about events, Circle updates, and exclusive invitations. <span style={{ color: "#e11d48" }}>*</span>
                                        </span>
                                    </label>
                                </div>

                                {status === "error" && errorMsg && (
                                    <div className="col-12" style={{ color: "#e11d48", fontSize: "13.5px", fontWeight: 600 }}>
                                        {errorMsg}
                                    </div>
                                )}

                                <div className="col-12" style={{ marginTop: "24px" }}>
                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        style={{
                                            width: "100%",
                                            padding: "14px 24px",
                                            borderRadius: "100px",
                                            background: "var(--tg-color-gradient)",
                                            color: "#ffffff",
                                            fontWeight: 700,
                                            fontSize: "15px",
                                            border: "none",
                                            cursor: "pointer",
                                            boxShadow: "0 6px 20px rgba(10,60,194,0.25)",
                                            transition: "all 0.3s ease",
                                        }}
                                    >
                                        {status === "submitting" ? "Processing..." : "Submit & Access Gallery"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div
                        style={{
                            background: "#ffffff",
                            borderRadius: "20px",
                            padding: "clamp(24px, 3.5vw, 40px)",
                            boxShadow: "0 8px 30px rgba(11,26,74,0.06)",
                            border: "1px solid var(--tg-border-1, #e2e8f0)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "16px",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "28px",
                                borderBottom: "1px solid #f1f5f9",
                                paddingBottom: "18px",
                            }}
                        >
                            <div>
                                <h3 style={{ fontSize: "22px", fontWeight: 800, color: "var(--tg-heading-color, #0b1020)", margin: 0 }}>
                                    CIO 100 Awards 2026 – Photo &amp; Video Gallery
                                </h3>
                                <p style={{ color: "var(--tg-body-color, #64748b)", fontSize: "14px", margin: "4px 0 0" }}>
                                    Explore session photos or download full high-resolution files.
                                </p>
                            </div>

                            <a
                                href={SHAREPOINT_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "11px 24px",
                                    borderRadius: "100px",
                                    background: "var(--tg-color-gradient)",
                                    color: "#ffffff",
                                    fontWeight: 700,
                                    fontSize: "14px",
                                    textDecoration: "none",
                                    boxShadow: "0 4px 14px rgba(10,60,194,0.25)",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                Download All
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                            </a>
                        </div>

                        {/* Media Grid */}
                        <div className="row g-4">
                            {mediaItems.map((item, idx) => (
                                <div key={item.id} className="col-6 col-md-4 col-lg-3">
                                    <div
                                        onClick={() => setLightboxIndex(idx)}
                                        style={{
                                            borderRadius: "14px",
                                            overflow: "hidden",
                                            background: "#f1f5f9",
                                            position: "relative",
                                            cursor: "pointer",
                                            border: "1px solid var(--tg-border-1, #e2e8f0)",
                                            aspectRatio: "4 / 3",
                                            transition: "transform 0.25s ease, box-shadow 0.25s ease",
                                        }}
                                        className="gallery-grid-card"
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={item.thumb}
                                            alt="CIO 100 Gallery Photo"
                                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Standard Lightbox Modal with Close (X), Prev/Next Arrows, & Counter */}
                        {lightboxIndex !== null && (
                            <div
                                onClick={handleClose}
                                style={{
                                    position: "fixed",
                                    inset: 0,
                                    zIndex: 99999,
                                    background: "rgba(6,10,26,0.94)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "24px",
                                }}
                            >
                                {/* Close button */}
                                <button
                                    onClick={handleClose}
                                    aria-label="Close"
                                    style={{
                                        position: "absolute",
                                        top: "22px",
                                        right: "22px",
                                        width: "44px",
                                        height: "44px",
                                        borderRadius: "50%",
                                        border: "none",
                                        background: "rgba(255,255,255,0.1)",
                                        color: "#fff",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <CloseIcon />
                                </button>

                                {/* Counter */}
                                <span
                                    style={{
                                        position: "absolute",
                                        top: "26px",
                                        left: "26px",
                                        color: "rgba(255,255,255,0.7)",
                                        fontSize: "13.5px",
                                        fontWeight: 600,
                                        letterSpacing: "0.5px",
                                    }}
                                >
                                    {lightboxIndex + 1} / {mediaItems.length}
                                </span>

                                {/* Prev button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handlePrev()
                                    }}
                                    aria-label="Previous photo"
                                    style={{
                                        position: "absolute",
                                        left: "18px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        width: "48px",
                                        height: "48px",
                                        borderRadius: "50%",
                                        border: "none",
                                        background: "rgba(255,255,255,0.1)",
                                        color: "#fff",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <ChevronIcon direction="left" />
                                </button>

                                {/* Next button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleNext()
                                    }}
                                    aria-label="Next photo"
                                    style={{
                                        position: "absolute",
                                        right: "18px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        width: "48px",
                                        height: "48px",
                                        borderRadius: "50%",
                                        border: "none",
                                        background: "rgba(255,255,255,0.1)",
                                        color: "#fff",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <ChevronIcon direction="right" />
                                </button>

                                {/* Photo Content */}
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    style={{ maxWidth: "90vw", maxHeight: "85vh", textAlign: "center", position: "relative" }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={mediaItems[lightboxIndex].full}
                                        alt="CIO 100 Gallery Photo"
                                        style={{ maxWidth: "100%", maxHeight: "85vh", borderRadius: "12px", objectFit: "contain" }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Footer Contact Info */}
                        <div className="text-center" style={{ marginTop: "32px", paddingTop: "18px", borderTop: "1px solid #f1f5f9" }}>
                            <p style={{ fontSize: "13.5px", color: "var(--tg-body-color, #64748b)", margin: 0 }}>
                                Having trouble downloading? Contact us at{" "}
                                <a href="mailto:info@globalcxocircle.com" style={{ color: "var(--tg-theme-primary, #0a3cc2)", fontWeight: 600 }}>
                                    info@globalcxocircle.com
                                </a>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
