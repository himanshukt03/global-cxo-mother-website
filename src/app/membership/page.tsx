"use client"

import { useState, useRef, type ReactNode, type CSSProperties } from "react"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { PhoneInput } from "react-international-phone"
import "react-international-phone/style.css"
import Header from "@/layouts/headers/Header"
import Footer from "@/layouts/footers/Footer"

const API_BASE_URL = "https://gcio-backend-production.up.railway.app/api"

/* ------------------------------------------------------------------ */
/* Motion helpers                                                      */
/* ------------------------------------------------------------------ */
function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

function ScaleIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.92 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.4, 0, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Shared field styles                                                 */
/* ------------------------------------------------------------------ */
const labelStyle: CSSProperties = { display: "block", fontSize: "13px", fontWeight: 600, color: "var(--tg-heading-color)", marginBottom: "6px" }
const inputStyle: CSSProperties = {
  width: "100%", padding: "14px 18px", borderRadius: "12px", border: "1px solid var(--tg-border-1)",
  background: "#fff", fontSize: "15px", color: "var(--tg-heading-color)",
  boxShadow: "0 2px 10px rgba(11,26,74,0.04)", transition: "all 0.3s ease",
}
const helperStyle: CSSProperties = { marginTop: "5px", fontSize: "12px", color: "#6b7280" }

const Required = () => <span style={{ color: "#DC2626" }}> *</span>

const PROFILE_OPTIONS = [
  "Enterprise CxO",
  "Enterprise Technology Leader (CxO-1)",
  "Startup Founder / CEO",
  "Venture Capital / Investor",
  "Strategic Partner / Ecosystem Leader",
  "Other",
]

/* ------------------------------------------------------------------ */
/* Membership form                                                     */
/* ------------------------------------------------------------------ */
function MembershipForm({ variant = "default" }: { variant?: "default" | "hero" }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [phone, setPhone] = useState("")
  const [profile, setProfile] = useState("")
  const [otherProfile, setOtherProfile] = useState("")

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string
    email?: string
    linkedin?: string
    phone?: string
    profile?: string
    otherProfile?: string
  }>({})

  const isHero = variant === "hero"

  const validate = () => {
    const errors: typeof fieldErrors = {}
    if (!name.trim()) errors.name = "Please enter your full name."
    else if (name.trim().length < 2) errors.name = "Your name looks too short — please enter your full name."

    if (!email.trim()) errors.email = "Please enter your work email."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      errors.email = "That doesn't look like a valid email — please use the format name@company.com."
    }

    if (!linkedin.trim()) errors.linkedin = "Please enter your LinkedIn profile URL."
    else if (!/linkedin\.com\/.+/i.test(linkedin.trim()) && !/^https?:\/\/(www\.)?linkedin\.com/i.test(linkedin.trim())) {
      errors.linkedin = "Please enter a valid LinkedIn URL (e.g. linkedin.com/in/yourname)."
    }

    const cleanedPhone = phone.trim()
    const digitsOnly = cleanedPhone.replace(/\D/g, "")

    if (!cleanedPhone || digitsOnly.length === 0) {
      errors.phone = "Please enter your mobile number with country code."
    } else if (!cleanedPhone.startsWith("+")) {
      errors.phone = "Please include your country code starting with '+' (e.g. +1 555-000-0000 or +91 9876543210)."
    } else if (digitsOnly.length < 6 || digitsOnly.length > 15) {
      errors.phone = "Please enter a valid mobile number with country code (e.g., +1 555-000-0000 or +91 9876543210)."
    }

    if (!profile) errors.profile = "Please select your professional profile."

    if (profile === "Other" && !otherProfile.trim()) {
      errors.otherProfile = "Please specify your professional profile."
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!validate()) return
    setSubmitting(true)
    try {
      const finalTier = profile === "Other" ? `Other: ${otherProfile.trim()}` : profile
      const res = await fetch(`${API_BASE_URL}/membership-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          linkedin: linkedin.trim(),
          phone: phone.trim(),
          company: "",
          role: profile === "Other" ? otherProfile.trim() : profile,
          tier: finalTier,
          source: "membership",
        }),
      })
      const contentType = res.headers.get("content-type") ?? ""
      const parsed = contentType.includes("application/json") ? await res.json() : await res.text()
      if (res.ok) {
        setSubmitted(true)
        // Also dispatch email notification with Global CXO Circle sender branding
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: "b6e38651-6009-4ab0-a71d-c98ddda90dfa",
            from_name: "Global CXO Circle",
            subject: "New Membership Application - Global CXO Circle",
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            linkedin: linkedin.trim(),
            profile: finalTier,
            message: `New membership application received for ${name.trim()} (${email.trim()}). We have received your application and will get back to you soon.`,
          }),
        }).catch(() => {})
      } else if (res.status === 409) {
        setError(typeof parsed === "object" && parsed?.detail ? String(parsed.detail) : "An application with this email already exists.")
      } else {
        setError(typeof parsed === "object" && parsed?.detail ? String(parsed.detail) : "Something went wrong. Please try again.")
      }
    } catch {
      setError("Service is temporarily unavailable. Please try again shortly.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        style={{ borderRadius: "20px", border: "1px solid #a7f3d0", background: "#ecfdf5", padding: "40px 32px", textAlign: "center" }}>
        <div style={{ margin: "0 auto 16px", display: "flex", height: "56px", width: "56px", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "#d1fae5" }}>
          <svg style={{ height: "28px", width: "28px", color: "#059669" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--tg-heading-color)", marginBottom: "8px" }}>Application Received</h3>
        <p style={{ fontSize: "14.5px", color: "var(--tg-body-color)", margin: 0, lineHeight: 1.6 }}>
          Thank you for applying. Approved applicants will receive details to join the Global CXO Circle community.
        </p>
      </motion.div>
    )
  }

  const errorStyle: CSSProperties = { borderColor: "#DC2626", boxShadow: "0 0 0 3px rgba(220,38,38,0.1)" }
  const fieldErrorText: CSSProperties = { marginTop: "6px", fontSize: "12.5px", color: "#DC2626", fontWeight: 500 }

  return (
    <div style={{ background: isHero ? "rgba(255,255,255,0.95)" : "#fff", borderRadius: "24px", border: "1px solid var(--tg-border-1)", padding: "32px 28px", boxShadow: "0 10px 40px rgba(11,26,74,0.06)", backdropFilter: "blur(8px)" }}>
      <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
        {/* Full Name * */}
        <div>
          <label style={labelStyle}>Full Name<Required /></label>
          <input type="text" value={name}
            onChange={(e) => { setName(e.target.value); if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined })) }}
            placeholder="e.g. Sarah Jenkins" style={{ ...inputStyle, ...(fieldErrors.name ? errorStyle : {}) }} className="wl-input" />
          {fieldErrors.name && <p style={fieldErrorText}>{fieldErrors.name}</p>}
        </div>

        {/* Work Email * */}
        <div>
          <label style={labelStyle}>Work Email<Required /></label>
          <input type="email" value={email}
            onChange={(e) => { setEmail(e.target.value); if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined })) }}
            placeholder="sarah@company.com" style={{ ...inputStyle, ...(fieldErrors.email ? errorStyle : {}) }} className="wl-input" />
          {fieldErrors.email && <p style={fieldErrorText}>{fieldErrors.email}</p>}
        </div>

        {/* LinkedIn Profile URL * */}
        <div>
          <label style={labelStyle}>LinkedIn Profile URL<Required /></label>
          <input type="url" value={linkedin}
            onChange={(e) => { setLinkedin(e.target.value); if (fieldErrors.linkedin) setFieldErrors((prev) => ({ ...prev, linkedin: undefined })) }}
            placeholder="https://linkedin.com/in/yourname" style={{ ...inputStyle, ...(fieldErrors.linkedin ? errorStyle : {}) }} className="wl-input" />
          {fieldErrors.linkedin && <p style={fieldErrorText}>{fieldErrors.linkedin}</p>}
        </div>

        {/* Mobile Number */}
        <div>
          <label style={labelStyle}>Mobile Number<Required /></label>
          <PhoneInput
            defaultCountry="us"
            value={phone}
            disableDialCodePrefill={true}
            placeholder="+1 (555) 000-0000"
            onChange={(phoneValue) => {
              setPhone(phoneValue)
              if (fieldErrors.phone) setFieldErrors((prev) => ({ ...prev, phone: undefined }))
            }}
            style={{ width: "100%", display: "flex" }}
            inputStyle={{
              width: "100%",
              height: "48px",
              padding: "14px 18px",
              borderRadius: "0 12px 12px 0",
              border: "1px solid var(--tg-border-1)",
              borderLeft: "none",
              background: "#fff",
              fontSize: "15px",
              color: "var(--tg-heading-color)",
              boxShadow: "0 2px 10px rgba(11,26,74,0.04)",
              ...(fieldErrors.phone ? errorStyle : {}),
            }}
            countrySelectorStyleProps={{
              buttonStyle: {
                height: "48px",
                padding: "0 10px 0 12px",
                borderRadius: "12px 0 0 12px",
                border: "1px solid var(--tg-border-1)",
                background: "#fff",
                boxShadow: "0 2px 10px rgba(11,26,74,0.04)",
                ...(fieldErrors.phone ? errorStyle : {}),
              },
            }}
          />
          {fieldErrors.phone && <p style={fieldErrorText}>{fieldErrors.phone}</p>}
        </div>

        {/* Your Professional Profile * */}
        <div className={profile === "Other" ? "sm:col-span-1" : "sm:col-span-2"}>
          <label style={labelStyle}>Your Professional Profile<Required /></label>
          <select value={profile}
            onChange={(e) => {
              setProfile(e.target.value)
              if (fieldErrors.profile) setFieldErrors((prev) => ({ ...prev, profile: undefined }))
              if (e.target.value !== "Other") setOtherProfile("")
            }}
            style={{ ...inputStyle, ...(fieldErrors.profile ? errorStyle : {}), color: profile ? "var(--tg-heading-color)" : "#9aa0ad" }} className="wl-input">
            <option value="" disabled hidden>Select your professional profile</option>
            {PROFILE_OPTIONS.map((opt) => (
              <option key={opt} value={opt} style={{ color: "var(--tg-heading-color)" }}>{opt}</option>
            ))}
          </select>
          {fieldErrors.profile && <p style={fieldErrorText}>{fieldErrors.profile}</p>}
        </div>

        {/* If Other -> Please specify * */}
        {profile === "Other" && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="sm:col-span-1">
            <label style={labelStyle}>If Other → Please specify<Required /></label>
            <input type="text" value={otherProfile}
              onChange={(e) => { setOtherProfile(e.target.value); if (fieldErrors.otherProfile) setFieldErrors((prev) => ({ ...prev, otherProfile: undefined })) }}
              placeholder="e.g., Advisor, Director, Academic, Community Leader" style={{ ...inputStyle, ...(fieldErrors.otherProfile ? errorStyle : {}) }} className="wl-input" />
            {fieldErrors.otherProfile && <p style={fieldErrorText}>{fieldErrors.otherProfile}</p>}
          </motion.div>
        )}

        {/* Submit CTA */}
        <div className="sm:col-span-2 mt-2">
          <motion.button type="submit" disabled={submitting} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
            className="wl-submit-btn" style={{
              width: "100%", background: "var(--tg-color-gradient)", color: "#fff", border: "none",
              padding: "16px 24px", borderRadius: "100px", fontWeight: 700, fontSize: "15px",
              cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.7 : 1,
              boxShadow: "0 10px 30px rgba(10,60,194,0.2)", transition: "all 0.3s ease",
            }}>
            {submitting ? "Submitting..." : "Apply for Membership"}
          </motion.button>

          {/* Subtext below CTA */}
          <p style={{ textAlign: "center", fontSize: "13px", color: "#6b7280", marginTop: "14px", lineHeight: 1.5, padding: "0 8px" }}>
            Membership is curated and subject to approval. Approved applicants will receive details to join the Global CXO Circle community.
          </p>

          {error && (
            <div style={{ marginTop: "14px", borderRadius: "12px", border: "1px solid #fde68a", background: "#fffbeb", padding: "12px 16px", textAlign: "center" }}>
              <p style={{ fontSize: "13.5px", color: "#92400e", margin: 0 }}>{error}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Main page                                                           */
/* ------------------------------------------------------------------ */
export default function MembershipPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.97])

  return (
    <div className="overflow-x-hidden relative">
      <Header hideSignIn />

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HERO                                                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <motion.section ref={heroRef} style={{ opacity: heroOpacity, scale: heroScale, backgroundColor: "#f8f9fa", position: "relative", overflow: "hidden" }}
        className="pt-[145px] pb-16 sm:pt-[160px]">
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(circle, rgba(10,60,194,0.14) 0%, rgba(179,0,185,0.08) 55%, transparent 80%)" }} />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <FadeUp>
                <span style={{
                  background: "var(--tg-color-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", fontSize: "12px",
                  marginBottom: "6px", display: "inline-block",
                }}>
                  Invite-Only Network
                </span>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h1 style={{ fontSize: "clamp(28px, 3.6vw, 42px)", fontWeight: 800, lineHeight: 1.15, color: "var(--tg-heading-color)", marginBottom: "16px" }}>
                  From conversations
                  <br />
                  <span style={{ background: "var(--tg-color-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    to enterprise outcomes
                  </span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p style={{ fontSize: "16px", color: "var(--tg-body-color)", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto" }}>
                  The CXO-led platform where enterprise technology leaders and startups
                  build advisory relationships that convert into real deals.
                </p>
              </FadeUp>
            </div>
          </div>

          <div className="row justify-content-center" style={{ marginTop: "36px" }}>
            <div className="col-lg-7 col-xl-6">
              <FadeUp delay={0.3}>
                <MembershipForm variant="hero" />
              </FadeUp>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* STATS                                                         */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#fff", padding: "90px 0 70px" }}>
        <div className="container">
          <div className="flex items-center justify-center gap-6 sm:gap-14">
            {[
              { label: "Enterprise CXOs", value: "500+" },
              { label: "Startups", value: "60+" },
              { label: "Advisory Hours", value: "1,200+" },
            ].map((stat, i) => (
              <ScaleIn key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <p style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 800, color: "var(--tg-heading-color)", marginBottom: "4px" }}>{stat.value}</p>
                  <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#8a90a0" }}>{stat.label}</p>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* LOGO CAROUSEL                                                 */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#fff", paddingBottom: "100px", overflow: "hidden" }}>
        <FadeUp>
          <p style={{ textAlign: "center", fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#8a90a0", marginBottom: "32px" }}>
            Leaders from these organizations have joined the network
          </p>
        </FadeUp>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: "linear-gradient(to right, #fff, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: "linear-gradient(to left, #fff, transparent)" }} />
          <div className="flex animate-[scroll_45s_linear_infinite] hover:[animation-play-state:paused] w-max">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex items-center gap-12 px-6 sm:gap-16">
                {[
                  { name: "AWS", domain: "aws.amazon.com" },
                  { name: "Accenture", domain: "accenture.com" },
                  { name: "BCG", domain: "bcg.com" },
                  { name: "General Motors", domain: "gm.com" },
                  { name: "Philips", domain: "philips.com" },
                  { name: "Oracle", domain: "oracle.com" },
                  { name: "J&J", domain: "jnj.com" },
                  { name: "KPMG", domain: "kpmg.com" },
                  { name: "SABIC", domain: "sabic.com" },
                  { name: "NTT", domain: "ntt.com" },
                  { name: "Rakuten", domain: "rakuten.com" },
                  { name: "Saint-Gobain", domain: "saint-gobain.com" },
                  { name: "Sequoia", domain: "sequoiacap.com" },
                  { name: "Accel", domain: "accel.com" },
                  { name: "Whatfix", domain: "whatfix.com" },
                  { name: "Zuora", domain: "zuora.com" },
                  { name: "LSEG", domain: "lseg.com" },
                  { name: "Klaviyo", domain: "klaviyo.com" },
                  { name: "Sprinto", domain: "sprinto.com" },
                  { name: "CloudSEK", domain: "cloudsek.com" },
                  { name: "Atomicwork", domain: "atomicwork.com" },
                  { name: "Rocketlane", domain: "rocketlane.com" },
                ].map((co) => (
                  <a key={`${setIdx}-${co.name}`} href={`https://${co.domain}`} target="_blank" rel="noopener noreferrer">
                    <img
                      src={`https://img.logo.dev/${co.domain}?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ&size=60&format=png`}
                      alt={co.name}
                      title={co.name}
                      className="h-10 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 select-none cursor-pointer"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* PROGRAMS                                                      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#f8f9fa", padding: "100px 0" }}>
        <div className="container">
          <FadeUp>
            <div className="row justify-content-center text-center" style={{ marginBottom: "60px" }}>
              <div className="col-lg-7">
                <span style={{ background: "var(--tg-color-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", fontSize: "12px", marginBottom: "6px", display: "inline-block" }}>
                  How It Works
                </span>
                <h2 style={{ fontSize: "clamp(28px, 3.6vw, 40px)", fontWeight: 800, color: "var(--tg-heading-color)", marginBottom: "14px" }}>
                  Two engines of enterprise value
                </h2>
                <p style={{ fontSize: "16px", color: "var(--tg-body-color)", maxWidth: "500px", margin: "0 auto" }}>
                  Structured programs that convert relationships into measurable outcomes.
                </p>
              </div>
            </div>
          </FadeUp>

          <div className="row gutter-y-24 justify-content-center">
            {[
              {
                title: "Advisory Circle Program",
                desc: "Structured access to enterprise CXOs for validation, go-to-market strategy, and enterprise readiness. Build your custom advisory circle.",
                tags: ["CXO Matching", "Session Tracking", "Hour Management"],
                color: "#0A3CC2",
              },
              {
                title: "Introductions & Deal Flow",
                desc: "CXO-endorsed warm introductions and structured deal conversion. From qualified referrals to closed enterprise contracts.",
                tags: ["Warm Intros", "Deal Attribution", "Boomerang AI"],
                color: "#B300B9",
              },
            ].map((p, i) => (
              <div key={p.title} className="col-lg-5">
                <FadeUp delay={0.1 * (i + 1)} className="h-100">
                  <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: "20px", border: "1px solid var(--tg-border-1)", background: "#fff", padding: "36px", boxShadow: "0 4px 20px rgba(11,26,74,0.05)" }}>
                    <div style={{ marginBottom: "22px", display: "inline-flex", height: "52px", width: "52px", alignItems: "center", justifyContent: "center", borderRadius: "14px", background: `${p.color}12`, color: p.color, fontSize: "24px" }}>
                      <i className={i === 0 ? "flaticon-partner" : "flaticon-startup"}></i>
                    </div>
                    <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--tg-heading-color)", marginBottom: "10px" }}>{p.title}</h3>
                    <p style={{ fontSize: "14.5px", color: "var(--tg-body-color)", lineHeight: 1.7, marginBottom: "20px", flex: 1 }}>{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span key={tag} style={{ borderRadius: "8px", background: "#f2f4f8", padding: "5px 12px", fontSize: "12.5px", fontWeight: 600, color: "var(--tg-body-color)" }}>{tag}</span>
                      ))}
                    </div>
                  </motion.div>
                </FadeUp>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MEMBERS                                                       */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#fff", padding: "100px 0" }}>
        <div className="container">
          <FadeUp>
            <div className="row justify-content-center text-center" style={{ marginBottom: "60px" }}>
              <div className="col-lg-7">
                <span style={{ background: "var(--tg-color-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", fontSize: "12px", marginBottom: "6px", display: "inline-block" }}>
                  The Network
                </span>
                <h2 style={{ fontSize: "clamp(28px, 3.6vw, 40px)", fontWeight: 800, color: "var(--tg-heading-color)" }}>
                  Built for enterprise leaders
                </h2>
              </div>
            </div>
          </FadeUp>

          <div className="row gutter-y-20">
            {[
              { tier: "CXO", desc: "CIO, CTO, CISO, CRO, CFO", color: "#0A3CC2" },
              { tier: "CXO-1", desc: "SVP, VP, Directors", color: "#B300B9" },
              { tier: "Startups", desc: "Founders & leadership teams", color: "#1565C0" },
              { tier: "Venture", desc: "VC firms & strategic partners", color: "#2E7D32" },
            ].map((t, i) => (
              <div key={t.tier} className="col-lg-3 col-md-6">
                <ScaleIn delay={i * 0.08} className="h-100">
                  <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    style={{ height: "100%", borderRadius: "16px", border: "1px solid var(--tg-border-1)", background: "#fff", padding: "26px", boxShadow: "0 2px 10px rgba(11,26,74,0.04)" }}>
                    <div style={{ marginBottom: "16px", height: "6px", width: "32px", borderRadius: "100px", background: t.color }} />
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--tg-heading-color)", marginBottom: "4px" }}>{t.tier}</h3>
                    <p style={{ fontSize: "14px", color: "var(--tg-body-color)", margin: 0 }}>{t.desc}</p>
                  </motion.div>
                </ScaleIn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* QUOTE                                                         */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#f8f9fa", padding: "100px 0" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <FadeUp>
                <div className="text-center">
                  <div className="mx-auto mb-6 h-px w-12" style={{ background: "var(--tg-color-gradient)" }} />
                  <p style={{ fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 600, lineHeight: 1.6, color: "var(--tg-heading-color)" }}>
                    The best enterprise deals start with a conversation between the right people.
                    <span style={{ color: "#8a90a0" }}> We make sure that conversation happens.</span>
                  </p>
                  <div className="mx-auto mt-6 h-px w-12" style={{ background: "var(--tg-color-gradient)" }} />
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* BOTTOM CTA                                                    */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#fff", padding: "100px 0" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-xl-6">
              <FadeUp>
                <div className="text-center mb-8">
                  <h2 style={{ fontSize: "clamp(26px, 3.2vw, 36px)", fontWeight: 800, color: "var(--tg-heading-color)", marginBottom: "8px" }}>Ready to join?</h2>
                  <p style={{ fontSize: "14.5px", color: "var(--tg-body-color)", margin: 0 }}>Apply today for curated access to the Global CXO Circle community.</p>
                </div>
              </FadeUp>
              <FadeUp delay={0.1}>
                <MembershipForm />
                <p style={{ marginTop: "20px", textAlign: "center", fontSize: "12.5px", color: "#8a90a0" }}>
                  By joining, you agree to our <Link href="/terms-of-service" style={{ color: "var(--tg-theme-primary)", fontWeight: 600 }}>Terms</Link> and <Link href="/privacy-policy" style={{ color: "var(--tg-theme-primary)", fontWeight: 600 }}>Privacy Policy</Link>.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .wl-input::placeholder {
          color: #9aa0ad;
          opacity: 1;
        }
        .wl-input:focus {
          outline: none;
          border-color: var(--tg-theme-primary) !important;
          box-shadow: 0 4px 16px rgba(10,60,194,0.12), 0 0 0 3px rgba(10,60,194,0.1) !important;
        }
        .wl-submit-btn:not(:disabled):hover {
          filter: brightness(1.08);
          box-shadow: 0 8px 24px rgba(10,60,194,0.25);
        }
      `}</style>
    </div>
  )
}
