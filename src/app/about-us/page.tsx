"use client"
import React, { useState } from "react"
import Link from "next/link"
import Header from "@/layouts/headers/Header"
import Footer from "@/layouts/footers/Footer"
import AnimateOnScroll from "@/components/ui/AnimateOnScroll"

type Person = {
    name: string
    role: string
    company: string
    image: string
    bio?: string
}

const founding_members: Person[] = [
    { name: "Lenin Gali", role: "CBO & Founding Team", company: "Atomicwork", image: "/assets/Founders/Lenin_Gali.JPG", bio: "Accomplished CISO, startup investor & advisor, and Non-Profit Founder with global experience mentoring future leaders" },
    { name: "Padma Alluri", role: "Global Ecosystem Builder &\nFounding Team", company: "", image: "/assets/Founders/Padma_Alluri.jpg", bio: "Global entrepreneur and ecosystem builder with 20+ years in IT consulting and transformation." },
    { name: "Karthik Chakkrapani", role: "SVP & CIO", company: "Zuora", image: "/assets/Founders/Karthik_Chakkarpani.png", bio: "SVP & CIO driving AI transformation. Startup advisor and NGO co-founder creating lasting value" },
    { name: "Saket Srivastava", role: "Technology & Digital Leader", company: "Asana", image: "/assets/Founders/Saket_Srivastava.jpeg", bio: "Recognized thought leader in consulting, with a demonstrated capability of building and mentoring large teams" },
    { name: "Gopalratnam VC", role: "Executive VP & Global CIO", company: "Philips", image: "/assets/Founders/Gopal_VC.jpg", bio: "High-performing global C-suite executive with proven track record in Business Transformation and Digital Strategy" },
    { name: "Vishal Gupta", role: "Global CTO & CIO", company: "Lexmark", image: "/assets/Founders/Vishal_Gupta.jpg", bio: "Seasoned executive in growing software products and businesses with world-class teams focused on customer success" },
    { name: "Awinash Sinha", role: "Technology & Business Executive", company: "Zoom", image: "/assets/Founders/Awinash_Sinha.jpeg", bio: "Technology executive with experience in technology enabled business transformation and operations" },
    { name: "Raj Kalahasthi", role: "Chief Digital & Information Officer", company: "The Baldwin Group", image: "/assets/Founders/Raj_kalahasthi.JPG", bio: "Technology transformation leader driving business-technology alignment for global financial services." },
]

const startup_advisors: Person[] = [
    { name: "Abhi Dhar", role: "Ex-CIO, Board Member", company: "TransUnion", image: "/assets/startup_board/Abhi_Dhar.jpg" },
    { name: "Archana Rao", role: "CIO", company: "Klaviyo", image: "/assets/startup_board/Archana_Rao.jpg" },
    { name: "Aysha Khan", role: "CIO & CISO", company: "Treasure Data", image: "/assets/startup_board/Aysha_Khan.png" },
    { name: "Chad Ghosn", role: "CTO & CIO", company: "Ammex Corporation", image: "/assets/startup_board/Chad_Ghosn.jpg" },
    { name: "Chet Mandair", role: "Global CIO", company: "Guidewire", image: "/assets/startup_board/Chet_Mandair.jpg" },
    { name: "Karl Mosgofian", role: "Ex-CIO", company: "Gainsight", image: "/assets/startup_board/Karl_Mosgofian.jpg" },
    { name: "Gary J Ahwah", role: "Ex-CTO", company: "Molina Healthcare", image: "/assets/startup_board/Gary_Ahwah.jpeg" },
    { name: "Pallavi Gupta", role: "Global CIO", company: "Impossible Foods", image: "/assets/startup_board/Pallavi_Gupta.jpg" },
    { name: "Prasad Ramakrishnan", role: "Ex-CIO", company: "Freshworks", image: "/assets/startup_board/Prasad_Ramakrishnan.png" },
    { name: "Rajan Kumar", role: "Ex-CIO & VP", company: "Intuit", image: "/assets/startup_board/Rajan_Kumar.jpg" },
    { name: "Jeff Farinich", role: "CIO", company: "New American Funding", image: "https://assets.newamericanfunding.com/images/legacy/photos/Jeff+Farinich_Leadership.jpg" },
    { name: "Sesh Tirumala", role: "Global CIO", company: "Western Digital", image: "/assets/startup_board/Sesh_Tirumala.jpg" },
    { name: "Swati Ranganathan", role: "CISO & VP of IT", company: "Uniphore", image: "/assets/startup_board/Swati_Ranganathan.jpg" },
    { name: "A Ravi Malick", role: "Global CIO", company: "Box", image: "/assets/startup_board/A_Ravi_Malick.jpg" },
    { name: "Nipun Soni", role: "CFO", company: "Picarro", image: "/assets/startup_board/Nipun_Soni.png" },
    { name: "Anthony Trask", role: "VP of IT", company: "ŌURA", image: "/assets/startup_board/Anthony_Trask.jpg" },
    { name: "Omar Hatamleh", role: "Chief AI Officer", company: "NASA GSFC", image: "/assets/startup_board/Omar_Hatamleh.png" },
    { name: "Brian Spanswick", role: "CIO & CISO", company: "Cohesity", image: "/assets/startup_board/Brian_Spanswick.png" },
    { name: "Rajat Bansal", role: "CTO", company: "Games24x7", image: "/assets/startup_board/Rajat_Bansal.jpg" },
    { name: "Manosiz Bhattacharya", role: "CTO", company: "Nutanix", image: "/assets/startup_board/Manosiz_Bhattacharya.png" },
    { name: "Sandeep Singh Kohli", role: "Ex-CMO", company: "GTM Advisor", image: "/assets/startup_board/Sandeep_Singh_Kohli.png" },
    { name: "Deepika Rayala", role: "CIO", company: "CornerstoneOnDemand", image: "/assets/startup_board/Deepika_Rayala.png" },
    { name: "Rajiv Peter", role: "CIO", company: "Notting Hill Genesis", image: "/assets/startup_board/Rajiv_Peter.png" },
    { name: "Prakash Kota", role: "CIO", company: "UKG", image: "https://nationalcioreview.com/wp-content/uploads/2025/04/Prakash-Kota-Chief-Information-Officer-at-UKG.png" },
    { name: "Sanjay Shahani", role: "SVP, Customer Exp", company: "F5", image: "/assets/startup_board/Sanjay_Shahani.png" },
    { name: "Nikhil Sud", role: "CIO", company: "Boyd Corp", image: "/assets/startup_board/Nikhil_Sud.jpeg" },
    { name: "Teza Mukkavilli", role: "CIO & CISO", company: "Tekion", image: "/assets/startup_board/Teza_Mukkavilli.jpeg" },
]

function initialsOf(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
}

function Avatar({ src, name, size }: { src: string; name: string; size: number }) {
    const [errored, setErrored] = useState(false)

    if (errored || !src) {
        return (
            <div style={{
                width: size, height: size, borderRadius: "50%", flexShrink: 0,
                background: "var(--tg-color-gradient)", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: Math.round(size * 0.34), letterSpacing: "0.5px",
                border: "3px solid #fff", boxShadow: "0 4px 16px rgba(11,26,74,0.14)",
            }}>
                {initialsOf(name)}
            </div>
        )
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={src}
            alt={name}
            width={size}
            height={size}
            loading="lazy"
            decoding="async"
            onError={() => setErrored(true)}
            style={{
                width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0,
                border: "3px solid #fff", boxShadow: "0 4px 16px rgba(11,26,74,0.14)",
            }}
        />
    )
}

const SectionHeading = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) => (
    <div className="row justify-content-center text-center" style={{ marginBottom: "36px" }}>
        <div className="col-lg-8">
            <span style={{
                background: "var(--tg-color-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", fontSize: "12px",
                marginBottom: "6px", display: "inline-block",
            }}>
                {eyebrow}
            </span>
            <h2 style={{ fontSize: "clamp(30px, 3.8vw, 44px)", fontWeight: 800, color: "var(--tg-heading-color)", marginBottom: "0" }}>
                {title}
            </h2>
            <p style={{ fontSize: "17px", color: "var(--tg-body-color)", margin: 0 }}>
                {subtitle}
            </p>
        </div>
    </div>
)

const AboutUsPage = () => {
    return (
        <>
            <Header />
            <main className="main-area fix">
                {/* Page hero */}
                <section style={{ paddingTop: "120px", paddingBottom: "70px", backgroundColor: "#ffffff" }}>
                    <div className="container">
                        <div className="row justify-content-center text-center">
                            <div className="col-lg-8">
                                <AnimateOnScroll>
                                    <span style={{
                                        background: "var(--tg-color-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                        fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", fontSize: "12px",
                                        marginBottom: "16px", display: "inline-block",
                                    }}>
                                        About Us
                                    </span>
                                    <h1 style={{ fontSize: "clamp(36px, 4.5vw, 52px)", fontWeight: 800, color: "var(--tg-heading-color)", marginBottom: "20px", lineHeight: 1.15 }}>
                                        The People Behind{" "}
                                        <span style={{ background: "var(--tg-color-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                            Global CXO Circle
                                        </span>
                                    </h1>
                                    <p style={{ fontSize: "17px", color: "var(--tg-body-color)", lineHeight: 1.7, maxWidth: "640px", margin: "0 auto" }}>
                                        A collective of visionary founders and seasoned technology executives dedicated to
                                        mentoring the next generation of enterprise innovators.
                                    </p>
                                </AnimateOnScroll>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Founding Circle — bigger cards */}
                <section style={{ backgroundColor: "#eef2fb", padding: "110px 0 120px" }}>
                    <div className="container">
                        <AnimateOnScroll>
                            <SectionHeading
                                eyebrow="Founding Circle"
                                title="Founding Circle"
                                subtitle="The visionary industry leaders behind Global CXO Circle"
                            />
                        </AnimateOnScroll>

                        <div className="row gutter-y-30 justify-content-center">
                            {founding_members.map((m, i) => (
                                <div key={m.name} className="col-lg-4 col-md-6">
                                    <AnimateOnScroll delay={0.06 * (i % 3)} className="h-100">
                                        <div className="founder-card" style={{
                                            background: "#fff", borderRadius: "20px", padding: "30px 28px",
                                            border: "1px solid var(--tg-border-1)", boxShadow: "0 4px 20px rgba(11,26,74,0.05)",
                                            height: "100%", textAlign: "center", transition: "all 0.3s ease",
                                            display: "flex", flexDirection: "column", alignItems: "center",
                                        }}>
                                            <div style={{ marginBottom: "16px" }}>
                                                <Avatar src={m.image} name={m.name} size={96} />
                                            </div>
                                            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--tg-heading-color)", marginBottom: "6px" }}>
                                                {m.name}
                                            </h3>
                                            {/* Fixed-height role+company block so every card's
                                                bio starts at the same vertical position, even when
                                                a role wraps to two lines (e.g. Padma) or a card has
                                                no company. */}
                                            <div style={{
                                                minHeight: "58px", marginBottom: "14px",
                                                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", gap: "3px",
                                            }}>
                                                <span style={{
                                                    fontSize: "15px", fontWeight: 700, lineHeight: 1.4, whiteSpace: "pre-line",
                                                    background: "var(--tg-color-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                                }}>
                                                    {m.role}
                                                </span>
                                                {m.company && (
                                                    <span style={{ fontSize: "14px", color: "#8a90a0", fontWeight: 600 }}>
                                                        {m.company}
                                                    </span>
                                                )}
                                            </div>
                                            <p style={{ fontSize: "14px", color: "var(--tg-body-color)", lineHeight: 1.65, margin: 0 }}>
                                                {m.bio}
                                            </p>
                                        </div>
                                    </AnimateOnScroll>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Members & Startup Advisors — smaller cards */}
                <section style={{ backgroundColor: "#fff", padding: "110px 0 60px" }}>
                    <div className="container">
                        <AnimateOnScroll>
                            <SectionHeading
                                eyebrow="Our Network"
                                title="Members & Startup Advisors"
                                subtitle="Seasoned executives guiding startups"
                            />
                        </AnimateOnScroll>

                        <div className="row gutter-y-30">
                            {startup_advisors.map((a, i) => (
                                <div key={a.name} className="col-lg-4 col-md-6">
                                    <AnimateOnScroll delay={0.04 * (i % 3)} className="h-100">
                                        <div className="advisor-card" style={{
                                            background: "#f2f5fd", borderRadius: "16px", padding: "28px 28px",
                                            display: "flex", alignItems: "center", justifyContent: "space-between", gap: "18px",
                                            height: "100%", border: "1px solid transparent", transition: "all 0.3s ease",
                                        }}>
                                            <div style={{ minWidth: 0 }}>
                                                <h3 style={{ fontSize: "19px", fontWeight: 700, color: "var(--tg-heading-color)", marginBottom: "8px" }}>
                                                    {a.name}
                                                </h3>
                                                <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--tg-theme-primary)", marginBottom: "3px" }}>
                                                    {a.role}
                                                </div>
                                                <div style={{ fontSize: "15px", color: "var(--tg-body-color)" }}>
                                                    {a.company}
                                                </div>
                                            </div>
                                            <Avatar src={a.image} name={a.name} size={84} />
                                        </div>
                                    </AnimateOnScroll>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section style={{ paddingBottom: "80px", backgroundColor: "#fff" }}>
                    <div className="container">
                        <AnimateOnScroll>
                            <div style={{
                                background: "linear-gradient(150deg, #0B1A4A 0%, #0A3CC2 100%)",
                                borderRadius: "20px", padding: "clamp(32px, 3vw, 44px) 32px", textAlign: "center",
                                position: "relative", overflow: "hidden",
                            }}>
                                <div style={{
                                    position: "absolute", bottom: "-100px", left: "-60px", width: "360px", height: "360px",
                                    borderRadius: "50%", background: "radial-gradient(circle, rgba(179,0,185,0.3) 0%, rgba(179,0,185,0) 70%)",
                                }} />
                                <div style={{ position: "relative", zIndex: 2 }}>
                                    <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>
                                        Ready to Join Our Community?
                                    </h2>
                                    <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", maxWidth: "560px", margin: "0 auto 28px" }}>
                                        Connect with fellow technology leaders and shape the future of enterprise innovation
                                        through collaboration and shared expertise.
                                    </p>
                                    <Link href="/waitlist" className="community-btn" style={{
                                        display: "inline-flex", alignItems: "center", gap: "8px",
                                        background: "#fff", color: "var(--tg-theme-primary)", padding: "14px 34px",
                                        borderRadius: "8px", fontWeight: 700, fontSize: "15px", textDecoration: "none",
                                        transition: "all 0.3s ease",
                                    }}>
                                        Request Invitation <span aria-hidden="true">→</span>
                                    </Link>
                                </div>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </section>
            </main>
            <Footer />

            <style jsx>{`
                .founder-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 48px rgba(11,26,74,0.12) !important;
                    border-color: var(--tg-theme-primary) !important;
                }
                .advisor-card:hover {
                    transform: translateY(-4px);
                    background: #fff !important;
                    border-color: var(--tg-theme-primary) !important;
                    box-shadow: 0 14px 32px rgba(11,26,74,0.1) !important;
                }
                .community-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 32px rgba(0,0,0,0.22);
                }
            `}</style>
        </>
    )
}

export default AboutUsPage
